"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import {
  MatchDetailView,
  MatchDetailViewResponseMap,
  MatchListStatus,
  MatchStatus,
} from "@/types/matches";

import { useLiveMatchDetail, useLiveMatchEvents } from "../../ws/hooks";

const useMatchDetail = <V extends keyof MatchDetailViewResponseMap>(
  matchId: number,
  view: V = MatchDetailView.OVERVIEW as V,
  status?: MatchListStatus | MatchStatus | number,
  team1?: number,
  team2?: number,
  seasonId?: number,
) => {
  const isLiveEventsView =
    view === MatchDetailView.EVENTS && status === MatchListStatus.LIVE;

  const isLiveOverviewView =
    view === MatchDetailView.OVERVIEW && status === MatchListStatus.LIVE;

  const {
    events: liveEvents,
    loading: socketLoading,
    connected: eventsConnected,
  } = useLiveMatchEvents({
    matchId,
    enabled: isLiveEventsView,
  });

  const {
    data: liveOverviewData,
    loading: liveOverviewLoading,
    connected: overviewConnected,
  } = useLiveMatchDetail({
    matchId,
    enabled: isLiveOverviewView,
  });

  let endpoint: string;

  switch (view) {
    case MatchDetailView.OVERVIEW:
      endpoint = `/api/v2/matches/${matchId}`;
      break;

    case MatchDetailView.HEAD_TO_HEAD:
      endpoint = `/api/v2/matches/head-to-head?team1=${team1}&team2=${team2}`;
      break;

    case MatchDetailView.SEASON_STATS:
      endpoint = `/api/v2/matches/${matchId}/team-stats/${seasonId}`;
      break;

    default:
      endpoint = `/api/v2/matches/${matchId}/${view}`;
  }

  const shouldFetch = !isLiveEventsView && !isLiveOverviewView;

  const {
    data,
    error,
    isLoading: swrLoading,
  } = useSWR<ApiResponse<MatchDetailViewResponseMap[V]>>(
    shouldFetch ? endpoint : null,
  );

  let returnData: MatchDetailViewResponseMap[V] | undefined;

  if (isLiveEventsView) {
    returnData = liveEvents as unknown as MatchDetailViewResponseMap[V];
  } else if (isLiveOverviewView) {
    returnData = (liveOverviewData ?? undefined) as
      | MatchDetailViewResponseMap[V]
      | undefined;
  } else {
    returnData = data?.data ?? undefined;
  }

  const isLoading = isLiveEventsView
    ? socketLoading
    : isLiveOverviewView
      ? liveOverviewLoading
      : swrLoading;

  const isLive =
    (isLiveEventsView && eventsConnected) ||
    (isLiveOverviewView && overviewConnected);

  return {
    data: returnData,
    isLoading,
    isLive,
    error,
  };
};

export default useMatchDetail;
