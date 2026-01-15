"use client";

import Link from "next/link";
import React from "react";

import { NoData, MatchCard } from "@/components";
import { MatchListItem } from "@/types/home";

interface Props {
  matches: MatchListItem[];
}

const LiveMatchCards: React.FC<Props> = ({ matches }) => {
  return (
    <section className="py-10 md:py-20 text-white">
      <div className="space-y-10">
        <div className="flex items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-xl sm:text-5xl font-bold">
              Today&apos;s Matches
            </h1>
            <p className="text-xs sm:text-base">Live and upcoming fixtures</p>
          </div>

          <Link href="/matches" className="text-primary-gray hover:text-white">
            View all
          </Link>
        </div>
        {!matches?.length ? (
          <NoData message="No matches found" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                href={`/matches/${match.id}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LiveMatchCards;
