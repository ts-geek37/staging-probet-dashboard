"use client";

import { useState } from "react";

import { ApiResponse } from "@/api/types";
import { PlayerDetailView, PlayerOverviewResponse } from "@/types/players";

import PlayerHeader from "./PlayerHeader";
import { PlayerDetailTabs } from "./tabs";

interface Props {
  playerId: number;
  initialData: ApiResponse<PlayerOverviewResponse>;
}

const PlayerDetailPresentation = ({ playerId, initialData }: Props) => {
  const [activeTab, setActiveTab] = useState<PlayerDetailView>(
    PlayerDetailView.OVERVIEW,
  );

  return (
    <div>
      <PlayerHeader player={initialData.data} />
      <div>
        <button onClick={() => setActiveTab(PlayerDetailView.OVERVIEW)}>
          Overview
        </button>
        <button onClick={() => setActiveTab(PlayerDetailView.STATS)}>
          Statistics
        </button>
        <button onClick={() => setActiveTab(PlayerDetailView.MATCHES)}>
          Matches
        </button>
      </div>

      <PlayerDetailTabs
        activeTab={activeTab}
        playerId={playerId}
        initialData={initialData}
      />
    </div>
  );
};

export default PlayerDetailPresentation;
