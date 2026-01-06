"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { PlayerDetailView, PlayerOverviewResponse } from "@/types/players";
import { getFlagUrlByName } from "@/utils/countryFlag";

const usePlayerOverview = (
  playerId: number,
  initialData?: ApiResponse<PlayerOverviewResponse>,
) => {
  const response = useSWR<ApiResponse<PlayerOverviewResponse>>(
    `/api/players/${playerId}?view=${PlayerDetailView.OVERVIEW}`,
    {
      fallbackData: initialData,
      revalidateOnMount: false,
    },
  );
  const data = response?.data?.data
  const player = data ? { ...data, country_flag: getFlagUrlByName(data.nationality) } : null

  return {
    player,
    isLoading: !response.data && !response.error,
    error: response.error,
  };
};

export default usePlayerOverview;
