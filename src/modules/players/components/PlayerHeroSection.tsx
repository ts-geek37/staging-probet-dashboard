"use client";

import { MapPin, Shield } from "lucide-react";
import Image from "next/image";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { PlayerProfileResponse } from "@/types/players";

interface Props {
  player: PlayerProfileResponse;
}

const PlayerHeroSection: React.FC<Props> = ({ player }) => {
  return (
    <div className="relative overflow-hidden rounded-sm border border-primary-gray/20 p-4 bg-[#12151C]">
      <div className="flex flex-col gap-6 relative z-10">
        <div className="flex flex-row items-center gap-4 md:gap-8">
          <div className="relative h-24 w-24 md:w-40 md:h-40 overflow-hidden bg-primary-gray rounded-xl shadow-inner border border-primary-gray/20">
            <Image
              src={player?.photo || "/player-avatar.jpeg"}
              alt={player?.name || "Player"}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex-1 min-w-0 space-y-2 md:space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h1 className="text-base md:text-2xl lg:text-3xl font-extrabold text-white tracking-tight truncate">
                  {player.name}
                </h1>
                {player.is_captain && (
                  <span className="bg-primary-yellow text-black text-[10px] font-black px-2 py-0.5 rounded uppercase">
                    Captain
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-primary-gray">
                <span className="flex items-center gap-1.5 text-xs md:text-base font-medium">
                  <Shield size={14} />
                  {player.position.detailed || player.position.name}
                </span>
                <span className="flex items-center gap-1.5 text-xs md:text-base font-medium">
                  <MapPin size={14} />
                  {player.birthplace.city}, {player.birthplace.country}
                </span>
                <span className="font-mono text-primary-yellow font-bold bg-primary-yellow/10 px-2 rounded text-xs md:text-base">
                  #{player.shirt_number}
                </span>
              </div>
            </div>

            {player.market_value && (
              <Badge
                variant="live"
                className="hidden md:flex items-center gap-2 py-2 px-3 text-primary-green border border-primary-green/30 bg-primary-green/5 rounded-xl before:bg-primary-green"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-medium">Market Value:</span>
                  <span className="font-bold">
                    €{player.market_value.toLocaleString()}
                  </span>
                </div>
              </Badge>
            )}
          </div>

          {player.current_team && (
            <div className="hidden md:flex flex-col items-center gap-3 bg-primary-gray/10 p-5 rounded-2xl border border-primary-gray/20 min-w-35">
              <Image
                src={player.current_team.logo || ""}
                alt="Team logo"
                width={56}
                height={56}
              />
              <p className="text-[10px] font-black text-primary-gray uppercase text-center">
                {player.current_team.name}
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 md:hidden">
          {player.current_team && (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-primary-gray/10 border border-primary-gray/20">
              <Image
                src={player.current_team.logo || ""}
                alt="Team"
                width={32}
                height={32}
              />
              <p className="text-white text-xs font-bold truncate">
                {player.current_team.name}
              </p>
            </div>
          )}

          {player.market_value && (
            <Badge
              variant="live"
              className="flex items-center gap-2 py-2 px-3 text-primary-green border border-primary-green/30 bg-primary-green/5 rounded-sm before:bg-primary-green"
            >
              <div className="flex flex-col">
                <span className="font-medium">Market Value</span>
                <span className="font-bold">
                  €{player.market_value.toLocaleString()}
                </span>
              </div>
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerHeroSection;
