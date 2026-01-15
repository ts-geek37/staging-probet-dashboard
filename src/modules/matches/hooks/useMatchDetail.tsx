"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { MatchDetailView, MatchDetailViewResponseMap } from "@/types/matches";

const useMatchDetail = <V extends MatchDetailView>(
  matchId: number,
  view: V = MatchDetailView.OVERVIEW as V,
  team1?: number,
  team2?: number,
  seasonId?: number,
) => {
  let endpoint =
    view === MatchDetailView.OVERVIEW
      ? `/api/v2/matches/${matchId}`
      : `/api/v2/matches/${matchId}/${view}`;

  if (view === MatchDetailView.HEAD_TO_HEAD && team1 && team2) {
    endpoint = `/api/v2/matches/head-to-head?team1=${team1}&team2=${team2}`;
  }

  if (view === MatchDetailView.SEASON_STATS && seasonId) {
    endpoint = `/api/v2/matches/${matchId}/team-stats/${seasonId}`;
  }

  const { data, error, isLoading } =
    useSWR<ApiResponse<MatchDetailViewResponseMap[V]>>(endpoint);

  return {
    data: data?.data,
    isLoading,
    error,
  };
};

export default useMatchDetail;
