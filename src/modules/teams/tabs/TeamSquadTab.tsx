"use client";

import React from "react";

import { DataError, NoData, SkeletonCardLoader } from "@/components";
import type { SquadSection } from "@/types/teams";

import { PlayerCard } from "../components";
import { useTeamPlayers } from "../hooks";

interface Props {
  teamId: number;
}

const TeamSquadTab: React.FC<Props> = ({ teamId }) => {
  const { sections, isLoading, error } = useTeamPlayers(teamId);

  if (isLoading) return <SkeletonCardLoader />;
  if (error) return <DataError />;
  if (!sections) return <NoData message="Team data not available" />;

  return (
    <div className="space-y-8">
      {sections.map((section: SquadSection) => (
        <div key={section.key} className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium text-white">{section.label}</h3>
            <span className="rounded-full bg-primary-gray/30 px-2 py-0.5 text-sm text-white">
              {section.players.length}
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {section.players.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamSquadTab;
