"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import {
    LeagueResponse,
    LeagueView
} from "@/types/leagues";

interface UseLeaguesParams {
  id: string;
  view: LeagueView;
  initialData?: ApiResponse<LeagueResponse>;
}

const useLeagueFetch = ({ id, view, initialData }: UseLeaguesParams) => {
  const params = new URLSearchParams({
    view: String(view),
  });
  const key = `/api/leagues/${id}?${params.toString()}`;

  const { data, error, isLoading } = useSWR<ApiResponse<LeagueResponse>>(key, {
    fallbackData: initialData,
    revalidateOnMount: false,
    keepPreviousData: true,
  });

  return {
    data,
    isLoading,
    error,
  };
};
export default useLeagueFetch;
