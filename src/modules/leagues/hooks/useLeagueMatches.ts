"use client";
import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { useGeneralLiveMatches } from "@/modules/ws/hooks";
import { LiveScopeEnum } from "@/modules/ws/types";
import { LeagueMatchesResponse, LeagueView } from "@/types/leagues";

const useLeagueMatches = (leagueId: number) => {
  const response = useSWR<ApiResponse<LeagueMatchesResponse>>(
    `/api/v2/leagues/${leagueId}/${LeagueView.MATCHES}?limit=6`,
  );

  const leagueName = response.data?.data?.league?.name;
  const recentMatches = response.data?.data?.recentMatches.slice(0, 6) ?? [];
  const upcomingMatches =
    response.data?.data?.upcomingMatches.slice(0, 6) ?? [];
   const { data: liveMatches, loading: isLoading } = useGeneralLiveMatches([], {
    scope: LiveScopeEnum.LEAGUE,
    id: leagueId,
  });
  return {
    liveMatches: liveMatches,
    upcomingMatches,
    recentMatches,
    leagueName,
    isLoading: !response.data && !response.error && !isLoading,
    error: response.error,
  };
};

export default useLeagueMatches;
