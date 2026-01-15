"use client";

import { useState, useMemo } from "react";
import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { PaginationMeta } from "@/types/leagues";
import {
  PlayerTransfer,
  PlayerTransferAPI,
  UsePlayerTransfersOptions,
} from "@/types/players";

const usePlayerTransfers = (
  playerId: number,
  options?: UsePlayerTransfersOptions,
) => {
  const [page, setPage] = useState<number>(options?.initialPage ?? 1);
  const limit = options?.limit ?? 10;

  const { data, error, isLoading } = useSWR<
    ApiResponse<{ transfers: PlayerTransferAPI[]; pagination: PaginationMeta }>
  >(
    playerId
      ? `/api/v2/players/${playerId}/transfers?page=${page}&limit=${limit}`
      : null,
  );
  const transfers: PlayerTransfer[] = useMemo(
    () =>
      data?.data?.transfers.map((t) => ({
        id: t.id,
        date: t.date,
        type: t.type,
        completed: t.completed,
        amount: t.amount,
        fromTeam: t.from_team
          ? {
              id: t.from_team.id,
              name: t.from_team.name,
              shortCode: t.from_team.short_code || "",
              image: t.from_team.logo,
            }
          : null,
        toTeam: t.to_team
          ? {
              id: t.to_team.id,
              name: t.to_team.name,
              shortCode: t.to_team.short_code || "",
              image: t.to_team.logo,
            }
          : null,
      })) ?? [],
    [data],
  );

  const pagination = useMemo(() => data?.data?.pagination ?? null, [data]);

  return {
    transfers,
    pagination,
    page,
    setPage,
    limit,
    isLoading,
    error,
  };
};

export default usePlayerTransfers;
