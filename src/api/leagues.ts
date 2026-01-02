import { serverFetch } from "@/api/http";
import {
  LeagueListResponse,
  LeagueResponse,
  LeagueView,
} from "@/types/leagues";

import { ApiResponse } from "./types";

export const getLeagueDetail = (params: {
  id: number | string;
  view: LeagueView;
}): Promise<ApiResponse<LeagueResponse>> =>
  serverFetch<LeagueResponse>(`/api/leagues/${params.id}?view=${params.view}`);

export const getLeagues = (params: {
  page: number;
  limit: number;
  search?: string;
}): Promise<ApiResponse<LeagueListResponse>> => {
  const query = new URLSearchParams({
    page: String(params.page),
    limit: String(params.limit),
    ...(params.search ? { search: params.search } : {}),
  });

  return serverFetch<LeagueListResponse>(`/api/leagues?${query.toString()}`);
};
