"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { LeaguesListResponse } from "@/types/leagues";

interface UseLeaguesParams {
  page: number;
  limit: number;
  search?: string;
  initialData?: ApiResponse<LeaguesListResponse>;
}

export const useLeagues = ({
  page,
  limit,
  search,
  initialData,
}: UseLeaguesParams) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });
  if (search?.trim()) {
    params.set("search", search.trim());
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
          total: data.data.pagination.total,
          totalPages: Math.ceil(data.data.pagination.total / limit),
        }
      : null,
    isLoading,
    error,
  };
};
