"use client";

import React, { useState } from "react";

import { ApiResponse } from "@/api/types";
import { NoData } from "@/components";
import TabNavigation from "@/components/TabNavigation";
import { PlayerDetailView, PlayerProfileResponse } from "@/types/players";

import PlayerHeader from "./PlayerHeader";
import { PlayerDetailTabs } from "./tabs";

export const playerTabs = [
  { label: "Profile", value: PlayerDetailView.Profile },
  { label: "Stats", value: PlayerDetailView.STATS },
  { label: "Transfers", value: PlayerDetailView.TRANSFERS },
];

interface Props {
  playerId: number;
  initialData: ApiResponse<PlayerProfileResponse>;
}

const PlayerDetailPresentation: React.FC<Props> = ({
  playerId,
  initialData,
}) => {
  const [activeTab, setActiveTab] = useState<PlayerDetailView>(
    PlayerDetailView.Profile,
  );
  if (!initialData.data) {
    return <NoData message="No data available for this player" />;
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-3 py-8 h-full">
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
