"use client";

import Image from "next/image";
import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { MatchOverviewResponse } from "@/types/matches";

interface Props {
  match: MatchOverviewResponse;
}

const MatchHeader: React.FC<Props> = ({ match }) => {
  return (
    <Card className="w-full mx-auto my-6 bg-[#14181F] border-primary-gray/20 text-white overflow-hidden ">
      <CardContent className="flex flex-col items-center justify-center px-2 sm:px-6">
        <p className="text-xs font-medium text-primary-gray mb-6 uppercase">
          {match.league.name}
        </p>

        <div className="flex items-center justify-center w-full max-w-2xl px-0 sm:px-4">
          <div className="flex flex-col items-center flex-1">
            <div className="bg-gray-800/50 p-3 rounded-full mb-3">
              <Image
                src={match.home_team.logo}
                alt={match.home_team.name}
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <span className="text-lg font-bold tracking-tight">
              {match.home_team.name}
            </span>
          </div>
          <div className="flex flex-col items-center mx-12">
            <div className="text-3xl sm:text-6xl font-bold tracking-tighter mb-2">
              {match.score.home} - {match.score.away}
            </div>
            <p className="text-sm font-semibold text-gray-400">
              {match.kickoff_time
                ? `${new Date(match.kickoff_time).getMinutes()}'`
                : "75'"}
            </p>
          </div>

          <div className="flex flex-col items-center flex-1">
            <div className="bg-gray-800/50 p-3 rounded-full mb-3">
              <Image
                src={match.away_team.logo}
                alt={match.away_team.name}
                width={64}
                height={64}
                className="object-contain"
              />
            </div>
            <span className="text-lg font-bold">{match.away_team.name}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchHeader;
