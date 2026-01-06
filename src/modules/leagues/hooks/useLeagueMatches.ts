"use client";
import useSWR from "swr";

import { getLeagueDetail } from "@/api/leagues";
import { LeagueView } from "@/types/leagues";

const useLeagueMatches = (leagueId: number) => {
  const response = useSWR(
    leagueId ? [leagueId, LeagueView.MATCHES] : null,
    () => getLeagueDetail({ id: leagueId, view: LeagueView.MATCHES }),
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
    .filter((m) => m.status !== "FT")
    .map((match) => ({
      ...match,
      leagueName,
    }));

  return {
    upcomingMatches,
    recentMatches,
    isLoading: !response.data && !response.error,
    error: response.error,
  };
};

export default useLeagueMatches;
