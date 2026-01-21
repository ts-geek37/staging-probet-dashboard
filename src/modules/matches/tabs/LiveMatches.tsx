"use client";

import React from "react";

import { DataError, MatchCard, NoData, SkeletonCardLoader } from "@/components";
import LeagueBanner from "@/modules/leagues/LeagueBanner";
import { MatchListItem } from "@/types/home";

import { useGeneralLiveMatches } from "../../ws/hooks";
import { LiveMatchesScopeProps } from "../../ws/types";

interface Props {
  initialMatches: MatchListItem[];
  scopeInfo: LiveMatchesScopeProps;
  search?: string;
  leagueId?: number;
}

const LiveMatches: React.FC<Props> = ({
  initialMatches,
  scopeInfo,
  search,
  leagueId
}) => {
  const { data, loading, error } = useGeneralLiveMatches(
    initialMatches,
    scopeInfo,
    search,
  );

  return (
    <section className=" text-white">
      <div className="">
        {error && <DataError />}

        {loading && <SkeletonCardLoader />}

        {!loading && data.length === 0 ? (
          <NoData message="No live matches found" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                href={`/matches/${match.id}`}
              />
            ))}
          </div>
        )}

        <div className="pt-15">
          <LeagueBanner banner="champions" />
        </div>
      </div>
    </section>
  );
};

export default LiveMatches;
