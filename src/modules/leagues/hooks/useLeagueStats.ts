"use client";

import { useMemo } from "react";
import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { LeagueResponse, LeagueView } from "@/types/leagues";

const useLeagueStats = (leagueId: number) => {
  const response = useSWR<ApiResponse<LeagueResponse>>(
    `/api/leagues/${leagueId}?view=${LeagueView.STATS}`,
  );

  const stats = response.data?.data?.stats ?? null;

  const statsConfig = useMemo(
    () => [
      { value: stats?.total_goals, label: "Total Goals" },
      { value: stats?.clean_sheets, label: "Clean Sheets" },
      { value: stats?.yellow_cards, label: "Yellow Cards" },
      { value: stats?.goals_per_match, label: "Goals per Match" },
    ],
    [],
  );

  return {
    stats,
    isLoading: !response.data && !response.error,
    error: response.error,
    statsConfig,
  };
};

export default useLeagueStats;
