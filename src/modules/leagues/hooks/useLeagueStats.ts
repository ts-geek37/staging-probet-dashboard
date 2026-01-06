"use client";
import { useMemo } from "react";
import useSWR from "swr";

import { getLeagueDetail } from "@/api/leagues";
import { LeagueView } from "@/types/leagues";

const useLeagueStats = (leagueId: number) => {
  const response = useSWR(
    leagueId ? [leagueId, LeagueView.STATISTICS] : null,
    () => getLeagueDetail({ id: leagueId, view: LeagueView.STATISTICS }),
  );

  const stats = response.data?.data ?? null;

  const statsConfig = useMemo(
    () => [
      { value: stats?.overview?.total_goals, label: "Total Goals" },
      { value: stats?.overview?.matches_played, label: "Matches Played" },
      { value: stats?.overview?.yellow_cards, label: "Yellow Cards" },
      {
        value: stats?.overview?.average_goals_per_match,
        label: "Goals per Match",
      },
    ],
    [stats],
  );

  return {
    stats,
    isLoading: !response.data && !response.error,
    error: response.error,
    statsConfig,
  };
};

export default useLeagueStats;
