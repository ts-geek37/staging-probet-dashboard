"use client";

import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MatchListStatus } from "@/types/matches";

import MatchTabContent from "./MatchTabs";

interface Props {
  activeStatus: MatchListStatus;
  onChange: (status: MatchListStatus) => void;
  search?: string;
  leagueId?: number;
}

const MatchStatusTabs: React.FC<Props> = ({
  activeStatus,
  onChange,
  search,
  leagueId,
}) => {
  const statuses = Object.values(MatchListStatus);

  return (
    <Tabs
      value={activeStatus}
      onValueChange={(value: string) => onChange(value as MatchListStatus)}
      className="w-full"
    >
      <TabsList className="bg-transparent flex gap-2 rounded-none justify-start h-auto p-0 flex-wrap">
        {statuses.map((status) => (
          <TabsTrigger
            key={status}
            value={status}
            className="w-30 capitalize rounded-xl px-4 py-2 text-sm sm:text-base font-medium text-white border border-primary-gray/20 shrink-0 data-[state=active]:bg-primary-green"
          >
            {status}
          </TabsTrigger>
        ))}
      </TabsList>

      {statuses.map((status) => (
        <TabsContent key={status} value={status} className="mt-6">
          <MatchTabContent
            status={status}
            search={search}
            leagueId={leagueId}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default MatchStatusTabs;
