"use client";

import React from "react";

import { DataError, NoData, SkeletonCardLoader } from "@/components";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import PlayerRow from "../components/PlayerCard";
import { useTeamPlayers } from "../hooks";

interface Props {
  teamId: number;
}

const TeamSquadTab: React.FC<Props> = ({ teamId }) => {
  const { sections, isLoading, error } = useTeamPlayers(teamId);

  if (isLoading) return <SkeletonCardLoader />;
  if (error) return <DataError />;

  if (!sections || sections.length === 0) {
    return <NoData message="Team data not available" />;
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Accordion
        type="multiple"
        defaultValue={sections.map((section) => section.key)}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start"
      >
        {sections.map((section) => (
          <AccordionItem
            key={section.key}
            value={section.key}
            className="border border-primary-gray/20 bg-black/20 rounded-lg overflow-hidden"
          >
            <AccordionTrigger className="hover:no-underline px-4 py-4">
              <div className="flex items-center gap-3">
                <h3 className="text-base font-medium text-white">
                  {section.label}
                </h3>
                <span className="rounded-md bg-primary-green/20 px-2 py-0.5 text-[11px] font-bold text-primary-green">
                  {section.players?.length ?? 0}
                </span>
              </div>
            </AccordionTrigger>

            <AccordionContent className="pb-4">
              {section.players && section.players.length > 0 ? (
                <div className="divide-y divide-white/5 border-t border-primary-gray/20">
                  {section.players.map((player) => (
                    <PlayerRow key={player.id} player={player} />
                  ))}
                </div>
              ) : (
                <NoData message="No players available" />
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default TeamSquadTab;
