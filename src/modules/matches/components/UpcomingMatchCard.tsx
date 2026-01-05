"use client";

import React from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MatchCard } from "@/types/matches";
import { formatKickoffTime } from "@/utils/formatKickoffTime";
import Link from "next/link";

interface UpcomingMatchCardProps {
  match: MatchCard;
}

const UpcomingMatchCard: React.FC<UpcomingMatchCardProps> = ({ match }) => {
  const { month, time } = formatKickoffTime(match.kickoff_time);

  return (
    <Link href={`/matches/${match.id}`} className="block">
      <Card className="w-full sm:w-80 md:w-80 xl:w-90 2xl:w-102 rounded-none border border-primary-green bg-[#0d1117] text-[#e6edf3]">
        <div className="px-5 pb-0 flex items-center justify-between">
          <span className="text-xl font-bold text-white tracking-tight flex-1">
            {match.league.name}
          </span>

          <Badge
            variant="secondary"
            className="bg-[#162a31] text-primary-neon rounded-full px-4 py-1.5 font-medium border-none text-xs"
          >
            Upcoming
          </Badge>
        </div>

        <CardContent className="px-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <img
                src={match.home_team.logo}
                alt={match.home_team.name}
                className="h-7 w-7 object-contain shrink-0"
              />
              <span className="text-base font-medium text-primary-gray truncate">
                {match.home_team.name}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center px-2 shrink-0">
              <span className="text-primary-neon font-bold text-sm">
                {month}
              </span>
              <span className="text-primary-neon text-xs">{time}</span>
            </div>

            <div className="flex items-center justify-end gap-3 flex-1 min-w-0">
              <span className="text-lg font-medium text-primary-gray truncate text-right">
                {match.away_team.name}
              </span>
              <img
                src={match.away_team.logo}
                alt={match.away_team.name}
                className="h-7 w-7 object-contain shrink-0"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default UpcomingMatchCard;
