"use client";

import React from "react";

import { DataError, NoData, SkeletonCardLoader } from "@/components";
import MatchListing from "@/components/MatchListing";
import { MatchListItem } from "@/types/teams";
import { MatchListStatus } from "@/types/leagues";

import { useTeamMatches } from "../hooks";

interface Props {
  teamId: number;
}

const TeamMatchesTab: React.FC<Props> = ({ teamId }) => {
  const { latest, upcoming, isLoading, error } = useTeamMatches(teamId);

  if (isLoading) return <SkeletonCardLoader />;
  if (error) return <DataError />;
  if (!latest || !upcoming) return <NoData message="Team data not available" />;

  return (
    <div className="flex flex-col gap-8">
      {upcoming.length > 0 && (
        <MatchListing
          title="Upcoming Fixtures"
          matches={upcoming as MatchListItem[]}
          href={`/matches?status=${MatchListStatus.UPCOMING}&teamId=${teamId}`}
        />
      )}

      {latest.length > 0 && (
        <MatchListing
          title="Recent Matches"
          matches={latest as MatchListItem[]}
          href={`/matches?status=${MatchListStatus.FINISHED}&teamId=${teamId}`}
        />
      )}
    </div>
  );
};

export default TeamMatchesTab;
