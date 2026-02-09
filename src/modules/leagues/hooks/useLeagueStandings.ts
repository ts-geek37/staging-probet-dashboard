"use client";
import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { LeagueStandingsResponse, LeagueView } from "@/types/leagues";

const useLeagueStandings = (leagueId: number) => {
  const response = useSWR<ApiResponse<LeagueStandingsResponse>>(
    `/api/v2/leagues/${leagueId}/${LeagueView.STANDINGS}`,
  );
  return {
    standings: response.data?.data?.table ?? [],
    league: response.data?.data?.league,
    season: response.data?.data?.season,
    isLoading: !response.data && !response.error,
    error: response.error,
  };
};

export default useLeagueStandings;
