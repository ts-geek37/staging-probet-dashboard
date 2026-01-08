import { serverFetch } from "@/api/http";
import {
  MatchDetailResponse,
  MatchDetailView,
  MatchesListResponse,
  MatchEventsResponse,
  MatchLineupsResponse,
  MatchOverviewResponse,
  MatchPredictionsResponse,
  MatchStatsResponse,
  MatchStatus, // ✅ NEW
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
  : V extends MatchDetailView.PREDICTIONS
  ? MatchPredictionsResponse
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
  return serverFetch<MatchDetailByView<V>>(
    `/api/matches/${params.id}?view=${params.view}`,
  );
}
