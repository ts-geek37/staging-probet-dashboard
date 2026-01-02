"use client";

import { ApiResponse } from "@/api/types";
import { PlayerListResponse } from "@/types/players";
import useSWR from "swr";

const useTeamPlayers = (
  teamId: number,
  page = 1,
  limit = 50,
  initialData?: ApiResponse<PlayerListResponse>,
) => {
  const response = useSWR<ApiResponse<PlayerListResponse>>(
    `/api/players?teamId=${teamId}&page=${page}&limit=${limit}`,
    {
      fallbackData: initialData,
      revalidateOnMount: false,
    },
  );

  return {
    players: response.data?.data?.data ?? [],
    pagination: response.data?.data?.pagination,
    isLoading: !response.data && !response.error,
    error: response.error,
  };
};

export default useTeamPlayers;
