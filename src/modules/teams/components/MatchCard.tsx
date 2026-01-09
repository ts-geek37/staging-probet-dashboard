"use client";

import Image from "next/image";
import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { TeamMatchApi } from "@/types/teams";

interface Props {
  match: TeamMatchApi;
  type: "latest" | "upcoming";
  formatDate: (date: string) => string;
  getStatusColor?: (status: string) => string;
}

const MatchCard: React.FC<Props> = ({ match, type, formatDate }) => {
  const kickoffParts = formatDate(match.kickoff_time).split(" ");
  const day = kickoffParts[0];
  const month = kickoffParts[1];
  const timePart = kickoffParts[3] ?? "";

  const badgeContent =
    type === "upcoming"
      ? "Upcoming"
      : `${match.score?.home ?? 0} - ${match.score?.away ?? 0}`;

  const badgeColor = "bg-primary-neon/20 text-primary-neon";

  return (
    <Card className="w-full max-w-100 bg-[#14181F] border border-primary-gray/20 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Image
            src={match.league.logo ?? "/no-image.png"}
            alt={match.league.name || "League Logo"}
            width={25}
            height={25}
          />
          <span className="text-sm sm:text-xl font-medium text-white">
            {match.league.name}
          </span>
        </div>

        <span className={`text-xs px-3 py-1 rounded-full ${badgeColor}`}>
          {badgeContent}
        </span>
      </div>

      <CardContent className="p-0">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div className="flex flex-col items-center text-center">
            <Image
              src={match.teams.home.logo ?? "/no-image.png"}
              alt={match.teams.home.name}
              width={20}
              height={20}
            />
            <span className="text-sm text-primary-gray truncate w-full mt-1">
              {match.teams.home.name}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span
              className={`text-xs px-3 py-1 rounded-full ${badgeColor} mb-1`}
            >
              {day} {month}
            </span>
            {timePart && (
              <span className="text-xs text-gray-400 mt-1">{timePart}</span>
            )}
          </div>
          <div className="flex flex-col items-center text-center">
            <Image
              src={match.teams.away.logo ?? "/no-image.png"}
              alt={match.teams.away.name}
              width={20}
              height={20}
            />
            <span className="text-sm text-primary-gray truncate w-full mt-1">
              {match.teams.away.name}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchCard;
