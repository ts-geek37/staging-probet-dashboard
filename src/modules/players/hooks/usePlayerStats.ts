"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import {
  PlayerDetailView,
  PlayerSeasonStatsResponse,
  PlayerStatItem,
} from "@/types/players";

const usePlayerStats = (playerId: number) => {
  const response = useSWR<ApiResponse<PlayerSeasonStatsResponse[]>>(
    `/api/v2/players/${playerId}/${PlayerDetailView.STATS}`,
  );

  const [seasonId, setSeasonId] = useState<number | null>(null);
  const stats = response.data?.data ?? null;

  const seasonOptions = useMemo(() => {
    if (!stats) return [];
    return stats.map((stat) => ({
      value: stat.season?.id,
      label: stat.season?.name,
    }));
  }, [stats]);

  const seasonStats = useMemo(() => {
    if (!stats) return null;

    let season = stats.find((stat) => stat.season?.id === seasonId);
    if (!season && seasonOptions.length > 0) {
      season = stats.find((stat) => stat.season?.id === seasonOptions[0].value);
    }

    const s = season?.stats;
    if (!s) return null;

    return {
      currentSeason: season,

      keyStats: [
        s.appearances != null && { label: "Appearances", value: s.appearances },
        s.lineups != null && { label: "Lineups", value: s.lineups },
        s.bench != null && { label: "On Bench", value: s.bench },
        s.minutes_played != null && {
          label: "Minutes Played",
          value: s.minutes_played.toLocaleString(),
        },
        s.goals != null && { label: "Goals", value: s.goals },
        s.own_goals != null && { label: "Own Goals", value: s.own_goals },
        s.assists != null && { label: "Assists", value: s.assists },
        s.expected_goals != null && {
          label: "Expected Goals (xG)",
          value: s.expected_goals.toFixed(2),
        },
        s.hattricks != null && { label: "Hat-tricks", value: s.hattricks },
      ].flatMap((item) => item || []) as PlayerStatItem[],

      attacking: [
        s.shots_total != null && { label: "Total Shots", value: s.shots_total },
        s.shots_on_target != null && {
          label: "Shots on Target",
          value: s.shots_on_target,
        },
        s.shots_off_target != null && {
          label: "Shots off Target",
          value: s.shots_off_target,
        },
        s.shots_blocked != null && {
          label: "Shots Blocked",
          value: s.shots_blocked,
        },
        s.hit_woodwork != null && {
          label: "Hit Woodwork",
          value: s.hit_woodwork,
        },
        s.passes != null &&
          s.accurate_passes != null && {
            label: "Pass Completion",
            value: `${s.accurate_passes}/${s.passes}`,
          },
        s.pass_accuracy != null && {
          label: "Pass Accuracy",
          value: `${s.pass_accuracy}%`,
        },
        s.key_passes != null && { label: "Key Passes", value: s.key_passes },
        s.long_balls != null && { label: "Long Balls", value: s.long_balls },
        s.long_balls_won != null && {
          label: "Long Balls Won",
          value: s.long_balls_won,
        },
        s.through_balls != null && {
          label: "Through Balls",
          value: s.through_balls,
        },
        s.through_balls_won != null && {
          label: "Through Balls Won",
          value: s.through_balls_won,
        },
        s.crosses != null && { label: "Crosses", value: s.crosses },
        s.accurate_crosses != null && {
          label: "Accurate Crosses",
          value: s.accurate_crosses,
        },
        s.crosses_blocked != null && {
          label: "Crosses Blocked",
          value: s.crosses_blocked,
        },
        s.dribbles_attempted != null &&
          s.dribbles_successful != null && {
            label: "Successful Dribbles",
            value: `${s.dribbles_successful}/${s.dribbles_attempted}`,
          },
        s.dribbled_past != null && {
          label: "Dribbled Past",
          value: s.dribbled_past,
        },
        s.dispossessed != null && {
          label: "Dispossessed",
          value: s.dispossessed,
        },
        s.big_chances_created != null && {
          label: "Big Chances Created",
          value: s.big_chances_created,
        },
        s.big_chances_missed != null && {
          label: "Big Chances Missed",
          value: s.big_chances_missed,
        },
        s.points_per_game != null && {
          label: "Points per Game",
          value: s.points_per_game.toFixed(2),
        },
        s.rating != null && { label: "Rating", value: s.rating.toFixed(2) },
      ].flatMap((item) => item || []) as PlayerStatItem[],

      defensive: [
        s.tackles != null && { label: "Tackles", value: s.tackles },
        s.interceptions != null && {
          label: "Interceptions",
          value: s.interceptions,
        },
        s.clearances != null && { label: "Clearances", value: s.clearances },
        s.blocked_shots_defensive != null && {
          label: "Blocked Shots",
          value: s.blocked_shots_defensive,
        },
        s.errors_leading_to_goal != null && {
          label: "Errors Leading to Goal",
          value: s.errors_leading_to_goal,
        },
        s.duels_total != null &&
          s.duels_won != null && {
            label: "Duels Won",
            value: `${s.duels_won}/${s.duels_total}`,
          },
        s.aerials_won != null && { label: "Aerials Won", value: s.aerials_won },
      ].flatMap((item) => item || []) as PlayerStatItem[],

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
        s.yellow_red_cards != null && {
          label: "Yellow-Red Cards",
          value: s.yellow_red_cards,
        },
        s.fouls != null && { label: "Fouls", value: s.fouls },
        s.fouls_drawn != null && { label: "Fouls Drawn", value: s.fouls_drawn },
        s.wins != null && { label: "Wins", value: s.wins },
        s.draws != null && { label: "Draws", value: s.draws },
        s.losses != null && { label: "Losses", value: s.losses },
      ].flatMap((item) => item || []) as PlayerStatItem[],

      goalkeeping: [
        s.saves != null && { label: "Saves", value: s.saves },
        s.saves_inside_box != null && {
          label: "Saves Inside Box",
          value: s.saves_inside_box,
        },
        s.goals_conceded != null && {
          label: "Goals Conceded",
          value: s.goals_conceded,
        },
        s.clean_sheets != null && {
          label: "Clean Sheets",
          value: s.clean_sheets,
        },
      ].flatMap((item) => item || []) as PlayerStatItem[],
    };
  }, [stats, seasonId, seasonOptions]);

  return {
    stats,
    isLoading: !response.data && !response.error,
    error: response.error,
    seasonOptions,
    seasonId: seasonId ?? seasonOptions?.[0]?.value ?? null,
    setSeasonId,

    currentSeasonStats: seasonStats?.keyStats ?? [],
    attackingStats: seasonStats?.attacking ?? [],
    defensiveStats: seasonStats?.defensive ?? [],
    disciplineStats: seasonStats?.discipline ?? [],
    goalkeepingStats: seasonStats?.goalkeeping ?? [],
    currentSeason: seasonStats?.currentSeason,
  };
};

export default usePlayerStats;
