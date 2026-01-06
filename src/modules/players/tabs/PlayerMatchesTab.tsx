"use client";

import React from "react";

import { usePlayerMatches } from "../hooks";
import { NoData, SkeletonCardLoader } from "@/components";
import { PlayerMatchCard } from "../components";

interface Props {
  playerId: number;
}

const PlayerMatchesTab: React.FC<Props> = ({ playerId }) => {
  const { matches, isLoading } = usePlayerMatches(playerId);

  if (isLoading) return <SkeletonCardLoader />;

  if (!matches) return <NoData message="No matches history" />;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {matches.map((match) => (
        <PlayerMatchCard
          key={match.match_id}
          competition={match.competition}
          opponent={match.opponent}
          minutes_played={match.minutes_played}
          goals={match.goals}
          assists={match.assists}
        />
      ))}
    </div>
  );
};

export default PlayerMatchesTab;
