"use client";
import useSWR from "swr";

import { getLeagueDetail } from "@/api/leagues";
import { LeagueView } from "@/types/leagues";

const useLeagueStandings = (leagueId: number) => {
  const response = useSWR(
    leagueId ? [leagueId, LeagueView.STANDINGS] : null,
    () => getLeagueDetail({ id: leagueId, view: LeagueView.STANDINGS }),
  );

  return {
    standings: response.data?.data?.table ?? [],
    isLoading: !response.data && !response.error,
    error: response.error,
  };
};

export default useLeagueStandings;
