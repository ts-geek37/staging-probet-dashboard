"use client";

import React from "react";

import TabNavigation from "@/components/TabNavigation";
import { MatchDetailView, MatchListItem } from "@/types/matches";

import MatchCommentsTab from "./MatchCommentsTab";
import MatchEventsTab from "./MatchEventsTab";
import MatchHeadToHeadTab from "./MatchHeadToHeadTab";
import MatchLineupsTab from "./MatchLineupsTab";
import MatchOverviewTab from "./MatchOverviewTab";
import MatchSeasonStatsTab from "./MatchSeasonStatsTab";
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
  const tabs = Object.values(MatchDetailView).map((tab) => {
    let label = tab.replace(/-/g, " ");
    if (tab === MatchDetailView.STATS) label = "Match Stats";
    if (tab === MatchDetailView.SEASON_STATS) label = "Season Stats";
    return {
      label: label.charAt(0).toUpperCase() + label.slice(1),
      value: tab,
    };
  });

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
        {activeTab === MatchDetailView.SEASON_STATS && (
          <MatchSeasonStatsTab match={match} />
        )}
      </div>
    </div>
  );
};

export default MatchDetailTabs;
