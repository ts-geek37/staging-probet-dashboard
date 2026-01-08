"use client";

import React from "react";

import { DataError, NoData, SkeletonCardLoader } from "@/components";
import { TeamMatchApi } from "@/types/teams";

import MatchCard from "../components/MatchCard";
import { useTeamMatches } from "../hooks";

interface Props {
  teamId: number;
}

const TeamMatches: React.FC<Props> = ({ teamId }) => {
  const { latest, upcoming, isLoading, error, formatDate } =
    useTeamMatches(teamId);

  if (isLoading) return <SkeletonCardLoader />;
  if (error) return <DataError />;
  if (!latest || !upcoming) return <NoData message="Team data not available" />;

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-semibold mb-4 text-white">
          Recent Matches
        </h2>
        {latest.length === 0 ? (
          <p className="text-gray-400">No recent matches available.</p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {latest.map((match: TeamMatchApi) => (
              <MatchCard
                key={match.id}
                match={match}
                type="latest"
                formatDate={formatDate}
              />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-white">
          Upcoming Fixtures
        </h2>
        {upcoming.length === 0 ? (
          <p className="text-gray-400">No upcoming fixtures.</p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {upcoming.map((match: TeamMatchApi) => (
              <MatchCard
                key={match.id}
                match={match}
                type="upcoming"
                formatDate={formatDate}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default TeamMatches;
