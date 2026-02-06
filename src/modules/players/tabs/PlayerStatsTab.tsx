"use client";

import React from "react";

import { NoData, StatsGrid } from "@/components";

import { PlayerStatsLoading, SeasonOverview } from "../components";
import { usePlayerStats } from "../hooks";

interface Props {
  playerId: number;
}

const PlayerStatsTab: React.FC<Props> = ({ playerId }) => {
  const {
    stats,
    seasonOptions,
    setSeasonId,
    currentSeasonStats,
    attackingStats,
    defensiveStats,
    disciplineStats,
    goalkeepingStats,
    currentSeason,
    isLoading,
  } = usePlayerStats(playerId);

  if (isLoading) return <PlayerStatsLoading />;
  if (!stats?.length)
    return <NoData message="No detailed statistics found for this player." />;

  const mapToStatItems = (statsArray: typeof currentSeasonStats) =>
    statsArray.map((stat) => ({
      label: stat.label,
      value: stat.value,
      color: stat.color,
    }));

  return (
    <div className="flex flex-col gap-6">
      {!!currentSeason && (
        <SeasonOverview
          {...currentSeason}
          OnSeasonChange={setSeasonId}
          seasonOptions={seasonOptions}
          selectedSeasonId={currentSeason?.season?.id}
        />
      )}

      {!!currentSeasonStats.length && (
        <StatsGrid
          title="Season Overview"
          stats={mapToStatItems(currentSeasonStats)}
          columns="grid-cols-2 sm:grid-cols-4"
          variant="nested"
        />
      )}

      {!!attackingStats.length && (
        <StatsGrid
          title="Attacking & Passing"
          stats={mapToStatItems(attackingStats)}
          columns="grid-cols-2 sm:grid-cols-3"
          variant="nested"
        />
      )}

      {!!defensiveStats.length && (
        <StatsGrid
          title="Defensive & Physical"
          stats={mapToStatItems(defensiveStats)}
          columns="grid-cols-2 sm:grid-cols-3"
          variant="nested"
        />
      )}

      {!!disciplineStats.length && (
        <StatsGrid
          title="Discipline & Team Record"
          stats={mapToStatItems(disciplineStats)}
          columns="grid-cols-2 sm:grid-cols-4"
          variant="nested"
        />
      )}

      {!!goalkeepingStats.length && (
        <StatsGrid
          title="Goalkeeping"
          stats={mapToStatItems(goalkeepingStats)}
          columns="grid-cols-2 sm:grid-cols-3"
          variant="nested"
        />
      )}
    </div>
  );
};

export default PlayerStatsTab;
