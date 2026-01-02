"use client";

import React, { useState } from "react";
import { MatchDetailView, MatchOverviewResponse } from "@/types/matches";
import { MatchHeader } from "./details";
import { MatchDetailTabs } from "./details/tabs";

interface Props {
  initialData: MatchOverviewResponse;
}

const MatchDetailPresentation: React.FC<Props> = ({ initialData }) => {
  const [activeTab, setActiveTab] = useState<MatchDetailView>(
    MatchDetailView.OVERVIEW,
  );

  return (
    <div>
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
