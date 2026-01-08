"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { PlayerDetailView, PlayerSeasonStatsResponse } from "@/types/players";

import { PlayerStatItem } from "../components/PlayerStatsCard";

const usePlayerStats = (playerId: number) => {
  const response = useSWR<ApiResponse<PlayerSeasonStatsResponse[]>>(
    `/api/v2/players/${playerId}/${PlayerDetailView.STATS}`,
  );
  const [seasonId, SetSeasonId] = useState<number | null>(null);
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
    if (!seasonId) {
      season = stats.find(
        (stat) => stat.season?.id === seasonOptions?.[0]?.value,
      );
    }

    const s = season?.stats;
    if (!s) return null;

    return {
      currentSeason: season,

      keyStats: [
        s?.appearances != null && {
          label: "Appearances",
          value: s.appearances,
        },
        s?.goals != null && { label: "Goals", value: s.goals },
        s?.assists != null && { label: "Assists", value: s.assists },
        s?.minutes_played != null && {
          label: "Minutes",
          value: s.minutes_played.toLocaleString(),
        },
        s?.rating != null && {
          label: "Rating",
          value: s.rating.toFixed(2),
        },
      ].flatMap((item) => item || []) as PlayerStatItem[],

      attacking: [
        s?.expected_goals != null && {
          label: "Expected Goals (xG)",
          value: s.expected_goals.toFixed(2),
        },
        s?.shots_total != null && {
          label: "Total Shots",
          value: s.shots_total,
        },
        s?.shots_on_target != null && {
          label: "Shots on Target",
          value: s.shots_on_target,
        },
        s?.shots_off_target != null && {
          label: "Shots off Target",
          value: s.shots_off_target,
        },
        s?.key_passes != null && { label: "Key Passes", value: s.key_passes },
        s?.passes != null &&
          s?.accurate_passes != null && {
            label: "Pass Completion",
            value: `${s.accurate_passes}/${s.passes}`,
          },
        s?.dribbles_successful != null &&
          s?.dribbles_attempted != null && {
            label: "Successful Dribbles",
            value: `${s.dribbles_successful}/${s.dribbles_attempted}`,
          },
      ].flatMap((item) => item || []) as PlayerStatItem[],

      defensive: [
        s?.tackles != null && { label: "Tackles", value: s.tackles },
        s?.interceptions != null && {
          label: "Interceptions",
          value: s.interceptions,
        },
        s?.clearances != null && { label: "Clearances", value: s.clearances },
        s?.duels_won != null &&
          s?.duels_total != null && {
            label: "Duels Won",
            value: `${s.duels_won}/${s.duels_total}`,
          },
        s?.aerials_won != null && {
          label: "Aerials Won",
          value: s.aerials_won,
        },
        s?.clean_sheets != null && {
          label: "Clean Sheets",
          value: s.clean_sheets,
        },
      ].flatMap((item) => item || []) as PlayerStatItem[],

      discipline: [
        s?.yellow_cards != null && {
          label: "Yellow Cards",
          value: s.yellow_cards,
          color: "text-primary-yellow",
        },
        s?.red_cards != null && {
          label: "Red Cards",
          value: s.red_cards,
          color: "text-primary-red",
        },
        s?.fouls != null && { label: "Fouls", value: s.fouls },
        s?.fouls_drawn != null && {
          label: "Fouls Drawn",
          value: s.fouls_drawn,
        },
        s?.wins != null && { label: "Wins", value: s.wins },
        s?.draws != null && { label: "Draws", value: s.draws },
        s?.losses != null && { label: "Losses", value: s.losses },
      ].flatMap((item) => item || []) as PlayerStatItem[],
    };
  }, [stats, seasonId, seasonOptions]);

  return {
    stats: response.data?.data ?? null,
    isLoading: !response.data && !response.error,
    error: response.error,
    seasonOptions,
    seasonId: seasonId ?? seasonOptions?.[0]?.value ?? null,
    SetSeasonId,

    currentSeasonStats: seasonStats?.keyStats ?? [],
    attackingStats: seasonStats?.attacking ?? [],
    defensiveStats: seasonStats?.defensive ?? [],
    disciplineStats: seasonStats?.discipline ?? [],
    currentSeason: seasonStats?.currentSeason,
  };
};

export default usePlayerStats;
