"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { LeagueListResponse } from "@/types/leagues";

export function useLeagues(
  page = 1,
  limit = 20,
  initialData?: ApiResponse<LeagueListResponse>,
) {
  const response = useSWR<ApiResponse<LeagueListResponse>>(
    `/api/leagues?page=${page}&limit=${limit}`,
    {
      fallbackData: initialData,
      revalidateOnMount: false,
    },
  );

  return {
    leagues: response.data?.data?.data || [],
    isLoading: !response.data && !response.error,
    error: response.error,
  };
}
