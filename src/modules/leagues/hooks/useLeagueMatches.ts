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
  const recentMatches = response.data?.data?.recentMatches.slice(0, 6) ?? [];
  const upcomingMatches =
    response.data?.data?.upcomingMatches.slice(0, 6) ?? [];
  const liveMatches = matches.filter((m) => m.status === "LIVE");

  return {
    upcomingMatches,
    recentMatches,
    leagueName,
    liveMatches,
    isLoading: !response.data && !response.error,
    error: response.error,
  };
};

export default useLeagueMatches;
