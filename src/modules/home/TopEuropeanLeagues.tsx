import Link from "next/link";
import React from "react";

import LeagueStandingsTable from "@/components/LeagueStandingsTable";
import { LeagueStandings, LeagueSummary } from "@/types/home";

import TopLeaguesList from "./TopLeaguesList";

interface Props {
  topLeagues: LeagueSummary[];
  standings: LeagueStandings | null;
}

const TopEuropeanLeaguesPage: React.FC<Props> = ({ topLeagues, standings }) => {
  return (
    <section className="py-10 md:py-20 text-white">
      <div>
        <div className="flex items-center justify-between mb-8 w-full ">
          <div className="">
            <h1 className="text-2xl sm:text-5xl font-bold">
              Top European Leagues
            </h1>
            <p className="text-sm sm:text-base">
              Browse European football competitions
            </p>
          </div>
          <Link href="/leagues">
            <span className="text-primary-gray text-sm sm:text-base cursor-pointer hover:text-white">
              View all
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7">
            {standings && <LeagueStandingsTable standings={standings} />}
          </div>

          <div className="md:col-span-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-bold">Top European Leagues</h3>
              <Link href="/leagues">
                <span className="text-primary-gray text-sm sm:text-base cursor-pointer hover:text-white">
                  All Leagues &gt;
                </span>
              </Link>
            </div>

            <TopLeaguesList leagues={topLeagues} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopEuropeanLeaguesPage;
