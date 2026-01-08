"use client";

import React from "react";

import TabNavigation from "@/components/TabNavigation";
import { MatchDetailView } from "@/types/matches";

import MatchEventsTab from "./MatchEventsTab";
import MatchLineupsTab from "./MatchLineupsTab";
import MatchOverviewTab from "./MatchOverviewTab";
import MatchPredictionsTab from "./MatchPredictionsTab";
import MatchStatsTab from "./MatchStatsTab";

interface Props {
  matchId: number;
  activeTab: MatchDetailView;
  onTabChange: (tab: MatchDetailView) => void;
}

const MatchDetailTabs: React.FC<Props> = ({
  matchId,
  activeTab,
  onTabChange,
}) => {
  const tabs = Object.values(MatchDetailView).map((tab) => ({
    label: tab.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()),
    value: tab,
  }));

  return (
    <div className="w-full">
      <TabNavigation
        activeTab={activeTab}
        tabs={tabs}
        onTabChange={onTabChange}
      />

      <div className="mt-6">
        {activeTab === MatchDetailView.OVERVIEW && (
          <MatchOverviewTab matchId={matchId} />
        )}
        {activeTab === MatchDetailView.STATS && (
          <MatchStatsTab matchId={matchId} />
        )}
        {activeTab === MatchDetailView.LINEUPS && (
          <MatchLineupsTab matchId={matchId} />
        )}
        {activeTab === MatchDetailView.EVENTS && (
          <MatchEventsTab matchId={matchId} />
        )}
        {activeTab === MatchDetailView.PREDICTIONS && (
          <MatchPredictionsTab matchId={matchId} />
        )}
      </div>
    </div>
  );
};

export default MatchDetailTabs;
