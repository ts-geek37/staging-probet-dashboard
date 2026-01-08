"use client";

import React from "react";

import { NoData, SkeletonCardLoader } from "@/components";
import type { PlayerSeasonStatsResponse } from "@/types/players";

import { PlayerStatsCard } from "../components";
import { usePlayerStats } from "../hooks";

interface Props {
  playerId: number;
}

const PlayerStatsTab: React.FC<Props> = ({ playerId }) => {
  const { stats, isLoading } = usePlayerStats(playerId) as {
    stats: PlayerSeasonStatsResponse | null;
    isLoading: boolean;
  };

  if (isLoading) return <SkeletonCardLoader />;
  if (!stats) return <NoData message="No stats available" />;

  const s = stats.stats;

  const currentSeasonStats = [
    { label: "Appearances", value: s?.appearances ?? 0 },
    { label: "Goals", value: s?.goals ?? 0 },
    { label: "Assists", value: s?.assists ?? 0 },
    {
      label: "Minutes",
      value: (s?.minutes_played ?? 0).toLocaleString(),
    },
  ];

  const genericStats = [
    { label: "Rating", value: s?.rating?.toFixed(1) ?? "N/A" },
    { label: "Expected Goals", value: s?.expected_goals ?? 0 },
    { label: "Total Shots", value: s?.shots_total ?? 0 },
    { label: "Shots on Target", value: s?.shots_on_target ?? 0 },
  ];

  const disciplineStats = [
    {
      label: "Yellow Cards",
      value: s?.yellow_cards ?? 0,
      color: "text-primary-yellow",
    },
    {
      label: "Red Cards",
      value: s?.red_cards ?? 0,
      color: "text-primary-red",
    },
  ];

  return (
    <div className="space-y-6 py-6">
      <PlayerStatsCard
        title={`Season Stats (${stats?.season?.name})`}
        stats={currentSeasonStats}
      />
      <PlayerStatsCard title="Performance" stats={genericStats} />
      <PlayerStatsCard
        title="Discipline"
        stats={disciplineStats}
        columns="grid-cols-2"
        hoverBorderColor="group-hover:border-primary-yellow"
      />
    </div>
  );
};

export default PlayerStatsTab;
