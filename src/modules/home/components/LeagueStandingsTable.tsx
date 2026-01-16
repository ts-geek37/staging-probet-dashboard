import Image from "next/image";
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
      href="/standings"
      items={standings}
      renderItem={(league, index) => (
        <div
          key={index}
          className="group flex items-center justify-between p-4 hover:bg-white/5 active:bg-white/5 active:scale-[0.99] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              {league.logo && (
                <Image
                  src={league.logo || "/no-image.png"}
                  alt=""
                  width={1000}
                  height={100}
                  className="size-10 object-contain"
                />
              )}
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-white font-medium text-sm sm:text-base group-hover:text-primary-green group-active:text-primary-green">
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
          <div className="flex flex-col gap-1 text-right text-xs sm:text-sm text-primary-gray group-hover:font-medium group-active:font-medium">
            <span>{league.founded}</span>
            <span className="group-hover:text-primary-green group-active:text-primary-green">
              {league.stadium.name}
            </span>
          </div>
        </div>
      )}
    />
  );
};

export default LeagueStandingsTable;
