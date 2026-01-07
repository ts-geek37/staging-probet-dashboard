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
  const { team, isLoading, error } = useTeamOverview(
    initialData?.data?.id ?? 0,
    initialData,
  );

  if (isLoading) return <SkeletonCardLoader />;
  if (error) return <DataError />;
  if (!team) return <NoData message="Team data not available" />;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <OverviewCard
        title="Team Info"
        items={[
          { label: "Full Name", value: team.name, image: team.logo },
          { label: "Short Code", value: team.short_code, type: "badge" },
          { label: "Founded", value: team.founded },
          {
            label: "Country",
            value: team.country?.name,
            image: team.country?.flag,
          },
        ]}
      />

      {team.stadium && (
        <OverviewCard
          title="Venue & Stadium"
          items={[
            {
              label: "Stadium",
              value: team.stadium.name ?? "N/A",
              icon: <MapPin className="w-4 h-4 text-white" />,
            },
            {
              label: "Capacity",
              value: team.stadium.capacity?.toLocaleString() ?? "N/A",
            },
          ]}
        />
      )}

      {team.current_season && (
        <OverviewCard
          title="Season Info"
          items={[{ label: "Season Name", value: team.current_season.name }]}
        />
      )}
    </div>
  );
};

export default TeamOverviewTab;
