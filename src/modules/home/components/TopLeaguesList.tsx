import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { LeagueCard } from "@/types/home";

import ListCard from "./ListCard";

interface Props {
  leagues: LeagueCard[];
}

const TopLeaguesList: React.FC<Props> = ({ leagues }) => {
  if (!leagues.length) return null;

  return (
    <ListCard
      title="Top Leagues"
      href="/leagues"
      linkLabel="All Leagues >"
      items={leagues}
      renderItem={(league) => (
        <Link
          key={league.id}
          href={`/leagues/${league.id}`}
          className="group flex items-center justify-between px-5 py-4 hover:bg-white/5 active:bg-white/5 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="relative size-12 flex items-center justify-center rounded-lg bg-white/95 p-1.5 transition-colors group-hover:bg-white/80">
              <Image
                src={league?.logo || "/no-image.png"}
                alt={league?.name || ""}
                width={48}
                height={48}
                className="size-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/no-image.png";
                }}
              />
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-white font-medium text-sm sm:text-base tracking-wide transition-colors group-hover:text-primary-green">
                {league.name}
              </span>

              <div className="flex items-center gap-2 text-primary-gray text-xs sm:text-sm">
                {league?.country?.flag ? (
                  <Image
                    src={league?.country?.flag}
                    alt={league?.country?.name || ""}
                    width={18}
                    height={12}
                    className="object-contain rounded-xs shadow-xs"
                  />
                ) : (
                  <span className="size-4 flex items-center justify-center text-[10px] bg-white/10 rounded-full italic">
                    🌍
                  </span>
                )}
                <span>{league.country.name}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-primary-gray group-hover:text-primary-green transition-colors text-xs sm:text-sm font-medium">
            <span className="capitalize">League</span>
            <ChevronRight className="size-4" />
          </div>
        </Link>
      )}
    />
  );
};

export default TopLeaguesList;
