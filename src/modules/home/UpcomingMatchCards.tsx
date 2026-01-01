import Link from "next/link";
import React from "react";

import UpcomingMatchCard from "@/components/UpcomingMatchCard";
import { UpcomingMatch } from "@/types/home";
import { formatUtcTime } from "@/utils/date";

interface Props {
  matches: UpcomingMatch[];
}

const UpcomingMatchCards: React.FC<Props> = ({ matches }) => {
  if (!matches.length) return null;

  return (
    <section className="px-4 sm:px-6 py-10 md:py-20 text-white">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-5xl font-bold">Upcoming Matches</h1>
          </div>

          <Link
            href="/matches"
            className="text-primary-gray hover:text-white transition-colors"
          >
            View all
          </Link>
        </div>

        <div className="flex flex-wrap gap-6 justify-center items-center md:justify-start md:items-start">
          {matches.map((match) => (
            <UpcomingMatchCard
              key={match.id}
              teamA={match.home_team.name}
              teamB={match.away_team.name}
              teamALogo={match.home_team.logo}
              teamBLogo={match.away_team.logo}
              date={match.date}
              time={formatUtcTime(match.kickoff_time)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingMatchCards;
