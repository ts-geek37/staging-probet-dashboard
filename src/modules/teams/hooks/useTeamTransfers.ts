"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { TeamTransferResponse, TeamTransferRow } from "@/types/teams";

interface UseTeamTransfersOptions {
  page?: number;
  limit?: number;
}

const useTeamTransfers = (
  teamId: number,
  options?: UseTeamTransfersOptions,
) => {
  const [page, setPage] = useState(options?.page ?? 1);
  const limit = options?.limit ?? 5;

  const response = useSWR<ApiResponse<TeamTransferResponse>>(
    `/api/v2/teams/${teamId}/transfers`,
  );

  const transfers = useMemo<TeamTransferRow[]>(
    () => response.data?.data?.transfers ?? [],
    [response.data],
  );

  const pagination = response.data?.data?.pagination ?? null;

  return {
    transfers,
    pagination,
    page,
    setPage,
    isLoading: !response.data && !response.error,
    error: response.error,
  };
};

export default useTeamTransfers;
