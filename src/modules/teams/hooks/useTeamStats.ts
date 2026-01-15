"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { TeamSeasonStatsResponse } from "@/types/teams";

export interface TeamStatItem {
  label: string;
  value: string | number;
  color?: string;
}

const useTeamStats = (teamId: number) => {
  const response = useSWR<ApiResponse<TeamSeasonStatsResponse>>(
    `/api/v2/teams/${teamId}/stats`,
  );

  const [seasonId, setSeasonId] = useState<number | null>(null);

  const team = response.data?.data?.team ?? null;

  const seasons = useMemo(
    () => response.data?.data?.seasons ?? [],
    [response.data],
  );

  const seasonOptions = useMemo(
    () =>
      seasons.map((s) => ({
        value: s.season.id,
        label: s.season.name,
      })),
    [seasons],
  );

  const seasonStats = useMemo(() => {
    if (!seasons.length) return null;

    const season = seasons.find((s) => s.season.id === seasonId) ?? seasons[0];

    const s = season?.stats;
    if (!s) return null;

    return {
      currentSeason: season,

      overview: [
        s.games_played != null && {
          label: "Games Played",
          value: s.games_played,
        },
        s.wins != null && { label: "Wins", value: s.wins },
        s.draws != null && { label: "Draws", value: s.draws },
        s.losses != null && { label: "Losses", value: s.losses },
        s.points_per_game != null && {
          label: "Points / Game",
          value: s.points_per_game.toFixed(2),
        },
      ].filter(Boolean) as TeamStatItem[],

      attacking: [
        s.goals_for != null && { label: "Goals For", value: s.goals_for },
        s.expected_goals != null && {
          label: "Expected Goals (xG)",
          value: s.expected_goals.toFixed(2),
        },
        s.shots != null && { label: "Shots", value: s.shots },
        s.corners != null && { label: "Corners", value: s.corners },
        s.attacks != null && { label: "Attacks", value: s.attacks },
        s.dangerous_attacks != null && {
          label: "Dangerous Attacks",
          value: s.dangerous_attacks,
        },
      ].filter(Boolean) as TeamStatItem[],

      defensive: [
        s.goals_against != null && {
          label: "Goals Against",
          value: s.goals_against,
        },
        s.clean_sheets != null && {
          label: "Clean Sheets",
          value: s.clean_sheets,
        },
        s.failed_to_score != null && {
          label: "Failed to Score",
          value: s.failed_to_score,
        },
      ].filter(Boolean) as TeamStatItem[],

      discipline: [
        s.yellow_cards != null && {
          label: "Yellow Cards",
          value: s.yellow_cards,
          color: "text-primary-yellow",
        },
        s.red_cards != null && {
          label: "Red Cards",
          value: s.red_cards,
          color: "text-primary-red",
        },
        s.minutes_played != null && {
          label: "Minutes Played",
          value: s.minutes_played.toLocaleString(),
        },
        s.possession != null && {
          label: "Avg Possession",
          value: `${s.possession}%`,
        },
        s.rating != null && {
          label: "Team Rating",
          value: s.rating.toFixed(2),
        },
        s.average_player_age != null && {
          label: "Avg Player Age",
          value: s.average_player_age,
        },
        s.foreign_players != null && {
          label: "Foreign Players",
          value: s.foreign_players,
        },
      ].filter(Boolean) as TeamStatItem[],
    };
  }, [seasons, seasonId]);

  return {
    team,
    seasons,

    seasonOptions,
    seasonId: seasonId ?? seasonOptions[0]?.value ?? null,
    setSeasonId,

    currentSeason: seasonStats?.currentSeason ?? null,

    overviewStats: seasonStats?.overview ?? [],
    attackingStats: seasonStats?.attacking ?? [],
    defensiveStats: seasonStats?.defensive ?? [],
    disciplineStats: seasonStats?.discipline ?? [],

    isLoading: !response.data && !response.error,
    error: response.error,
  };
};

export default useTeamStats;
