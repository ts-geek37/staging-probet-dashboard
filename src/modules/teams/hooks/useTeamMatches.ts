"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { TeamDetailView, TeamMatchesResponse } from "@/types/teams";

const useTeamMatches = (teamId: number) => {
  const response = useSWR<ApiResponse<TeamMatchesResponse>>(
    `/api/teams/${teamId}?view=${TeamDetailView.MATCHES}`,
  );

  const matches = response.data?.data?.matches;
  const upcomingMatches = matches?.upcoming;
  const recentMatches = matches?.recent;

  const sections = [
    recentMatches && {
      key: "recent",
      title: "Recent Results",
      matches: recentMatches,
    },
    upcomingMatches && {
      key: "upcoming",
      title: "Upcoming Fixtures",
      matches: upcomingMatches,
    },
  ];

  return {
    sections,
    isLoading: !response.data && !response.error,
    error: response.error,
  };
};

export default useTeamMatches;
