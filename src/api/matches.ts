import { serverFetch } from "@/api/http";
import {
  MatchDetailResponse,
  MatchDetailView,
  MatchesListResponse,
  MatchEventsResponse,
  MatchLineupsResponse,
  MatchListStatus,
  MatchOverviewResponse,
  MatchPredictionsResponse,
  MatchStatsResponse,
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
  status: MatchListStatus;
  page: number;
  limit: number;
  leagueId?: number;
  search?: string;
}): Promise<ApiResponse<MatchesListResponse>> => {
  const query = new URLSearchParams({
    status: params.status,
    page: String(params.page),
    limit: String(params.limit),
    ...(params.leagueId ? { leagueId: String(params.leagueId) } : {}),
    ...(params.search ? { search: params.search } : {}),
  });

  return serverFetch<MatchesListResponse>(`/api/matches?${query.toString()}`);
};

export function getMatchDetail<V extends MatchDetailView>(params: {
  id: number | string;
  view: V;
}): Promise<ApiResponse<MatchDetailByView<V>>> {
  return serverFetch<MatchDetailByView<V>>(
    `/api/matches/${params.id}?view=${params.view}`,
  );
}
