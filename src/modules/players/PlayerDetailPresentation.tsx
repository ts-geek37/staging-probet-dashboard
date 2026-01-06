"use client";

import React, { useState } from "react";

import { ApiResponse } from "@/api/types";
import TabNavigation from "@/components/TabNavigation";
import { PlayerDetailView, PlayerOverviewResponse } from "@/types/players";

import PlayerHeader from "./PlayerHeader";
import { PlayerDetailTabs } from "./tabs";
import { NoData } from "@/components";

export const playerTabs = [
  { label: "Profile", value: PlayerDetailView.OVERVIEW },
  { label: "Stats", value: PlayerDetailView.STATS },
  { label: "Matches", value: PlayerDetailView.MATCHES },
];

interface Props {
  playerId: number;
  initialData: ApiResponse<PlayerOverviewResponse>;
}

const PlayerDetailPresentation: React.FC<Props> = ({
  playerId,
  initialData,
}) => {
  const [activeTab, setActiveTab] = useState<PlayerDetailView>(
    PlayerDetailView.OVERVIEW,
  );
  if (!initialData.data) {
    return <NoData message="No data available" />;
  }

  return (
    <div className="text-white">
      <PlayerHeader player={initialData.data} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <TabNavigation
          activeTab={activeTab}
          tabs={playerTabs}
          onTabChange={setActiveTab}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <PlayerDetailTabs
          activeTab={activeTab}
          playerId={playerId}
          initialData={initialData}
        />
      </div>
    </div>
  );
};

export default PlayerDetailPresentation;
