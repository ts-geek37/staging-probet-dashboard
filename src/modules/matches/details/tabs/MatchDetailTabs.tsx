"use client";

import React, { useCallback, useMemo } from "react";

import TabNavigation from "@/components/TabNavigation";
import { MatchDetailView, MatchListItem } from "@/types/matches";

import MatchCommentsTab from "./MatchCommentsTab";
import MatchEventsTab from "./MatchEventsTab";
import MatchHeadToHeadTab from "./MatchHeadToHeadTab";
import MatchLineupsTab from "./MatchLineupsTab";
import MatchOverviewTab from "./MatchOverviewTab";
import MatchSeasonStatsTab from "./matchSeasonStatsTab";
import MatchStatsTab from "./MatchStatsTab";
import { TAB_CONFIG } from "../../constants";

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
  const tabs = useMemo(() => {
    return TAB_CONFIG.filter((tab) => !tab.hideWhen?.includes(match.status));
  }, [match.status]);

  const isLive = match.status === "LIVE";
  const renderActiveTab = useCallback(() => {
    switch (activeTab) {
      case MatchDetailView.OVERVIEW:
        return <MatchOverviewTab matchId={matchId} isLive={isLive} />;

      case MatchDetailView.STATS:
        return <MatchStatsTab matchId={matchId} />;

      case MatchDetailView.LINEUPS:
        return <MatchLineupsTab matchId={matchId} />;

      case MatchDetailView.EVENTS:
        return <MatchEventsTab matchId={matchId} isLive={isLive} />;

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
