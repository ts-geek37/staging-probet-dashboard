"use client";

import Image from "next/image";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useMatchTimer } from "@/modules/leagues/hooks";

interface Team {
  name: string;
  logo: string;
}

export interface RecentMatchProps {
  leagueName: string;
  teamA: Team;
  teamB: Team;
  matchDate: string;
}

const RecentMatchCard: React.FC<RecentMatchProps> = ({
  leagueName,
  teamA,
  teamB,
  matchDate,
}) => {
  const { timeUnits, matchState, month, time } = useMatchTimer(matchDate);

  return (
    <Card className="flex bg-gray-900 border-none rounded-none items-center size-full justify-between gap-3 sm:gap-6 px-6 py-4">
      <div className="flex items-center justify-between w-full gap-3">
        <h3 className="text-lg font-semibold text-white">{leagueName}</h3>

        {matchState === "WITHIN_12_HOURS" ? (
          <div className="flex items-center gap-3">
            {timeUnits.map(({ label, value }, index) => (
              <React.Fragment key={label}>
                <div className="flex flex-col items-center">
                  <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                    {value}
                  </span>
                  <span className="text-xs text-gray-500">{label}</span>
                </div>

                {index < timeUnits.length - 1 && (
                  <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                    :
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <Badge className="bg-primary-neon/20 px-3 py-2 text-sm text-primary-neon hover:bg-primary-neon/20">
            Upcoming
          </Badge>
        )}
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
          <span className="text-sm text-muted-foreground">{teamA.name}</span>
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
          <span className="text-sm max-sm:line-clamp-1 text-muted-foreground">
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
