"use client";

import { useState } from "react";

import { ApiResponse } from "@/api/types";
import { TeamDetailView, TeamOverviewResponse } from "@/types/teams";

import { TeamDetailTabs } from "./tabs";
import TabNavigation from "./tabs/TabNavigation";
import TeamHeader from "./TeamHeader";

interface Props {
  teamId: number;
  initialData: ApiResponse<TeamOverviewResponse> | null;
}

const TeamDetailPresentation = ({ teamId, initialData }: Props) => {
  const [activeTab, setActiveTab] = useState<TeamDetailView>(
    TeamDetailView.OVERVIEW,
  );
  if (!initialData) return null;
  return (
    <div className="text-white">
      <TeamHeader team={initialData.data} />

      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-6">
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
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
