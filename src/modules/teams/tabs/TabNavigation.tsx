"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TeamDetailView } from "@/types/teams";

interface TabNavigationProps {
  activeTab: TeamDetailView;
  onTabChange: (value: TeamDetailView) => void;
}

const tabs = [
  { label: "Profile", value: TeamDetailView.OVERVIEW },
  { label: "Squad", value: TeamDetailView.SQUAD },
  { label: "Matches", value: TeamDetailView.MATCHES },
  { label: "Stats", value: TeamDetailView.STATS },
];

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="flex gap-2 border-b border-gray-700 mb-5">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;
        return (
          <Button
            key={tab.value}
            className={cn(
              "px-2 ms:px-4 py-2 relative transition-all text-xs sm:text-sm bg-transparent",
              isActive ? "text-primary-green" : "text-muted-foreground",
            )}
            onClick={() => onTabChange(tab.value)}
          >
            {tab.label}
            {isActive && (
              <span className="absolute -bottom-[1px] left-1/2 h-0.5 w-full -translate-x-1/2 bg-primary-green" />
            )}
          </Button>
        );
      })}
    </div>
  );
};

export default TabNavigation;
