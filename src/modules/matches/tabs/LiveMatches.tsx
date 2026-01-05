"use client";

import React from "react";
import Link from "next/link";

import LiveMatchCard from "@/components/LiveMatchCard";
import LeagueBanner from "@/modules/leagues/LeagueBanner";
import { MatchListStatus } from "@/types/matches";

import useMatches from "../hooks/useMatches";

const LiveMatches: React.FC = () => {
  const { matches } = useMatches({
    status: MatchListStatus.LIVE,
    page: 1,
    limit: 6,
  });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match) => (
          <Link key={match.id} href={`/matches/${match.id}`} className="block">
            <LiveMatchCard
              teamA={match.home_team.name}
              teamB={match.away_team.name}
              scoreA={match.home_team.score ?? 0}
              scoreB={match.away_team.score ?? 0}
              teamALogo={match.home_team.logo}
              teamBLogo={match.away_team.logo}
              leagueName={match.league.name}
            />
          </Link>
        ))}
      </div>

      <div className="pt-15">
        <LeagueBanner banner="champions" />
      </div>
    </>
  );
};

export default LiveMatches;
