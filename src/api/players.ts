import { serverFetch } from "@/api/http";
import {
    PlayerDetailView,
    PlayerListResponse,
    PlayerMatchesResponse,
    PlayerOverviewResponse,
    PlayerStatsResponse
} from "@/types/players";

import { ApiResponse } from "./types";

type PlayerDetailByView<V extends PlayerDetailView> =
  V extends PlayerDetailView.OVERVIEW
    ? PlayerOverviewResponse
    : V extends PlayerDetailView.STATS
      ? PlayerStatsResponse
      : V extends PlayerDetailView.MATCHES
        ? PlayerMatchesResponse
        : never;

export const getPlayers = (params: {
  page: number;
  limit: number;
  search?: string;
  teamId?: number;
}): Promise<ApiResponse<PlayerListResponse>> => {
  const query = new URLSearchParams({
    page: String(params.page),
    limit: String(params.limit),
    ...(params.search ? { search: params.search } : {}),
    ...(params.teamId ? { teamId: String(params.teamId) } : {}),
  });

  return serverFetch<PlayerListResponse>(`/api/players?${query.toString()}`);
};

export const getPlayerDetail = <V extends PlayerDetailView>(params: {
  id: number | string;
  view: V;
}): Promise<ApiResponse<PlayerDetailByView<V>>> =>
  serverFetch<PlayerDetailByView<V>>(
    `/api/players/${params.id}?view=${params.view}`,
  );
