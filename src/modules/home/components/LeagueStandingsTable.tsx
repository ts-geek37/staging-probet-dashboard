import Image from "next/image";
import Link from "next/link";
import React from "react";

import { ListCard } from "@/modules/home/components";
import { TeamCard } from "@/types/home";

import NoData from "../../../components/NoData";

interface Props {
  standings?: TeamCard[];
}

const LeagueStandingsTable: React.FC<Props> = ({ standings }) => {
  if (!standings || standings.length === 0) return <NoData />;

  return (
    <ListCard
      title="League Standings"
      href="/leagues"
      items={standings}
      renderItem={(league, index) => (
        <Link
          href={`/leagues/${league.id}`}
          key={index}
          className="group flex items-center justify-between px-5 py-4 hover:bg-white/5 active:bg-white/5 active:scale-[0.99] transition-all cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="relative size-12 flex items-center justify-center rounded-lg bg-white/95 p-1.5 transition-colors group-hover:bg-white/80">
              {league.logo && (
                <Image
                  src={league.logo || "/no-image.png"}
                  alt={league.name}
                  width={48}
                  height={48}
                  className="size-full object-contain"
                />
              )}
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-white font-medium text-sm sm:text-base tracking-wide transition-colors group-hover:text-primary-green">
                {league.name}
              </span>

              <div className="flex items-center gap-2 text-primary-gray text-xs sm:text-sm">
                {league.country?.flag && (
                  <Image
                    src={league.country.flag}
                    alt={league.country?.name}
                    width={18}
                    height={12}
                    className="object-contain rounded-xs shadow-xs"
                  />
                )}
                <span>
                  {league.country?.name}{" "}
                  {league.country?.code && `(${league.country.code})`}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 text-right text-[10px] sm:text-xs text-primary-gray/60 transition-colors group-hover:text-primary-gray/80">
            <span className="font-medium tracking-widest">
              {league.founded}
            </span>
            <span className="max-w-[120px] sm:max-w-[200px] truncate">
              {league.stadium.name}
            </span>
          </div>
        </Link>
      )}
    />
  );
};

export default LeagueStandingsTable;
