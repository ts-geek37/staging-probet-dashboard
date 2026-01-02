"use client";

import { ApiResponse } from "@/api/types";
import { TeamDetailView, TeamOverviewResponse } from "@/types/teams";
import { useState } from "react";

import TeamHeader from "./TeamHeader";
import { TeamDetailTabs } from "./tabs";

interface Props {
  teamId: number;
  initialData: ApiResponse<TeamOverviewResponse>;
}

const TeamDetailPresentation = ({ teamId, initialData }: Props) => {
  const [activeTab, setActiveTab] = useState<TeamDetailView>(
    TeamDetailView.OVERVIEW,
  );
  return (
    <div>
      <TeamHeader team={initialData.data} />

      <div>
        <button onClick={() => setActiveTab(TeamDetailView.OVERVIEW)}>
          Overview
        </button>
        <button onClick={() => setActiveTab(TeamDetailView.MATCHES)}>
          Matches
        </button>
        <button onClick={() => setActiveTab(TeamDetailView.SQUAD)}>
          Squad
        </button>
        <button onClick={() => setActiveTab(TeamDetailView.STATS)}>
          Stats
        </button>
      </div>

      <TeamDetailTabs
        activeTab={activeTab}
        teamId={teamId}
        initialData={initialData}
      />
    </div>
  );
};

export default TeamDetailPresentation;
