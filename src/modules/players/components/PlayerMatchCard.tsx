"use client";

import React from "react";

interface Props {
  competition: string;
  opponent: string;
  minutes_played?: number | null;
  goals?: number | null;
  assists?: number | null;
}

const PlayerMatchCard: React.FC<Props> = ({
  competition,
  opponent,
  minutes_played,
  goals,
  assists,
}) => {
  return (
    <div className="rounded-xl border border-primary-gray/20 bg-[#14181F] p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-white/80">{competition}</p>
          <p className="mt-1 text-base font-semibold text-white">
            vs {opponent}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div>
          <p className="text-sm text-primary-gray">Minutes</p>
          <p className="font-semibold text-white">{minutes_played ?? "N/A"}</p>
        </div>

        <div>
          <p className="text-sm text-primary-gray">Goals</p>
          <p className="font-semibold text-primary-green">{goals ?? 0}</p>
        </div>

        <div>
          <p className="text-sm text-primary-gray">Assists</p>
          <p className="font-semibold text-white">{assists ?? 0}</p>
        </div>
      </div>
    </div>
  );
};

export default PlayerMatchCard;
