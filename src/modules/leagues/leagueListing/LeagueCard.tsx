import { Crown, Trophy } from "lucide-react";
import Image from "next/image";
import React from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LeagueCard as ILeagueCard } from "@/types/leagues";

interface LeagueCardProps {
  league: ILeagueCard;
  onClick: () => void;
  className?: string;
}

const COMPETITION_ICON: Record<
  "league" | "cup",
  React.FC<{ className?: string }>
> = {
  league: Crown,
  cup: Trophy,
};

const LeagueCard: React.FC<LeagueCardProps> = ({
  league,
  onClick,
  className,
}) => {
  const CompetitionIcon = COMPETITION_ICON[league.competition_type];

  return (
    <Card
      className={cn(
        "group relative h-[140px] w-full overflow-hidden border-none transition-all hover:ring-1 hover:ring-primary-green/30 active:scale-[0.98] cursor-pointer rounded-xl p-0",
        className,
      )}
      onClick={onClick}
    >
      <div className="absolute inset-0 z-0 flex items-center justify-end overflow-hidden opacity-20 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-30">
        <div className="relative h-full w-3/5 translate-x-10">
          <Image
            src={league?.logo || "/no-image.png"}
            alt=""
            fill
            className="object-contain brightness-100"
          />
        </div>
      </div>

      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0a0e17] via-[#0a0e17]/80 to-transparent" />

      <div className="relative z-20 h-full w-full p-4 flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <h3 className="line-clamp-1 text-lg font-bold text-white transition-colors group-hover:text-primary-green sm:text-xl">
            {league?.name}
          </h3>
          <div className="flex items-center gap-2">
            <div className="relative h-4 w-6 overflow-hidden ring-white/10">
              <Image
                src={league?.country?.flag || "/no-image.png"}
                alt={league?.country?.name || ""}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-xs font-medium text-gray-400 sm:text-sm">
              {league?.country?.name}
            </span>
          </div>
        </div>
        <div className="flex size-8 items-center justify-center">
          <CompetitionIcon className="size-4 text-primary-yellow fill-primary-yellow" />
        </div>
      </div>
    </Card>
  );
};

export default LeagueCard;
