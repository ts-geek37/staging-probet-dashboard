import { serverFetch } from "@/api/http";
import {
  MatchDetailResponse,
  MatchDetailView,
  MatchesListResponse,
  MatchListStatus,
} from "@/types/matches";

import { ApiResponse } from "./types";

export function getMatches(params: {
  status: MatchListStatus;
  page: number;
  limit: number;
  leagueId?: number;
  search?: string;
}): Promise<ApiResponse<MatchesListResponse>> {
  const query = new URLSearchParams({
    status: params.status,
    page: String(params.page),
    limit: String(params.limit),
    ...(params.leagueId ? { leagueId: String(params.leagueId) } : {}),
    ...(params.search ? { search: params.search } : {}),
  });

  return serverFetch<MatchesListResponse>(`/api/matches?${query.toString()}`);
}

export function getMatchDetail(params: {
  id: number | string;
  view: MatchDetailView;
}): Promise<ApiResponse<MatchDetailResponse>> {
  return serverFetch<MatchDetailResponse>(
    `/api/matches/${params.id}?view=${params.view}`,
  );
}
