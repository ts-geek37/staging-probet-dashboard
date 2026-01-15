"use client";

import { Calendar, User, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { TeamPlayer } from "@/types/teams";

interface Props {
  player: TeamPlayer;
  className?: string;
}

const PlayerCard: React.FC<Props> = ({ player, className }) => {
  const router = useRouter();

  const startYear = player.contract.start
    ? new Date(player.contract.start).getFullYear()
    : "-";

  const endYear = player.contract.end
    ? new Date(player.contract.end).getFullYear()
    : "-";

  return (
    <Card
      onClick={() => router.push(`/players/${player.id}`)}
      className={cn(
        "group relative flex flex-row items-center p-2 sm:p-4 w-full",
        className,
      )}
    >
      <div className="absolute -inset-1 bg-linear-to-r from-primary-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-md rounded-lg" />

      <div className="relative z-10 w-18 h-18 sm:w-20 sm:h-20 rounded-sm overflow-hidden shrink-0">
        <Image
          src={player.photo || "/no-image.png"}
          alt={player.name}
          fill
          className="object-cover"
        />

        {player.jersey_number && (
          <div className="absolute bottom-0 right-0 bg-primary-green text-white text-[10px] font-bold px-1.5 py-0.5 rounded-tl-md shadow-lg">
            #{player.jersey_number}
          </div>
        )}
      </div>

      <div className="relative z-10 flex flex-col justify-center flex-1 min-w-0">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-tight truncate">
            {player.name}
          </h3>

          <div className="flex flex-wrap items-center gap-2 mt-1 min-w-0">
            <Badge
              variant="secondary"
              className="bg-primary-gray/20 text-primary-gray border-none flex gap-1 items-center py-0 px-2 h-6 text-[11px] uppercase truncate"
            >
              <User className="w-3 h-3" />
              <span className="truncate">{player.position.label}</span>
            </Badge>

            <div className="flex items-center text-xs sm:text-sm text-primary-gray gap-1.5 ml-1 truncate">
              <Calendar className="w-3 h-3 shrink-0" />
              <span className="truncate">
                {startYear} — {endYear}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0">
        <div className="p-2 rounded-full bg-primary-green/10 text-primary-green">
          <ChevronRight className="w-5 h-5" />
        </div>
      </div>
    </Card>
  );
};

export default PlayerCard;
