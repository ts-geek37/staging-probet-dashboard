"use client";

import React from "react";

import TabNavigation from "@/components/TabNavigation";
import { MatchDetailView, MatchListItem } from "@/types/matches";

import MatchCommentsTab from "./MatchCommentsTab";
import MatchEventsTab from "./MatchEventsTab";
import MatchHeadToHeadTab from "./MatchHeadToHeadTab";
import MatchLineupsTab from "./MatchLineupsTab";
import MatchOverviewTab from "./MatchOverviewTab";
import MatchStatsTab from "./MatchStatsTab";

interface Props {
  match: MatchListItem;
  activeTab: MatchDetailView;
  onTabChange: (tab: MatchDetailView) => void;
}

const MatchDetailTabs: React.FC<Props> = ({
  match,
  activeTab,
  onTabChange,
}) => {
  const matchId = match.id;
  const tabs = Object.values(MatchDetailView).map((tab) => ({
    label: tab.toLowerCase(),
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
        {activeTab === MatchDetailView.HEAD_TO_HEAD && (
          <MatchHeadToHeadTab match={match} />
        )}
        {activeTab === MatchDetailView.COMMENTS && (
          <MatchCommentsTab matchId={matchId} />
        )}
      </div>
    </div>
  );
};

export default MatchDetailTabs;
