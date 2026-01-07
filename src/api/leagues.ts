import { serverFetch } from "@/api/http";
import {
  LeaguesListResponse,
  LeagueView,
  LeagueViewResponseMap,
  MatchListStatus
} from "@/types/leagues";

import { ApiResponse } from "./types";

export const getLeagueDetail = <TView extends LeagueView>(params: {
  id: number | string;
  view: TView;
  status?: MatchListStatus;
}): Promise<ApiResponse<LeagueViewResponseMap[TView]>> => {
  const query = new URLSearchParams({
    ...(params.status ? { status: params.status } : {}),
  });
  const queryString = query.toString();
  return serverFetch<LeagueViewResponseMap[TView]>(
    `/api/v2/leagues/${params.id}/${params.view}${queryString ? `?${queryString}` : ""}`,
  );
};

export const getLeagues = (params: {
  page: number;
  limit: number;
  search?: string;
}): Promise<ApiResponse<LeaguesListResponse>> => {
  const query = new URLSearchParams({
    page: String(params.page),
    limit: String(params.limit),
    ...(params.search ? { search: params.search } : {}),
  });

  return serverFetch<LeaguesListResponse>(
    `/api/v2/leagues?${query.toString()}`,
  );
};
