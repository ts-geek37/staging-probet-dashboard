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
          className="group flex items-center justify-between p-4 hover:bg-white/5 active:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="relative size-10">
              <Image
                src={league?.logo ?? "/no-image.png"}
                alt={league?.name ?? ""}
                fill
                className="object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/no-image.png";
                }}
              />
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-white font-medium text-sm sm:text-base group-hover:text-primary-green group-active:text-primary-green">
                {league.name}
              </span>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-primary-gray">
                {league?.country?.flag && (
                  <Image
                    src={league?.country?.flag ?? "/no-image.png"}
                    alt={league?.country?.name ?? ""}
                    width={16}
                    height={12}
                    className="object-contain hidden sm:block"
                  />
                )}
                <span>{league.country.name}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 text-primary-gray text-sm group-hover:text-primary-green group-active:text-primary-green">
            <span className="capitalize">{league.competition_type}</span>
            <ChevronRight className="size-4 transition-colors" />
          </div>
        </Link>
      )}
    />
  );
};

export default TopLeaguesList;
