"use client";

import React from "react";
import Image from "next/image";
import { NoData } from "@/components";
import { PlayerOverviewResponse } from "@/types/players";
import { Badge } from "@/components/ui/badge";

interface Props {
  player: PlayerOverviewResponse;
}

const PlayerHeader: React.FC<Props> = ({ player }) => {
  if (!player) return <NoData message="Player data not available" />;

  return (
    <div className="border-b border-primary-gray/20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-8 flex items-center gap-4">
        <div className="shrink-0 w-13 h-13 sm:w-17 sm:h-17 flex items-center justify-center bg-primary-green font-medium rounded-xl text-2xl sm:text-3xl text-black">
          {player.shirt_number}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-white font-medium text-base sm:text-2xl">
              {player.full_name}
            </h1>
            🇧🇪
          </div>
          <div className="flex items-center gap-4 mt-1">
            <Badge className="text-primary-green bg-primary-green/20 px-2 sm:px-4">
              {player.position ?? "N/A"}
            </Badge>
            <div className="flex items-center gap-2">
              <Image
                src={player.team.logo}
                alt={player.team.name}
                width={17}
                height={17}
                className="rounded-full"
              />
              <span className="text-primary-gray text-sm">
                {player.team.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerHeader;
