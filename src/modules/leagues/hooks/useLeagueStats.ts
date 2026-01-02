"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { LeagueResponse, LeagueView } from "@/types/leagues";

const useLeagueStats = (leagueId: number) => {
  const response = useSWR<ApiResponse<LeagueResponse>>(
    `/api/leagues/${leagueId}?view=${LeagueView.STATS}`,
  );

  return {
    stats: response.data?.data?.stats ?? null,
    isLoading: !response.data && !response.error,
    error: response.error,
  };
};

export default useLeagueStats;
