"use client";
import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { LeagueMatchesResponse, LeagueView } from "@/types/leagues";

const useLeagueMatches = (leagueId: number) => {
  const response = useSWR<ApiResponse<LeagueMatchesResponse>>(
    `/api/v2/leagues/${leagueId}/${LeagueView.MATCHES}`,
  );

  const leagueName = response.data?.data?.league?.name;
  const matches = response.data?.data?.matches ?? [];

  const recentMatches = matches
    .filter((m) => m.status === "FT")
    .map((match) => ({
      ...match,
      leagueName,
    }));

  const upcomingMatches = matches
    .filter((m) => m.status === "UPCOMING")
    .map((match) => ({
      ...match,
      leagueName,
    }));

  const liveMatches = matches
    .filter((m) => m.status === "LIVE")
    .map((match) => ({
      ...match,
      leagueName,
    }));

  return {
    upcomingMatches,
    recentMatches,
    liveMatches,
    isLoading: !response.data && !response.error,
    error: response.error,
  };
};

export default useLeagueMatches;
