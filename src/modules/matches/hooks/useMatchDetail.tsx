"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { MatchDetailView, MatchDetailViewResponseMap } from "@/types/matches";

const useMatchDetail = <V extends MatchDetailView>(
  matchId: number,
  view: V = MatchDetailView.OVERVIEW as V,
) => {
  const endpoint =
    view === MatchDetailView.OVERVIEW
      ? `/api/v2/matches/${matchId}`
      : `/api/v2/matches/${matchId}/${view}`;

  const { data, error, isLoading } =
    useSWR<ApiResponse<MatchDetailViewResponseMap[V]>>(endpoint);

  return {
    data: data?.data,
    isLoading,
    error,
  };
};

export default useMatchDetail;
