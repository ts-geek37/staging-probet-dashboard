"use client";

import React from "react";

import { NoData } from "@/components";
import { Card, CardContent } from "@/components/ui/card";

import {
  PlayerStatsCard,
  SeasonOverview,
  PlayerStatsLoading,
} from "../components";
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

  if (isLoading) return <PlayerStatsLoading />;
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
      <Card className="border-none shadow-2xl py-0">
        <CardContent className="space-y-4 sm:space-y-8 py-6 sm:p-6">
          <PlayerStatsCard title="Season Overview" stats={currentSeasonStats} />

          {attackingStats.length > 0 && (
            <PlayerStatsCard
              title="Attacking & Passing"
              stats={attackingStats}
            />
          )}

          {defensiveStats.length > 0 && (
            <PlayerStatsCard
              title="Defensive & Physical"
              stats={defensiveStats}
            />
          )}

          {disciplineStats.length > 0 && (
            <PlayerStatsCard
              title="Discipline & Team Record"
              stats={disciplineStats}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PlayerStatsTab;
