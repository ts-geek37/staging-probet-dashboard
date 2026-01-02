"use client";

import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useMatchTimer } from "@/modules/leagues/hooks";

import MatchTimer from "./MatchTimer";

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
  const { timeRemaining, isWithin12Hours, month, time } =
    useMatchTimer(matchDate);

  return (
    <Card className="flex bg-gray-900 border-none rounded-none items-center w-full justify-between gap-6 px-6 py-4">
      <div className="flex items-center justify-between w-full gap-3">
        <h3 className="text-lg font-semibold text-white">{leagueName}</h3>
        {!isWithin12Hours && (
          <Badge className="bg-primary-neon/20 px-3 py-2 text-sm text-primary-neon hover:bg-primary-neon/20">
            Upcoming
          </Badge>
        )}
        {isWithin12Hours && <MatchTimer {...timeRemaining} />}
      </div>

      <div className="flex items-center w-full justify-between gap-8">
        <div className="flex items-center gap-2">
          <Image
            src={teamA.logo}
            alt={teamA.name}
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="text-sm text-muted-foreground">{teamA.name}</span>
        </div>

        {isWithin12Hours ? (
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
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{teamB.name}</span>
          <Image
            src={teamB.logo}
            alt={teamB.name}
            width={24}
            height={24}
            className="rounded-full"
          />
        </div>
      </div>
    </Card>
  );
};

export default RecentMatchCard;
