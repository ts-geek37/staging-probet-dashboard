import Image from "next/image";
import React from "react";

import { MatchListItem } from "@/types/matches";

interface TeamsDisplayProps {
  match: MatchListItem;
  layout: "horizontal" | "stacked";
}

const TeamsDisplay: React.FC<TeamsDisplayProps> = ({ match, layout }) => {
  const { home, away } = match.teams;
  const homeScore = match.score?.home;
  const awayScore = match.score?.away;

  const hasScore = !!homeScore && !!awayScore;

  if (layout === "stacked") {
    const teamRows = [
      { info: home, score: homeScore },
      { info: away, score: awayScore },
    ];

    return (
      <div className="flex flex-col gap-3 pt-2">
        {teamRows.map((team, index) => (
          <div
            key={`${team.info.id}-${index}`}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Image
                src={team.info.logo || "/no-image.png"}
                alt={team.info.name || "Team Logo"}
                width={100}
                height={100}
                className="size-7 object-contain shrink-0"
                onError={(e) => {
                  e.currentTarget.src = "/no-image.png";
                }}
              />
              <span className="text-sm font-medium line-clamp-1">
                {team.info.name ?? "Unknown Team"}
              </span>
            </div>

            {team.score !== null && team.score !== undefined && (
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
          src={home.logo || "/no-image.png"}
          alt={home.name || "Home Team"}
          width={100}
          height={100}
          className="size-7 object-contain shrink-0"
          onError={(e) => {
            e.currentTarget.src = "/no-image.png";
          }}
        />
        <span className="text-sm font-medium line-clamp-1">
          {home.name ?? "Unknown Team"}
        </span>
      </div>

      {hasScore && (
        <div className="shrink-0 px-4">
          <span className="text-sm font-bold whitespace-nowrap">
            {homeScore} - {awayScore}
          </span>
        </div>
      )}

      <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
        <span className="text-sm font-medium line-clamp-1 text-right">
          {away.name ?? "Unknown Team"}
        </span>
        <Image
          src={away.logo || "/no-image.png"}
          alt={away.name || "Away Team"}
          width={100}
          height={100}
          className="size-7 object-contain shrink-0"
          onError={(e) => {
            e.currentTarget.src = "/no-image.png";
          }}
        />
      </div>
    </div>
  );
};

export default TeamsDisplay;
