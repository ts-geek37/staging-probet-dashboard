"use client";

import { useState } from "react";

import { ApiResponse } from "@/api/types";
import { TeamDetailView, TeamOverviewResponse } from "@/types/teams";

import { TeamDetailTabs } from "./tabs";
import TabNavigation from "./tabs/TabNavigation";
import TeamHeader from "./TeamHeader";

interface Props {
  teamId: number;
  initialData: ApiResponse<TeamOverviewResponse>;
}

const TeamDetailPresentation = ({ teamId, initialData }: Props) => {
  const [activeTab, setActiveTab] = useState<TeamDetailView>(
    TeamDetailView.OVERVIEW,
  );
  return (
    <div className="text-white">
      <TeamHeader team={initialData.data} />

      <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 px-4 xl:px-0 pt-3 lg:pt-6 pb-8 md:pb-12">
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
