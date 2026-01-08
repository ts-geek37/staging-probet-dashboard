"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { MatchesListResponse, MatchStatus } from "@/types/matches";

interface UseMatchesParams {
  tab: MatchStatus;
  page?: number;
  limit?: number;
  q?: string;
}

const useMatches = ({
  tab,
  page = 1,
  limit = 10,
  q,
}: UseMatchesParams) => {
  const query = new URLSearchParams({
    tab,
    page: String(page),
    limit: String(limit),
    ...(q ? { q } : {}),
  });

  const { data, error, isLoading } = useSWR<
    ApiResponse<MatchesListResponse>
  >(`/api/v2/matches?${query.toString()}`);

  const matches = data?.data?.data ?? [];
  const pagination = data?.data?.pagination;

  const totalPages = pagination
    ? pagination.has_next
      ? page + 1
      : page
    : 1;

  return {
    matches,
    tab: data?.data?.tab,
    pagination,
    totalPages,
    isLoading,
    error,
  };
};

export default useMatches;
