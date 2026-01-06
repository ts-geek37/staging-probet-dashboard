import Image from "next/image";
import React from "react";

import { PredictionMatchCard } from "@/types/prediction";

interface TeamsDisplayProps {
  match: PredictionMatchCard;
  layout: "horizontal" | "stacked";
}

const TeamsDisplay: React.FC<TeamsDisplayProps> = ({ match, layout }) => {
  const hasScore =
    match.home_team.score !== undefined && match.away_team.score !== undefined;

  if (layout === "stacked") {
    return (
      <div className="flex flex-col gap-3 pt-2">
        {[match.home_team, match.away_team].map((team) => (
          <div key={team.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Image
                src={team.logo}
                alt={team.name}
                width={1000}
                height={1000}
                className="size-7 object-contain flex-shrink-0"
              />
              <span className="text-sm font-medium line-clamp-1">
                {team.name}
              </span>
            </div>

            {team.score !== undefined && (
              <span className="text-sm font-bold">{team.score}</span>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <Image
          src={match.home_team.logo}
          alt={match.home_team.name}
          width={1000}
          height={1000}
          className="size-7 object-contain flex-shrink-0"
        />
        <span className="text-sm font-medium line-clamp-1">
          {match.home_team.name}
        </span>
      </div>

      {hasScore && (
        <div className="flex-shrink-0 px-4">
          <span className="text-sm font-bold whitespace-nowrap">
            {match.home_team.score} - {match.away_team.score}
          </span>
        </div>
      )}

      <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
        <span className="text-sm font-medium line-clamp-1 text-right">
          {match.away_team.name}
        </span>
        <Image
          src={match.away_team.logo}
          alt={match.away_team.name}
          width={1000}
          height={1000}
          className="size-7 object-contain flex-shrink-0"
        />
      </div>
    </div>
  );
};

export default TeamsDisplay;
