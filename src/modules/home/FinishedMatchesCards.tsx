"use client";

import Link from "next/link";
import React from "react";

import { MatchCard, NoData } from "@/components";
import { MatchListItem } from "@/types/home";
import { MatchListStatus } from "@/types/matches";

interface Props {
  matches: MatchListItem[];
}

const FinishedMatchesCards: React.FC<Props> = ({ matches }) => {
  return (
    <section className="py-5 sm:py-10  text-white">
      <div className="space-y-10">
        <div className="flex items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-xl sm:text-5xl font-bold">Recent Matches</h1>
          </div>
          <Link
            href={`/matches?status=${MatchListStatus.FINISHED}`}
            className="text-xs sm:text-base text-primary-gray hover:text-white transition-colors "
          >
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

export default FinishedMatchesCards;
