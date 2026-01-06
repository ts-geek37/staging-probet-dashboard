/*
"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { LeagueResponse, LeagueView } from "@/types/leagues";

const useLeagueTeams = (leagueId: number) => {
  const response = useSWR<ApiResponse<LeagueResponse>>(
    `/api/leagues/${leagueId}?view=${LeagueView.TEAMS}`,
  );

  return {
    teams: response.data?.data?.teams?.teams ?? [],
    isLoading: !response.data && !response.error,
    error: response.error,
  };
};

export default useLeagueTeams;
*/
const useLeagueTeams = () => ({ teams: [], isLoading: false, error: null });
export default useLeagueTeams;
