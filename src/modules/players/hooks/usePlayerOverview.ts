"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { PlayerDetailView, PlayerOverviewResponse } from "@/types/players";

const usePlayerOverview = (
  playerId: number,
  initialData?: ApiResponse<PlayerOverviewResponse>,
) => {
  const response = useSWR<ApiResponse<PlayerOverviewResponse>>(
    `/api/players/${playerId}?view=${PlayerDetailView.OVERVIEW}`,
    {
      fallbackData: initialData,
      revalidateOnMount: false,
    },
  );

  return {
    player: response.data?.data ?? null,
    isLoading: !response.data && !response.error,
    error: response.error,
  };
};

export default usePlayerOverview;
