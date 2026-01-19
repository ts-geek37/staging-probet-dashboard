"use client";

import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { TeamPlayer } from "@/types/teams";

interface Props {
  player: TeamPlayer;
  className?: string;
}

const PlayerCard: React.FC<Props> = ({ player, className }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/players/${player.id}`)}
      className={cn(
        "group flex items-center gap-3 px-3 py-4 cursor-pointer",
        "hover:bg-white/5 transition-colors",
        className,
      )}
    >
      <div className="relative w-12 h-12 overflow-hidden bg-white rounded-full shrink-0">
        <Image
          src={player.photo || "/no-image.png"}
          alt={player.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm text-white truncate">{player.name}</p>
      </div>

      <Badge
        variant="secondary"
        className="hidden sm:inline-flex
             bg-primary-gray/10 text-primary-gray
             border-none px-2 h-5 text-xs uppercase
             hover:bg-primary-gray/10 hover:text-primary-gray
             focus:bg-primary-gray/10 focus:text-primary-gray
             active:bg-primary-gray/10"
      >
        {player.position.label}
      </Badge>
      <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-sm bg-primary-green text-base font-bold text-white shrink-0">
        {player.jersey_number || "-"}
      </div>

      <ChevronRight className="w-4 h-4 text-primary-gray group-hover:text-primary-green transition-all group-hover:translate-x-1" />
    </div>
  );
};

export default PlayerCard;
