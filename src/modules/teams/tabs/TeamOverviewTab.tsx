"use client";

import { MapPin } from "lucide-react";
import React from "react";

import { ApiResponse } from "@/api/types";
import {
  DataError,
  NoData,
  SkeletonCardLoader,
  OverviewCard,
} from "@/components";
import { TeamOverviewResponse } from "@/types/teams";

import useTeamOverview from "../hooks/useTeamOverview";

interface Props {
  initialData: ApiResponse<TeamOverviewResponse>;
}

const TeamOverviewTab: React.FC<Props> = ({ initialData }) => {
  const { sections, isLoading, error } = useTeamOverview(
    initialData?.data?.id ?? 0,
    initialData,
  );

  if (isLoading) return <SkeletonCardLoader />;
  if (error) return <DataError />;
  if (!sections.length) return <NoData message="Team data not available" />;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {sections.map((section) => (
        <OverviewCard
          key={section.key}
          title={section.title}
          items={section.items}
        />
      ))}
    </div>
  );
};

export default TeamOverviewTab;
