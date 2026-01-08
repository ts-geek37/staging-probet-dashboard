"use client";

import React from "react";

import { SkeletonCardLoader, NoData } from "@/components";
import type { PlayerStatsResponse } from "@/types/players";

import { SeasonHistoryTable, PlayerStatsCard } from "../components";
import { usePlayerStats } from "../hooks";

interface Props {
  playerId: number;
}

const PlayerStatsTab: React.FC<Props> = ({ playerId }) => {
  const { stats, isLoading } = usePlayerStats(playerId) as {
    stats: PlayerStatsResponse | null;
    isLoading: boolean;
  };

  if (isLoading) return <SkeletonCardLoader />;
  if (!stats) return <NoData message="No stats available" />;

  const currentSeason = stats.seasons[0];

  const currentSeasonStats = [
    { label: "Appearances", value: currentSeason.appearances },
    { label: "Goals", value: currentSeason.goals },
    { label: "Assists", value: currentSeason.assists },
    { label: "Minutes", value: currentSeason.minutes.toLocaleString() },
  ];

  const disciplineStats = [
    {
      label: "Yellow Cards",
      value: stats.career_totals.yellow_cards,
      color: "text-primary-yellow",
    },
    {
      label: "Red Cards",
      value: stats.career_totals.red_cards,
      color: "text-primary-red",
    },
  ];

  return (
    <div className="space-y-6 py-6">
      <PlayerStatsCard
        title={`Current Season (${currentSeason.season})`}
        stats={currentSeasonStats}
      />
      <PlayerStatsCard
        title="Discipline"
        stats={disciplineStats}
        columns="grid-cols-2"
        hoverBorderColor="group-hover:border-primary-yellow"
      />
      <SeasonHistoryTable seasons={stats.seasons} />
    </div>
  );
};

export default PlayerStatsTab;
