"use client";

import React from "react";

import { NoData, SkeletonCardLoader } from "@/components";

import { PlayerMatchCard } from "../components";
import { usePlayerMatches } from "../hooks";

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
        <PlayerMatchCard key={match.id} match={match} />
      ))}
    </div>
  );
};

export default PlayerMatchesTab;
