"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { MatchDetailResponse, MatchDetailView } from "@/types/matches";

const useMatchDetail = (matchId: number, view: MatchDetailView) => {
  const { data, error, isLoading } = useSWR<ApiResponse<MatchDetailResponse>>(
    `/api/matches/${matchId}?view=${view}`,
  );

  return {
    data: data?.data,
    isLoading,
    error,
  };
};

export default useMatchDetail;
