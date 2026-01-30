"use client";

import React from "react";

import { DataError, NoData, SkeletonCardLoader } from "@/components";
import { MatchDetailView, MatchListItem } from "@/types/matches";

import { MatchInfoCard, VenueInfoCard } from "../../components";
import { useMatchDetail } from "../../hooks";

interface Props {
  matchId: number;
  isLive: boolean;
}

const MatchOverviewTab: React.FC<Props> = ({ matchId }) => {
  const { data, isLoading, error } = useMatchDetail(
    matchId,
    MatchDetailView.OVERVIEW,
  );

  if (isLoading) return <SkeletonCardLoader />;
  if (error) return <DataError />;
  if (!data) return <NoData message="Match data not available" />;

  const { league, status, referee, season, kickoff_time, venue } =
    data as MatchListItem;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <MatchInfoCard
        league={league}
        status={status}
        referee={referee}
        season={season}
        kickoff_time={kickoff_time}
      />

      <VenueInfoCard venue={venue} />
    </div>
  );
};

export default MatchOverviewTab;
