"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { PlayerDetailView, PlayerStatsResponse } from "@/types/players";

const usePlayerStats = (playerId: number) => {
  const response = useSWR<ApiResponse<PlayerStatsResponse>>(
    `/api/players/${playerId}?view=${PlayerDetailView.STATS}`,
  );

  return {
    stats: response.data?.data ?? null,
    isLoading: !response.data && !response.error,
    error: response.error,
  };
};

export default usePlayerStats;
