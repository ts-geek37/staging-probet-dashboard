"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TabItem<T> {
  label: string;
  value: T;
}

interface TabNavigationProps<T> {
  activeTab: T;
  tabs: TabItem<T>[];
  onTabChange: (value: T) => void;
}

const TabNavigation = <T extends string | number>({
  activeTab,
  tabs,
  onTabChange,
}: TabNavigationProps<T>) => {
  return (
    <div className="flex gap-1 sm:gap-2 border-b border-primary-gray/20">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;
        return (
          <Button
            key={tab.value}
            className={cn(
              "relative bg-transparent px-1 py-2 text-xs transition-all sm:px-4 sm:text-sm capitalize",
              isActive ? "text-primary-green" : "text-muted-foreground",
            )}
            onClick={() => onTabChange(tab.value)}
          >
            {tab.label}
            {isActive && (
              <span className="absolute -bottom-px left-1/2 h-0.5 w-full -translate-x-1/2 bg-primary-green" />
            )}
          </Button>
        );
      })}
    </div>
  );
};

export default TabNavigation;
