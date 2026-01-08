"use client";

import React, { useState } from "react";

import { MatchDetailView, MatchListItem } from "@/types/matches";

import { MatchHeader } from "./details";
import { MatchDetailTabs } from "./details/tabs";

interface Props {
  initialData: MatchListItem;
}

const MatchDetailPresentation: React.FC<Props> = ({ initialData }) => {
  const [activeTab, setActiveTab] = useState<MatchDetailView>(
    MatchDetailView.OVERVIEW,
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 pb-4">
      <MatchHeader match={initialData} />

      <MatchDetailTabs
        matchId={initialData.id}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
};

export default MatchDetailPresentation;
