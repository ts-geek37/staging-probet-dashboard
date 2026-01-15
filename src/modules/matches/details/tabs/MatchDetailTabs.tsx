"use client";

import React, { useCallback } from "react";

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

  const renderActiveTab = useCallback(() => {
    switch (activeTab) {
      case MatchDetailView.OVERVIEW:
        return <MatchOverviewTab matchId={matchId} />;

      case MatchDetailView.STATS:
        return <MatchStatsTab matchId={matchId} />;

      case MatchDetailView.LINEUPS:
        return <MatchLineupsTab matchId={matchId} />;

      case MatchDetailView.EVENTS:
        return <MatchEventsTab matchId={matchId} />;

      case MatchDetailView.HEAD_TO_HEAD:
        return <MatchHeadToHeadTab match={match} />;

      case MatchDetailView.COMMENTS:
        return <MatchCommentsTab matchId={matchId} />;

      case MatchDetailView.SEASON_STATS:
        return <MatchSeasonStatsTab match={match} />;

      default:
        return null;
    }
  }, [activeTab, matchId, match]);

  return (
    <div className="w-full">
      <TabNavigation
        activeTab={activeTab}
        tabs={tabs}
        onTabChange={onTabChange}
      />

      <div className="mt-6 min-h-[50vh]">{renderActiveTab()}</div>
    </div>
  );
};

export default MatchDetailTabs;
