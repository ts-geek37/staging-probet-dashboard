"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  const tabs = Object.values(MatchDetailView);

  const formatTabLabel = (label: string) =>
    label.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value : string) => onTabChange(value as MatchDetailView)}
      className="w-full"
    >
      <TabsList className="bg-transparent flex gap-2 overflow-x-auto whitespace-nowrap rounded-none justify-start h-auto p-0 flex-wrap">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab}
            value={tab}
            className="w-30 rounded-xl px-4 py-2 text-sm sm:text-base font-medium text-white border border-primary-gray/20  data-[state=active]:bg-primary-green"
          >
            {formatTabLabel(tab)}
          </TabsTrigger>
        ))}
      </TabsList>


      <div className="mt-6">
        <TabsContent value={MatchDetailView.OVERVIEW}>
          <MatchOverviewTab matchId={matchId}  />
        </TabsContent>

        <TabsContent value={MatchDetailView.STATS}>
          <MatchStatsTab matchId={matchId} />
        </TabsContent>

        <TabsContent value={MatchDetailView.LINEUPS}>
          <MatchLineupsTab matchId={matchId} />
        </TabsContent>

        <TabsContent value={MatchDetailView.EVENTS}>
          <MatchEventsTab matchId={matchId} />
        </TabsContent>

        <TabsContent value={MatchDetailView.PREDICTIONS}>
          <MatchPredictionsTab matchId={matchId} />
        </TabsContent>

      </div>
    </Tabs>
  );
};

export default MatchDetailTabs;
