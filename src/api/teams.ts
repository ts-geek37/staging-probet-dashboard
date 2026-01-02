import { serverFetch } from "@/api/http";
import {
  TeamDetailView,
  TeamListResponse,
  TeamMatchesResponse,
  TeamOverviewResponse,
  TeamSquadResponse,
  TeamStatsResponse,
} from "@/types/teams";
import { ApiResponse } from "./types";

type TeamDetailByView<V extends TeamDetailView> =
  V extends TeamDetailView.OVERVIEW
    ? TeamOverviewResponse
    : V extends TeamDetailView.MATCHES
      ? TeamMatchesResponse
      : V extends TeamDetailView.STATS
        ? TeamStatsResponse
        : V extends TeamDetailView.SQUAD
          ? TeamSquadResponse
          : never;

export const getTeams = (params: {
  page: number;
  limit: number;
  search?: string;
  region?: string;
}): Promise<ApiResponse<TeamListResponse>> => {
  const query = new URLSearchParams({
    page: String(params.page),
    limit: String(params.limit),
    ...(params.search ? { search: params.search } : {}),
    ...(params.region ? { region: params.region } : {}),
  });

  return serverFetch<TeamListResponse>(`/api/teams?${query.toString()}`);
};

export const getTeamDetail = <V extends TeamDetailView>(params: {
  id: number | string;
  view: V;
}): Promise<ApiResponse<TeamDetailByView<V>>> =>
  serverFetch<TeamDetailByView<V>>(
    `/api/teams/${params.id}?view=${params.view}`,
  );
