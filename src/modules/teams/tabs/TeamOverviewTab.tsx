"use client";

import React from "react";

import { ApiResponse } from "@/api/types";
import { DataError, NoData, SkeletonCardLoader } from "@/components";
import { TeamOverviewResponse } from "@/types/teams";

import TeamProfileOverView from "../components/TeamProfileOverview";
import useTeamOverview from "../hooks/useTeamOverview";

interface Props {
  initialData: ApiResponse<TeamOverviewResponse>;
}

const TeamOverviewTab: React.FC<Props> = ({ initialData }) => {
  const {
    teamInfo,
    venue,
    seasons,
    rankings,
    rivals,
    socials,
    isLoading,
    error,
  } = useTeamOverview(initialData?.data?.id ?? 0, initialData);

  if (isLoading) return <SkeletonCardLoader />;
  if (error) return <DataError />;
  if (!teamInfo) return <NoData message="Team data not available" />;

  return (
    <TeamProfileOverView
      teamInfo={teamInfo}
      venue={venue}
      seasons={seasons}
      rankings={rankings}
      rivals={rivals}
      socials={socials}
    />
  );
};

export default TeamOverviewTab;
