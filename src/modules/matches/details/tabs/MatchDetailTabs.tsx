"use client";

import { useSearchParams } from "next/navigation";
import React, { startTransition, useEffect, useMemo, useState } from "react";

import TabNavigation from "@/components/TabNavigation";
import { MatchDetailView, MatchListItem } from "@/types/matches";

import MatchCommentsTab from "./MatchCommentsTab";
import MatchEventsTab from "./MatchEventsTab";
import MatchHeadToHeadTab from "./MatchHeadToHeadTab";
import MatchLineupsTab from "./MatchLineupsTab";
import MatchOverviewTab from "./MatchOverviewTab";
import MatchPrediction from "./MatchPredictionTab";
import MatchSeasonStatsTab from "./matchSeasonStatsTab";
import MatchStatsTab from "./MatchStatsTab";
import { TAB_CONFIG } from "../../constants";

interface Props {
  match: MatchListItem;
}

const MatchDetailTabs: React.FC<Props> = ({ match }) => {
  const matchId = match.id;
  const [activeTab, setActiveTab] = useState<MatchDetailView>(
    MatchDetailView.OVERVIEW,
  );
  const tabs = useMemo(() => {
    return TAB_CONFIG.filter((tab) => !tab.hideWhen?.includes(match.status));
  }, [match.status]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const tabFromQuery = searchParams.get("tab");
    if (!tabFromQuery) return;
    const normalized = tabFromQuery.toLowerCase();

    const validTab = tabs.find((tab) => tab.value.toLowerCase() === normalized);
    if (!validTab) return;

    startTransition(() => {
      setActiveTab(validTab.value);
    });
  }, [searchParams]);

  const isLive = match.status === "LIVE";
  const renderActiveTab = () => {
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

      case MatchDetailView.PREDICTION:
        return (
          <MatchPrediction
            matchId={matchId}
            homeTeam={match?.teams?.home?.name}
            awayTeam={match?.teams?.away?.name}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full grid gap-6 pb-6">
      <TabNavigation
        activeTab={activeTab}
        tabs={tabs}
        onTabChange={setActiveTab}
      />

      <div className="min-h-[40vh]">{renderActiveTab()}</div>
    </div>
  );
};

export default MatchDetailTabs;
