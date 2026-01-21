"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { MatchListItem, MatchStatus, TeamMatchesResponse } from "@/types/teams";

const mapToMatchListItem = (match: MatchListItem): MatchListItem => ({
  id: match.id,
  kickoff_time: match.kickoff_time,
  status: match.status as MatchStatus,

  league: {
    id: match.league.id,
    name: match.league.name,
    logo: match.league.logo ?? null,
  },

  season: match.season
    ? {
        id: match.season.id,
        name: match.season.name,
      }
    : undefined,

  venue: match.venue
    ? {
        id: match.venue.id,
        name: match.venue.name,
        capacity: match.venue.capacity,
        city: match.venue.city,
        country: match.venue.country,
        surface: match.venue.surface,
        image: match.venue.image,
      }
    : undefined,

  teams: match.teams,

  score: match.score,
  referee: match.referee,
});

const useTeamMatches = (teamId: number) => {
  const { data, error } = useSWR<ApiResponse<TeamMatchesResponse>>(
    `/api/v2/teams/${teamId}/matches`,
  );

  const isLoading = !data && !error;
  const team = data;

  return {
    latest: (data?.data?.latest ?? []).map(mapToMatchListItem),
    upcoming: (data?.data?.upcoming ?? []).map(mapToMatchListItem),
    isLoading,
    error,
  };
};

export default useTeamMatches;
