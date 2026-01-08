"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import type { TeamMatchesResponse } from "@/types/teams";

const useTeamMatches = (teamId: number) => {
  const { data, error } = useSWR<ApiResponse<TeamMatchesResponse>>(
    `/api/v2/teams/${teamId}/matches`,
  );

  const isLoading = !data && !error;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return {
    latest: data?.data?.latest ?? [],
    upcoming: data?.data?.upcoming ?? [],
    isLoading,
    error,
    formatDate,
  };
};

export default useTeamMatches;
