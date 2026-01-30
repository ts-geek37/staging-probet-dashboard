"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { HomeResponse } from "@/types/home";

export const useHome = (initialData?: ApiResponse<HomeResponse>) => {
  const response = useSWR<ApiResponse<HomeResponse>>("/api/v2/home", {
    fallbackData: initialData,
    revalidateOnMount: false,
  });
  const home = response?.data?.data;

  return {
    data: response.data?.data,
    isLoading: !response.data && !response.error,
    error: response.error,
    sections: home?.sections ?? {
      live_now: [],
      starting_soon: [],
      recently_finished: [],
      accuratePredictions: [],
    },

    topLeagues: home?.top_leagues ?? [],
    popularTeams: home?.popular_teams ?? [],
    news: home?.news ?? [],
  };
};
