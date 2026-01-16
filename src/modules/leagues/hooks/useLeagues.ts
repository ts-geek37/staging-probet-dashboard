"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { Continent, LeaguesListResponse } from "@/types/leagues";

interface UseLeaguesParams {
  page: number;
  limit: number;
  search?: string;
  continent?: Continent;
  initialData?: ApiResponse<LeaguesListResponse>;
}

export const useLeagues = ({
  page,
  limit,
  search,
  continent,
  initialData,
}: UseLeaguesParams) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (search?.trim()) {
    params.set("search", search.trim());
  }
  if (continent) {
    params.set("continent", continent);
  }
  const key = `/api/v2/leagues?${params.toString()}`;

  const { data, error, isLoading } = useSWR<ApiResponse<LeaguesListResponse>>(
    key,
    {
      fallbackData: initialData,
      revalidateOnMount: false,
      keepPreviousData: true,
    },
  );

  return {
    leagues: data?.data?.data ?? [],
    pagination: data?.data?.pagination
      ? {
          total: data.data.pagination.count,
          totalPages: data.data.pagination.total_pages,
        }
      : null,
    isLoading,
    error,
  };
};
