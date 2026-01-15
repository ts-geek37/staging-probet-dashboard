"use client";

import Image from "next/image";
import React from "react";

import { NoData } from "@/components";
import { Badge } from "@/components/ui/badge";
import { PlayerProfileResponse } from "@/types/players";

interface Props {
  player: PlayerProfileResponse;
}

const PlayerHeader: React.FC<Props> = ({ player }) => {
  if (!player) return <NoData message="Player data not available" />;

  return (
    <div className="border-b border-primary-gray/20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-8 flex items-center gap-4">
        <div className="shrink-0 w-13 h-13 sm:w-17 sm:h-17 flex items-center justify-center  font-medium rounded-xl text-2xl sm:text-3xl text-black">
          <Image
            src={player?.photo || "/no-image.png"}
            alt={player.name}
            width={1000}
            height={1000}
            className="size-16 object-cover rounded-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-white font-medium text-base sm:text-2xl">
            {player?.name}
          </h1>
          <div className="flex items-center gap-4">
            {player?.nationality?.name && (
              <div className="flex items-center gap-2">
                {player?.nationality?.flag && (
                  <Image
                    src={player?.nationality?.flag}
                    alt={player?.nationality?.name}
                    width={1000}
                    height={1000}
                    className="size-6 object-contain rounded-full"
                  />
                )}
                <span className="text-primary-gray text-sm">
                  {player?.nationality?.name}
                </span>
              </div>
            )}
            <Badge
              className="px-2 sm:px-4 border-none capitalize"
              variant="green"
            >
              {player.position?.name ?? "N/A"}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerHeader;
