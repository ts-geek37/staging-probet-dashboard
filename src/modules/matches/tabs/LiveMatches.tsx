"use client";

import Link from "next/link";
import React from "react";

import { NoData, SkeletonCardLoader } from "@/components";
import LiveMatchCard from "@/components/LiveMatchCard";
import LeagueBanner from "@/modules/leagues/LeagueBanner";
import { MatchListStatus } from "@/types/matches";

import useMatches from "../hooks/useMatches";

interface Props {
  search?: string;
}

const LiveMatches: React.FC<Props> = ({ search }) => {
  const { matches, isLoading } = useMatches({
    status: MatchListStatus.LIVE,
    page: 1,
    limit: 6,
    search,
  });

  if (isLoading) return <SkeletonCardLoader />;

  if (!matches?.length) {
    return <NoData message="No matches found" />;
  }
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
