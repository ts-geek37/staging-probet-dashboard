"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { LeagueResponse, LeagueView } from "@/types/leagues";

const useLeagueOverview = (
  leagueId: number,
  initialData?: ApiResponse<LeagueResponse>,
) => {
  const response = useSWR<ApiResponse<LeagueResponse>>(
    `/api/leagues/${leagueId}?view=${LeagueView.OVERVIEW}`,
    {
      fallbackData: initialData,
      revalidateOnMount: false,
    },
  );

  return {
    overview: response.data?.data?.overview ?? null,
    recentMatches: response.data?.data?.recent ?? null,
    league: response.data?.data?.league ?? null,
    isLoading: !response.data && !response.error,
    error: response.error,
  };
};

export default useLeagueOverview;
