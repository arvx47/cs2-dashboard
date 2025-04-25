import { useState, useEffect } from "react";
import type { Match } from "../types";
import { fetchLiveSupermatches } from "../services/faceitApi";

interface UseMatchesResult {
  matches: Match[];
  isLoading: boolean;
  error: string | null;
  lastRefreshed: Date | null;
  fetchMatches: () => Promise<void>;
}

export function useMatches(): UseMatchesResult {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);

  const fetchMatches = async () => {
    setIsLoading(true);
    setError(null);
    setLastRefreshed(new Date());
    try {
      const matches = await fetchLiveSupermatches();
      setMatches(matches);
    } catch (err) {
      console.error("Error fetching matches:", err);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return {
    matches,
    isLoading,
    error,
    lastRefreshed,
    fetchMatches,
  };
}
