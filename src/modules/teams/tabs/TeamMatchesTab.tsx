"use client";

import React from "react";

import { DataError, NoData, SkeletonCardLoader, MatchCard } from "@/components";
import { MatchListItem } from "@/types/teams";

import { useTeamMatches } from "../hooks";

interface Props {
  teamId: number;
}

const TeamMatchesTab: React.FC<Props> = ({ teamId }) => {
  const { latest, upcoming, isLoading, error } = useTeamMatches(teamId);

  if (isLoading) return <SkeletonCardLoader />;
  if (error) return <DataError />;
  if (!latest || !upcoming) return <NoData message="Team data not available" />;

  const renderMatches = (matches: MatchListItem[], emptyMessage: string) =>
    !matches.length ? (
      <NoData message={emptyMessage} />
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
    );

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-xl font-semibold mb-4 text-white">
          Recent Matches
        </h2>
        {renderMatches(latest, "No latest matches")}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-white">
          Upcoming Fixtures
        </h2>
        {renderMatches(upcoming, "No upcoming fixtures")}
      </section>
    </div>
  );
};

export default TeamMatchesTab;
