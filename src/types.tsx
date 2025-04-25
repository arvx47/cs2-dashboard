export interface Match {
  id: string;
  game: string;
  region: string;
  status: "LIVE" | "UPCOMING" | string;
  tags?: string[];
  teams: {
    faction1: Team;
    faction2: Team;
  };
  results?: MatchResult[];
  createdAt?: string;
}

export interface MatchResult {
  ascScore: boolean;
  partial: boolean;
  factions: {
    faction1: {
      score: number;
    };
    faction2: {
      score: number;
    };
  };
  disqualified?: [];
  voteKicked?: [];
  leavers?: [];
  afk?: [];
}

export interface MatchResults {
  factions: {
    faction1: {
      score: number;
    };
    faction2: {
      score: number;
    };
  };
}

export interface Team {
  name: string;
  leader?: string;
  score?: number;
  roster: Player[];
  stats: {
    skillLevel: SkillLevel;
    winProbability?: number;
  };
}

export interface Player {
  nickname: string;
  id: string;
  gameSkillLevel?: number;
  elo: number;
}

export interface SkillLevel {
  average: number;
  range?: {
    min: number;
    max: number;
  };
}

export interface RankingsResponse {
  items: RankingItem[];
  start: number;
  end: number;
}

export interface RankingItem {
  player_id: string;
  nickname: string;
  country: string;
  position: number;
  faceit_elo: number;
  game_skill_level: number;
}
