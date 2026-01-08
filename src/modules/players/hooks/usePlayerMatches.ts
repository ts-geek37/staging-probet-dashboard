"use client";

import { useState } from "react";
import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { PlayerDetailView, PlayerMatchesResponse } from "@/types/players";

const usePlayerMatches = (playerId: number) => {
  const [page, setPage] = useState(1);
  const limit = 6;

  const response = useSWR<ApiResponse<PlayerMatchesResponse>>(
    `/api/v2/players/${playerId}/${PlayerDetailView.MATCHES}?page=${page}&limit=${limit}`,
  );

  return {
    matches: response.data?.data?.matches || [],
    pagination: response.data?.data?.pagination,
    isLoading: !response.data && !response.error,
    error: response.error,
    page,
    setPage,
  };
};

export default usePlayerMatches;
