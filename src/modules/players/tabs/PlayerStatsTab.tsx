"use client";

import React from "react";

import { NoData, SkeletonCardLoader } from "@/components";

import { PlayerStatsCard, SeasonOverview } from "../components";
import { usePlayerStats } from "../hooks";

interface Props {
  playerId: number;
}

const PlayerStatsTab: React.FC<Props> = ({ playerId }) => {
  const {
    stats,
    seasonOptions,
    SetSeasonId,
    currentSeasonStats,
    attackingStats,
    defensiveStats,

    disciplineStats,
    currentSeason,
    isLoading,
  } = usePlayerStats(playerId);

  if (isLoading) return <SkeletonCardLoader />;
  if (!stats) return <NoData message="No stats available" />;

  return (
    <div className="space-y-6">
      {!!currentSeason && (
        <SeasonOverview
          {...currentSeason}
          rating={currentSeason?.stats?.rating ?? 0}
          OnSeasonChange={SetSeasonId}
          seasonOptions={seasonOptions}
          selectedSeasonId={currentSeason?.season?.id}
        />
      )}
      <PlayerStatsCard
        title={`Season Stats (${currentSeason?.season?.name})`}
        stats={currentSeasonStats}
      />

      {attackingStats.length > 0 && (
        <PlayerStatsCard title="Attacking & Passing" stats={attackingStats} />
      )}

      {defensiveStats.length > 0 && (
        <PlayerStatsCard title="Defensive & Physical" stats={defensiveStats} />
      )}

      {disciplineStats.length > 0 && (
        <PlayerStatsCard
          title="Discipline & Team Record"
          stats={disciplineStats}
        />
      )}
    </div>
  );
};

export default PlayerStatsTab;
