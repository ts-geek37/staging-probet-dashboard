import Link from "next/link";
import React from "react";

import { NoData } from "@/components";
import LiveMatchCard from "@/components/LiveMatchCard";
import { LiveMatch } from "@/types/home";

interface Props {
  matches: LiveMatch[];
}

const LiveMatchCards: React.FC<Props> = ({ matches }) => {
  return (
    <section className="py-10 md:py-20 text-white">
      <div className="space-y-10">
        <div className="flex items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-5xl font-bold">
              Today&apos;s Matches
            </h1>
            <p className="text-sm sm:text-base">Live and upcoming fixtures</p>
          </div>

          <Link href="/matches" className="text-primary-gray hover:text-white">
            View all
          </Link>
        </div>

        {!matches?.length ? (
          <NoData message="No matches found" />
        ) : (
          <div className="flex flex-wrap gap-6 justify-center items-center md:justify-start md:items-start">
            {matches.map((match) => (
              <Link
                key={match.id}
                href={`/matches/${match.id}`}
                className="block"
              >
                <LiveMatchCard
                  key={match.id}
                  teamA={match.home_team.name}
                  teamB={match.away_team.name}
                  scoreA={match.home_team.score}
                  scoreB={match.away_team.score}
                  teamALogo={match.home_team.logo}
                  teamBLogo={match.away_team.logo}
                  leagueName={match.league.name}
                  leagueLogo={match.league.logo}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LiveMatchCards;
