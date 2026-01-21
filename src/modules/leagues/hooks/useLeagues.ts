"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { Continent, LeaguesListResponse } from "@/types/leagues";

interface UseLeaguesParams {
  page?: number;
  limit?: number;
  search?: string;
  continent?: Continent;
  initialData?: ApiResponse<LeaguesListResponse>;
  fetchAll?: boolean;
}

export const useLeagues = ({
  page = 1,
  limit,
  search,
  continent,
  initialData,
  fetchAll = false,
}: UseLeaguesParams) => {
  const params = new URLSearchParams();

  if (fetchAll) {
    params.set("page", "1");
    params.set("limit", "1000");
  } else {
    params.set("page", String(page));
    params.set("limit", String(limit ?? 20));
  }

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
      revalidateOnMount: true,
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
