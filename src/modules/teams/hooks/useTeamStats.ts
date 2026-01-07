"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { TeamStatsApi, SeasonStatsApi, StatItem } from "@/types/teams";

const useTeamStats = (teamId: number, seasonId?: number) => {
  const { data, error } = useSWR<ApiResponse<TeamStatsApi>>(
    `/api/v2/teams/${teamId}/stats`,
  );

  const seasons: SeasonStatsApi[] = data?.data?.seasons ?? [];
  const team = data?.data?.team ?? null;

  const seasonData = seasonId
    ? (seasons.find((s) => s.season.id === seasonId) ?? null)
    : (seasons[0] ?? null);

  const stats = seasonData?.stats ?? null;

  const overviewStats: StatItem[] = stats
    ? [
        { label: "Goals For", value: stats.goals_for },
        { label: "Goals Against", value: stats.goals_against },
        { label: "Shots", value: stats.shots },
        { label: "Yellow Cards", value: stats.yellow_cards },
        { label: "Red Cards", value: stats.red_cards },
        { label: "Minutes Played", value: stats.minutes_played },
        { label: "Clean Sheets", value: stats.clean_sheets },
        { label: "Wins", value: stats.wins },
        { label: "Draws", value: stats.draws },
        { label: "Losses", value: stats.losses },
      ]
    : [];

  return {
    overviewStats,
    team,
    seasons,
    selectedSeason: seasonData?.season ?? null,
    stats,
    isLoading: !data && !error,
    error,
  };
};

export default useTeamStats;
