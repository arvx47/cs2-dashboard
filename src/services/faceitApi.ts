import { Match } from "../types";

const FACEIT_API_URL = "https://open.faceit.com/data/v4";
const API_KEY = "31a0f009-6cde-4e0d-98ce-4c10b21e2714";
// const KV_KEY = "latest_filtered_matches";
const LIVE_MATCH_API_URL = "https://www.faceit.com/api/match/v3/match";
const MATCH_RESULT_API_URL_BASE = "https://www.faceit.com/api/match/v2/match/";
const FACEIT_ENTITY_ID = "73557c8e-4b67-4ac8-bae0-e910b49a5fa0";

const headers = {
  Authorization: `Bearer ${API_KEY}`,
  Accept: "application/json",
};

/**
 * Fetches top CS2 players rankings for a specific region
 * @param region Region code (e.g., 'SA' for South America)
 * @param offset Pagination offset
 * @param limit Number of results to return
 */
export async function fetchTopRankings(region = "SA", offset = 0, limit = 100) {
  const response = await fetch(
    `${FACEIT_API_URL}/rankings/games/cs2/regions/${region}?offset=${offset}&limit=${limit}`,
    { headers }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch rankings: ${response.status}`);
  }

  return await response.json();
}

/**
 * Fetches top CS2 players rankings for a specific region
 * @param region Region code (e.g., 'SA' for South America)
 * @param offset Pagination offset
 * @param limitPerPage Number of results to return
 */
export async function fetchLiveSupermatches(): Promise<Match[]> {
  const offset = 0;
  const limitPerPage = 100;
  let allMatches: Match[] = [];
  const url = `${LIVE_MATCH_API_URL}?entityId=${FACEIT_ENTITY_ID}&entityType=matchmaking&status=LIVE&offset=${offset}&limit=${limitPerPage}`;
  const response = await fetch(url, { headers });
  const data = await response.json();

  if (!response.ok || data.code !== "OPERATION-OK") {
    throw new Error(
      `Error fetching live matches (offset ${offset}): Status ${response.status}, Code ${data.code}`
    );
  }

  const sanitizedMatches = sanitizeMatches(data.payload);
  allMatches = allMatches.concat(sanitizedMatches);

  const filteredMatches = allMatches.filter((match) => {
    const isSuper = match.tags && match.tags.some((tag) => tag === "super");
    const hasLevel10Team =
      match.teams.faction1.stats.skillLevel.average === 10 ||
      match.teams.faction2.stats.skillLevel.average === 10;
    return isSuper && hasLevel10Team;
  });

  const matchesWithResults = [];

  for (const match of filteredMatches) {
    const results = await fetchMatchResults(match.id);
    if (results !== null) {
      match.results = results;
      matchesWithResults.push(match);
    }
  }
  return matchesWithResults;
}

async function fetchMatchResults(matchId: string) {
  const apiUrl = `${MATCH_RESULT_API_URL_BASE}${matchId}`;
  const response = await fetch(apiUrl, {
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    console.error(
      `Error fetching results for match ${matchId}: HTTP status ${response.status}`
    );
    return null;
  }
  const data = await response.json();
  return data.payload?.results || [];
}

function sanitizeMatches(matches: Match[]): Match[] {
  return matches
    .filter(
      (match) => match.teams && match.teams.faction1 && match.teams.faction2
    )
    .map((match) => ({
      id: match.id,
      game: match.game,
      region: match.region,
      status: match.status,
      tags: match.tags || [],
      teams: {
        faction1: {
          name: match.teams.faction1.name || "Unknown",
          leader: match.teams.faction1.leader || "Unknown",
          score: match.teams.faction1.score || 0,
          roster: (match.teams.faction1.roster || []).map((player) => ({
            nickname: player.nickname || "Unknown",
            id: player.id || "Unknown",
            gameSkillLevel: player.gameSkillLevel || 0,
            elo: player.elo || 0,
          })),
          stats: {
            winProbability: match.teams.faction1.stats?.winProbability || 0,
            skillLevel: {
              average: match.teams.faction1.stats?.skillLevel?.average || 0,
              range: {
                min: match.teams.faction1.stats?.skillLevel?.range?.min || 0,
                max: match.teams.faction1.stats?.skillLevel?.range?.max || 0,
              },
            },
          },
        },
        faction2: {
          name: match.teams.faction2.name || "Unknown",
          leader: match.teams.faction2.leader || "Unknown",
          score: match.teams.faction2.score || 0,
          roster: (match.teams.faction2.roster || []).map((player) => ({
            nickname: player.nickname || "Unknown",
            id: player.id || "Unknown",
            gameSkillLevel: player.gameSkillLevel || 0,
            elo: player.elo || 0,
          })),
          stats: {
            winProbability: match.teams.faction2.stats?.winProbability || 0,
            skillLevel: {
              average: match.teams.faction2.stats?.skillLevel?.average || 0,
              range: {
                min: match.teams.faction2.stats?.skillLevel?.range?.min || 0,
                max: match.teams.faction2.stats?.skillLevel?.range?.max || 0,
              },
            },
          },
        },
      },
      createdAt: match.createdAt || "Unknown",
      results: [],
    }));
}
