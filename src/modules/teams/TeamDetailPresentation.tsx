"use client";

import { useState } from "react";

import { ApiResponse } from "@/api/types";
import { TabNavigation } from "@/components";
import { TeamDetailView, TeamOverviewResponse } from "@/types/teams";

import { TeamDetailTabs } from "./tabs";
import TeamHeader from "./TeamHeader";

interface Props {
  teamId: number;
  initialData: ApiResponse<TeamOverviewResponse> | null;
}

const tabs = [
  { label: "Profile", value: TeamDetailView.OVERVIEW },
  { label: "Squad", value: TeamDetailView.SQUAD },
  { label: "Matches", value: TeamDetailView.MATCHES },
  { label: "Stats", value: TeamDetailView.STATS },
];

const TeamDetailPresentation = ({ teamId, initialData }: Props) => {
  const [activeTab, setActiveTab] = useState<TeamDetailView>(
    TeamDetailView.OVERVIEW,
  );
  if (!initialData) return null;
  return (
    <div className="text-white">
      <TeamHeader team={initialData.data} />

      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="max-w-7xl mx-auto pb-4">
          <TabNavigation
            activeTab={activeTab}
            tabs={tabs}
            onTabChange={setActiveTab}
          />
        </div>
        <TeamDetailTabs
          activeTab={activeTab}
          teamId={teamId}
          initialData={initialData}
        />
      </div>
    </div>
  );
};

export default TeamDetailPresentation;
