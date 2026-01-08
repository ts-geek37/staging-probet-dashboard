import { serverFetch } from "@/api/http";
import {
  MatchDetailView,
  MatchesListResponse,
  MatchEventsResponse,
  MatchLineupsResponse,
  MatchOverviewResponse,
  MatchStatsResponse,
  MatchStatus,
} from "@/types/matches";


import { ApiResponse } from "./types";

type MatchDetailByView<V extends MatchDetailView> =
  V extends MatchDetailView.OVERVIEW
  ? MatchOverviewResponse
  : V extends MatchDetailView.STATS
  ? MatchStatsResponse
  : V extends MatchDetailView.LINEUPS
  ? MatchLineupsResponse
  : V extends MatchDetailView.EVENTS
  ? MatchEventsResponse
  : never;

export const getMatches = (params: {
  tab: MatchStatus;
  page?: number;
  limit?: number;
  q?: string;
}): Promise<ApiResponse<MatchesListResponse>> => {
  const query = new URLSearchParams({
    tab: params.tab,
    ...(params.page ? { page: String(params.page) } : {}),
    ...(params.limit ? { limit: String(params.limit) } : {}),
    ...(params.q ? { q: params.q } : {}),
  });

  return serverFetch<MatchesListResponse>(
    `/api/v2/matches?${query.toString()}`,
  );
};

export function getMatchDetail<V extends MatchDetailView>(params: {
  id: number | string;
  view: V;
}): Promise<ApiResponse<MatchDetailByView<V>>> {
  const endpoint =
    params.view === MatchDetailView.OVERVIEW
      ? `/api/v2/matches/${params.id}`
      : `/api/v2/matches/${params.id}/${params.view}`;

  return serverFetch<MatchDetailByView<V>>(endpoint);
}
