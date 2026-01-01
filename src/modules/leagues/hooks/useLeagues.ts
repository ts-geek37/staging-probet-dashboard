"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { LeagueListResponse } from "@/types/leagues";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

export function useLeagues(
  page = 1,
  limit = 20,
  initialData?: ApiResponse<LeagueListResponse>,
  search?: string,
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(limit));

  if (search?.trim()) {
    params.set("search", search.trim());
  }

  const key = `/api/leagues?${params.toString()}`;

  const response = useSWR<ApiResponse<LeagueListResponse>>(key, {
    fallbackData: initialData,
    revalidateOnMount: false,
  });

  const syncToUrl = useCallback(() => {
    const current = new URLSearchParams(searchParams.toString());

    current.set("page", String(page));
    current.set("limit", String(limit));

    if (search?.trim()) {
      current.set("search", search.trim());
    } else {
      current.delete("search");
    }

    router.push(`${pathname}?${current.toString()}`);
  }, [page, limit, search]);

  useEffect(() => {
    syncToUrl();
  }, [syncToUrl]);

  return {
    leagues: response.data?.data?.data || [],
    isLoading: !response.data && !response.error,
    error: response.error,
  };
}
