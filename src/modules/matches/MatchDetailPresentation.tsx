"use client";

import React, { startTransition, useEffect, useState } from "react";

import { MatchDetailView, MatchListItem } from "@/types/matches";

import { useSearchParams } from "next/navigation";
import { MatchHeader } from "./details";
import { MatchDetailTabs } from "./details/tabs";

interface Props {
  initialData: MatchListItem;
}

const MatchDetailPresentation: React.FC<Props> = ({ initialData }) => {
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState<MatchDetailView>(
    MatchDetailView.OVERVIEW,
  );

  useEffect(() => {
    const tabFromQuery = searchParams.get("tab");

    const validTab = tabFromQuery
      ? Object.values(MatchDetailView).find(
          (view) => view.toLowerCase() === tabFromQuery.toLowerCase(),
        )
      : null;

    if (validTab) {
      startTransition(() => {
        setActiveTab(validTab);
      });
    }
  }, [searchParams]);

  return (
    <div className="max-w-7xl mx-auto w-full px-4 py-6 grid gap-6 text-white">
      <MatchHeader match={initialData} />

      <MatchDetailTabs
        match={initialData}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
};

export default MatchDetailPresentation;
