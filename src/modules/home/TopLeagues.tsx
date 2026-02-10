import Link from "next/link";
import React from "react";

import { LeagueCard, TeamCard } from "@/types/home";

import { LeagueStandingsTable, TopLeaguesList } from "./components";

interface Props {
  topLeagues: LeagueCard[];
  standings: TeamCard[];
}

const TopLeagues: React.FC<Props> = ({ topLeagues, standings }) => {
  const minLenth = Math.min(topLeagues.length, standings.length);
  const topLeaguesSlice = topLeagues.slice(0, minLenth);
  const standingsSlice = standings.slice(0, minLenth);
  return (
    <section className="py-10  grid gap-6 text-white">
      <div className="flex items-center justify-between w-full">
        <div>
          <h1 className="text-2xl sm:text-5xl font-bold mb-1">
            Top Leagues and Teams{" "}
          </h1>
          <p className="text-xs sm:text-base">Browse football competitions</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-7">
          <LeagueStandingsTable teams={standingsSlice} />
        </div>

        <div className="md:col-span-5">
          <TopLeaguesList leagues={topLeaguesSlice} />
        </div>
      </div>
    </section>
  );
};

export default TopLeagues;
