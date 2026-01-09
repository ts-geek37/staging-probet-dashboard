import Image from "next/image";
import React from "react";

import { TeamCard } from "@/types/home";

import NoData from "./NoData";

interface Props {
  standings?: TeamCard[];
}

const LeagueStandingsTable: React.FC<Props> = ({ standings }) => {
  if (!standings || standings.length === 0) return <NoData />;

  return (
    <div className="rounded-xl border border-primary-gray/20 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-5 border-b border-primary-gray/20">
        <h3 className="text-white font-semibold text-sm">League Standings</h3>
        <span className="text-[12px] sm:text-base text-primary-gray cursor-pointer hover:text-white">
          Full Table &gt;
        </span>
      </div>

      <div className="flex flex-col divide-y divide-primary-gray/20">
        {standings.map((league) => (
          <div
            key={league.id ?? league.name}
            className="flex items-center justify-between px-4 py-3 "
          >
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8">
                {league.logo && (
                  <Image
                    src={league.logo || "/no-image.png"}
                    alt=""
                    width={27}
                    height={18}
                    className="object-contain"
                  />
                )}
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-white font-medium text-sm sm:text-base">
                  {league.name}
                </span>

                <div className="flex items-center gap-2 text-primary-gray text-sm">
                  {league.country?.flag && (
                    <Image
                      src={league.country.flag}
                      alt={league.country?.name}
                      width={20}
                      height={14}
                      className="object-contain hidden sm:block"
                    />
                  )}
                  <span className="text-xs sm:text-sm">
                    {league.country?.name} ({league.country?.code})
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1 text-right text-xs">
              <span className="text-primary-gray">{league.founded}</span>
              <span className="text-primary-gray">{league.stadium.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeagueStandingsTable;
