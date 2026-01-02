"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { TeamDetailView, TeamStatsResponse } from "@/types/teams";

const useTeamStats = (teamId: number) => {
  const response = useSWR<ApiResponse<TeamStatsResponse>>(
    `/api/teams/${teamId}?view=${TeamDetailView.STATS}`,
  );

  return {
    stats: response.data?.data ?? null,
    isLoading: !response.data && !response.error,
    error: response.error,
  };
};

export default useTeamStats;
