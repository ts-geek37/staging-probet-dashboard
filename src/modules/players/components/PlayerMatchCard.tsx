import Image from "next/image";
import React from "react";

import { MatchListItem } from "@/types/players";

interface Props {
  match: MatchListItem;
}

const PlayerMatchCard: React.FC<Props> = ({ match }) => {
  const { teams, score, league, kickoff_time } = match;

  const date = new Date(kickoff_time).toLocaleDateString();

  return (
    <div className="rounded-xl border border-primary-gray/20 bg-[#14181F] p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {league.logo && (
            <Image
              src={league.logo}
              alt={league.name}
              width={16}
              height={16}
              className="object-contain"
            />
          )}
          <span className="text-xs text-primary-gray">{league.name}</span>
        </div>
        <span className="text-xs text-primary-gray">{date}</span>
      </div>

      <div className="flex items-center justify-between px-2">
        <div className="flex flex-col items-center gap-2 w-1/3">
          {teams.home.logo && (
            <Image
              src={teams.home.logo}
              alt={teams.home.name}
              width={32}
              height={32}
              className="object-contain"
            />
          )}
          <span className="text-xs text-center text-white truncate w-full">
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
              width={32}
              height={32}
              className="object-contain"
            />
          )}
          <span className="text-xs text-center text-white truncate w-full">
            {teams.away.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlayerMatchCard;
