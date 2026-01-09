"use client";

import Image from "next/image";
import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { MatchListItem } from "@/types/matches";

interface Props {
  match: MatchListItem;
}

const MatchHeader: React.FC<Props> = ({ match }) => {
  const { league, teams, score, kickoff_time } = match;
  return (
    <Card className="w-full mx-auto my-6 border-primary-gray/20 text-white overflow-hidden ">
      <CardContent className="flex flex-col items-center justify-center px-2 sm:px-6">
        <div className="flex items-center gap-2 mb-6">
          <Image
            src={league.logo ?? ""}
            alt={league.name}
            width={32}
            height={32}
            className="object-contain w-6 h-6 sm:w-10 sm:h-10"
          />
          <p className="text-xs sm:text-sm font-medium text-white uppercase">
            {league.name}
          </p>
        </div>

        <div className="flex items-center justify-center w-full max-w-2xl px-0 sm:px-4">
          <div className="flex flex-col items-center flex-1">
            <div className=" p-3 rounded-full mb-3">
              <Image
                src={teams.home.logo ?? ""}
                alt={teams.home.name}
                width={64}
                height={64}
                className="object-contain w-12 h-12 sm:w-20 sm:h-20"
              />
            </div>
            <span className="text-xs sm:text-lg font-bold tracking-tight">
              {teams.home.name}
            </span>
          </div>
          <div className="flex flex-col items-center mx-12">
            <div className="text-2xl min-[350px]:text-4xl md:text-6xl font-bold tracking-tighter mb-2">
              {score?.home ?? 0} - {score?.away ?? 0}
            </div>
            <p className="text-sm font-semibold text-gray-400">
              {kickoff_time ? `${new Date(kickoff_time).getMinutes()}'` : "75'"}
            </p>
          </div>

          <div className="flex flex-col items-center flex-1">
            <div className="p-3 rounded-full mb-3">
              <Image
                src={teams.away.logo ?? ""}
                alt={teams.away.name}
                width={64}
                height={64}
                className="object-contain w-12 h-12 sm:w-20 sm:h-20"
              />
            </div>
            <span className="text-xs sm:text-lg font-semibold truncate">
              {" "}
              {teams.away.name}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchHeader;
