"use client";

import Image from "next/image";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useMatchTimer } from "@/modules/leagues/hooks";

import MatchStatus from "./MatchStatus";

interface Team {
  name: string;
  logo: string;
  score?: number;
}

export interface RecentMatchProps {
  leagueName: string;
  teamA: Team;
  teamB: Team;
  matchDate: string;
  BadgeText?: string;
  onClick?: () => void;
}

const RecentMatchCard: React.FC<RecentMatchProps> = ({
  leagueName,
  teamA,
  teamB,
  matchDate,
  BadgeText,
  onClick,
}) => {
  const { timeUnits, matchState, month, time } = useMatchTimer(matchDate);

  return (
    <Card
      className="flex border-primary-neon/20 hover:border-primary-neon/40 cursor-pointer rounded-none items-center size-full justify-between gap-3 sm:gap-6 px-6 py-4"
      onClick={onClick}
    >
      <div className="flex items-center justify-between w-full gap-3">
        <h3 className="text-lg font-semibold text-white">{leagueName}</h3>
        <MatchStatus
          BadgeText={BadgeText}
          teamAScore={teamA.score}
          teamBScore={teamB.score}
          matchState={matchState}
          timeUnits={timeUnits}
        />
      </div>

      <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Image
            src={teamA.logo}
            alt={teamA.name}
            width={1000}
            height={1000}
            className="size-10 object-cover rounded-full"
          />
          <span className="text-sm text-muted-foreground line-clamp-2 sm:line-clamp-1 text-left">
            {teamA.name}
          </span>
        </div>

        {matchState === "WITHIN_12_HOURS" ? (
          <span className="text-lg font-semibold text-primary-neon">VS</span>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <Badge className="bg-primary-neon/20 px-3 py-1 text-primary-neon text-xs font-medium hover:bg-primary-neon/20">
              {month}
            </Badge>
            <span className="text-sm font-medium text-primary-neon">
              {time}
            </span>
          </div>
        )}
        <div className="flex flex-wrap-reverse items-center justify-end gap-2">
          <span className="text-sm line-clamp-2 sm:line-clamp-1 text-muted-foreground text-right">
            {teamB.name}
          </span>
          <Image
            src={teamB.logo}
            alt={teamB.name}
            width={1000}
            height={1000}
            className="size-10 object-cover rounded-full"
          />
        </div>
      </div>
    </Card>
  );
};

export default RecentMatchCard;
