"use client";

import React from "react";

import { MatchCard, NoData } from "@/components";
import LeagueBanner from "@/modules/leagues/LeagueBanner";
import { MatchListItem } from "@/types/home";

import { useGeneralLiveMatches } from "../../ws/hooks";
import { LiveMatchesScopeProps } from "../../ws/types";

interface Props {
  initialMatches: MatchListItem[];
  scopeInfo: LiveMatchesScopeProps;
  search?: string;
}

const LiveMatches: React.FC<Props> = ({
  initialMatches,
  scopeInfo,
  search,
}) => {
  const { data, loading, error } = useGeneralLiveMatches(
    initialMatches,
    scopeInfo,
  );

  return (
    <section className=" text-white">
      <div className="">
        {error && (
          <div className="text-red-400 text-sm">
            Failed to load live updates
          </div>
        )}

        {loading && data.length === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-32 rounded-xl bg-[#111] animate-pulse"
              />
            ))}
          </div>
        )}

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
