import { serverFetch } from "@/api/http";
import { TeamListResponse, TeamOverviewResponse } from "@/types/teams";

import { ApiResponse } from "./types";

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

  return serverFetch<TeamListResponse>(`/api/v2/teams/?${query.toString()}`);
};

export const getTeamDetail = (params: {
  id: number | string;
}): Promise<ApiResponse<TeamOverviewResponse>> =>
  serverFetch<TeamOverviewResponse>(`/api/v2/teams/${params.id}`);
