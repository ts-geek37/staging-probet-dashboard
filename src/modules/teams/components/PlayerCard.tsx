"use client";

import { Calendar, User } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

import { Card } from "@/components/ui/card";
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
      className={`group flex-row p-3 w-full border border-transparent transition-all duration-300 ease-in-out hover:border-primary-green hover:scale-102 hover:shadow-lg cursor-pointer gap-4 sm:gap-6 ${className}`}
    >
      <div className="flex h-15 w-15 sm:h-17 sm:w-17 items-center justify-center bg-primary-green/20 text-primary-green rounded-xl text-2xl ">
        {player.jersey_number ?? "-"}
      </div>

      <div className="flex justify-between items-center flex-1 gap-4">
        <div className="flex flex-col mb-1">
          <p className="text-sm sm:text-base text-white transition-colors group-hover:text-primary-green font-medium mb-1">
            {player.name}
          </p>
          <p className="flex items-center text-sm text-primary-gray gap-1 mb-1">
            <User className="w-3 h-3" /> {player.position.label}
          </p>
          <p className="flex items-center text-sm text-primary-gray gap-1">
            <Calendar className="w-3 h-3" /> {startYear} - {endYear}
          </p>
        </div>

        <div className="flex flex-col items-end gap-1"></div>
      </div>
    </Card>
  );
};

export default PlayerCard;
