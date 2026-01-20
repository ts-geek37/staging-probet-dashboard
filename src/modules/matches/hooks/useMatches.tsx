"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { MatchesListResponse, MatchListStatus } from "@/types/matches";

interface UseMatchesParams {
  tab: MatchListStatus;
  page?: number;
  limit?: number;
  q?: string;
}

const useMatches = ({ tab, page = 1, limit = 10, q }: UseMatchesParams) => {
  const query = new URLSearchParams({
    tab,
    page: String(page),
    limit: String(limit),
    ...(q ? { q } : {}),
  });

  const { data, error, isLoading } = useSWR<ApiResponse<MatchesListResponse>>(
    `/api/v2/matches?${query.toString()}`,
  );

  const matches = data?.data?.data ?? [];
  const pagination = data?.data?.pagination;

  return {
    matches,
    tab: data?.data?.tab,
    page: pagination?.page ?? page,
    limit: pagination?.limit ?? limit,
    has_more: pagination?.has_more ?? false,
    count: pagination?.count ?? 0,
    isLoading,
    error,
  };
};

export default useMatches;
