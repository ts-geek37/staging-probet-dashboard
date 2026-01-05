"use client";

import React from "react";
import Link from "next/link";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MatchCard } from "@/types/matches";

interface FinishedMatchCardProps {
  match: MatchCard;
}

const FinishedMatchCard: React.FC<FinishedMatchCardProps> = ({ match }) => {
  return (
    <Link href={`/matches/${match.id}`} className="block">
      <Card className="gap-3 py-2 w-full sm:w-80 md:w-80 xl:w-90 2xl:w-100 rounded-none border-none bg-[#282B2A]/20 text-[#e6edf3] shadow-none hover:border-[#484f58] cursor-pointer">
        <CardHeader className="px-4 pt-3">
          <span className="text-base font-semibold text-white/60">
            {match.league.name}
          </span>
        </CardHeader>

        <CardContent className="px-4 pb-4 pt-0 space-y-2">
          {[match.home_team, match.away_team].map((team) => (
            <div key={team.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <img
                  src={team.logo}
                  alt={team.name}
                  className="h-6 w-6 object-contain shrink-0 rounded-full"
                />
                <span className="text-base font-medium text-white/60 truncate">
                  {team.name}
                </span>
              </div>

              <span className="text-2xl font-medium text-white/60 shrink-0">
                {team.score ?? 0}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </Link>
  );
};

export default FinishedMatchCard;
