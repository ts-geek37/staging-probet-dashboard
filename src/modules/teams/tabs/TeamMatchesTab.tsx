"use client";

import React from "react";

import { DataError, NoData, SkeletonCardLoader } from "@/components";
import MatchListing from "@/components/MatchListing";

import {useTeamMatches }from "../hooks";
import { MatchListItem, MatchListStatus } from "@/types/matches";

interface Props {
  teamId: number;
  teamName: string;
}

const TeamMatchesTab: React.FC<Props> = ({ teamId ,teamName}) => {
  const { latest, upcoming, isLoading, error } = useTeamMatches(teamId);

  if (isLoading) return <SkeletonCardLoader />;
  if (error) return <DataError />;
  if (!latest && !upcoming) return <NoData message="Team data not available" />;

  return (
    <div className="space-y-12">
      {latest.length > 0 ? (
        <MatchListing
          title="Upcoming Fixtures"
          matches={upcoming as MatchListItem[]}
          href={`/matches?status=${MatchListStatus.UPCOMING}&q=${encodeURIComponent(teamName  )}`}
        />
      ) : (
        <NoData message="No recent matches found" />
      )}

      {upcoming.length > 0 ? (
        <MatchListing
          title="Recent Matches"
          matches={latest as MatchListItem[]}
          href={`/matches?status=${MatchListStatus.FINISHED}&q=${encodeURIComponent(teamName)}`}
        />
      ) : (
        <NoData message="No upcoming matches found" />
      )}
    </div>
  );
};

export default TeamMatchesTab;
