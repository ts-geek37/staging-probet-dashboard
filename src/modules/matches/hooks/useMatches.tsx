"use client";

import { ApiResponse } from "@/api/types";
import { MatchesListResponse, MatchListStatus } from "@/types/matches";
import useSWR from "swr";

const useMatches = (params: {
  status: MatchListStatus;
  page: number;
  limit: number;
  leagueId?: number;
  search?: string;
}) => {
  const query = new URLSearchParams({
    status: params.status,
    page: String(params.page),
    limit: String(params.limit),
    ...(params.leagueId ? { leagueId: String(params.leagueId) } : {}),
    ...(params.search ? { search: params.search } : {}),
  });

  const { data, error, isLoading } = useSWR<ApiResponse<MatchesListResponse>>(
    `/api/matches?${query.toString()}`,
  );

  return {
    matches: data?.data?.data ?? [],
    pagination: data?.data?.pagination,
    isLoading,
    error,
  };
};

export default useMatches;
