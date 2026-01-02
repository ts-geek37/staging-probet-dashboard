"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { LeagueResponse, LeagueView } from "@/types/leagues";

const useLeagueMatches = (leagueId: number) => {
  const response = useSWR<ApiResponse<LeagueResponse>>(
    `/api/leagues/${leagueId}?view=${LeagueView.MATCHES}`,
  );
  const leagueName = response.data?.data?.league?.name;
  const recentMatches =
    response.data?.data?.matches?.recent?.map((match) => ({
      ...match,
      leagueName,
    })) ?? [];

  const upcomingMatches =
    response.data?.data?.matches?.upcoming?.map((match) => ({
      ...match,
      leagueName,
    })) ?? [];

  return {
    upcomingMatches,
    recentMatches,
    isLoading: !response.data && !response.error,
    error: response.error,
  };
};

export default useLeagueMatches;
