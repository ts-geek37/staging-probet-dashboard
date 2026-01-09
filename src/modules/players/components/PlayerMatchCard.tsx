import Image from "next/image";
import React from "react";

import { Card } from "@/components/ui/card";
import { MatchListItem } from "@/types/players";

interface Props {
  match: MatchListItem;
}

const PlayerMatchCard: React.FC<Props> = ({ match }) => {
  const { teams, score, league, kickoff_time } = match;

  const date = new Date(kickoff_time).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <Card className="group rounded-xl border border-primary-gray/20 hover:border-primary-green p-4 gap-4">
      <div className="flex items-center justify-between min-h-16">
        <div className="flex items-center gap-2">
          <Image
            src={league?.logo ?? "/no-image.png"}
            alt={league?.name}
            width={1000}
            height={1000}
            className="size-12 rounded-xl object-contain"
          />
          <span className="text-sm sm:text-base text-primary-gray group-hover:text-primary-green">
            {league.name}
          </span>
        </div>
        <span className="text-xs text-primary-gray group-hover:text-primary-green">
          {date}
        </span>
      </div>

      <div className="flex items-center justify-between px-2">
        <div className="flex flex-col items-center gap-2 w-1/3">
          {teams.home.logo && (
            <Image
              src={teams.home.logo}
              alt={teams.home.name}
              width={1000}
              height={1000}
              className="size-10 md:size-12 object-contain"
            />
          )}
          <span className="text-xs md:text-sm group-hover:text-primary-green text-center text-white truncate w-full">
            {teams.home.name}
          </span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <div className="text-lg font-bold text-white">
            {score?.home ?? "-"} : {score?.away ?? "-"}
          </div>
          <span className="text-[10px] uppercase text-primary-green px-2 py-0.5 bg-primary-green/10 rounded">
            {match.status}
          </span>
        </div>

        <div className="flex flex-col items-center gap-2 w-1/3">
          {teams.away.logo && (
            <Image
              src={teams.away.logo}
              alt={teams.away.name}
              width={1000}
              height={1000}
              className="size-10 md:size-12 object-contain"
            />
          )}
          <span className="text-xs md:text-sm group-hover:text-primary-green text-center text-white truncate w-full">
            {teams.away.name}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default PlayerMatchCard;
