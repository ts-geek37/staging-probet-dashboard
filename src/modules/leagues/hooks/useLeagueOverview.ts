"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { LeagueProfileResponse, LeagueView } from "@/types/leagues";

const useLeagueOverview = (
  leagueId: number,
  initialData?: ApiResponse<LeagueProfileResponse>,
) => {
  const response = useSWR<ApiResponse<LeagueProfileResponse>>(
    `/api/leagues/${leagueId}?view=${LeagueView.OVERVIEW}`,
    {
      fallbackData: initialData,
      revalidateOnMount: false,
    },
  );

  return {
    league: response.data?.data,
    isLoading: !response.data && !response.error,
    error: response.error,
  };
};

export default useLeagueOverview;
