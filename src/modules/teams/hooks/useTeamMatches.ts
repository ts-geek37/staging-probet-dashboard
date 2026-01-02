"use client";

import { ApiResponse } from "@/api/types";
import { TeamDetailView, TeamMatchesResponse } from "@/types/teams";
import useSWR from "swr";

const useTeamMatches = (teamId: number) => {
  const response = useSWR<ApiResponse<TeamMatchesResponse>>(
    `/api/teams/${teamId}?view=${TeamDetailView.MATCHES}`,
  );

  return {
    matches: response.data?.data?.matches ?? [],
    isLoading: !response.data && !response.error,
    error: response.error,
  };
};

export default useTeamMatches;
