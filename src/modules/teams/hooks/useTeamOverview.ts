"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { TeamDetailView, TeamOverviewResponse } from "@/types/teams";

const useTeamOverview = (
  teamId: number,
  initialData?: ApiResponse<TeamOverviewResponse>,
) => {
  const response = useSWR<ApiResponse<TeamOverviewResponse>>(
    `/api/teams/${teamId}?view=${TeamDetailView.OVERVIEW}`,
    {
      fallbackData: initialData,
      revalidateOnMount: false,
    },
  );

  return {
    team: response.data?.data ?? null,
    isLoading: !response.data && !response.error,
    error: response.error,
  };
};

export default useTeamOverview;
