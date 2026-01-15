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
  const tabs = [
    { label: "Overview", value: MatchDetailView.OVERVIEW },
    { label: "Match Stats", value: MatchDetailView.STATS },
    { label: "Lineups", value: MatchDetailView.LINEUPS },
    { label: "Events", value: MatchDetailView.EVENTS },
    { label: "Head to Head", value: MatchDetailView.HEAD_TO_HEAD },
    { label: "Comments", value: MatchDetailView.COMMENTS },
    { label: "Season Stats", value: MatchDetailView.SEASON_STATS },
  ];

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
    <div className="w-full grid gap-6 pb-6">
      <TabNavigation
        activeTab={activeTab}
        tabs={tabs}
        onTabChange={onTabChange}
      />

      <div className="min-h-[40vh]">{renderActiveTab()}</div>
    </div>
  );
};

export default MatchDetailTabs;
