"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { PlayerDetailView, PlayerMatchesResponse } from "@/types/players";

const usePlayerMatches = (playerId: number) => {
  const response = useSWR<ApiResponse<PlayerMatchesResponse>>(
    `/api/players/${playerId}?view=${PlayerDetailView.MATCHES}`,
  );

  return {
    matches: response.data?.data?.matches || [],
    isLoading: !response.data && !response.error,
    error: response.error,
  };
};

export default usePlayerMatches;
