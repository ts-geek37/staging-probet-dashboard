"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { LeagueResponse, LeagueView } from "@/types/leagues";

const useLeagueMatches = (leagueId: number) => {
  const response = useSWR<ApiResponse<LeagueResponse>>(
    `/api/leagues/${leagueId}?view=${LeagueView.MATCHES}`,
  );

  return {
    matches: response.data?.data?.matches ?? null,
    isLoading: !response.data && !response.error,
    error: response.error,
  };
};

export default useLeagueMatches;
