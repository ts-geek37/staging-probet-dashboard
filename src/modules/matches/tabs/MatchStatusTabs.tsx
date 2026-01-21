"use client";

import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MatchListStatus } from "@/types/matches";

import { LiveScopeEnum } from "@/modules/ws/types";
import MatchTabContent from "./MatchTabs";

interface Props {
  activeStatus: MatchListStatus;
  onChange: (status: MatchListStatus) => void;
  search?: string;
  leagueId?: number;
  teamId?: number;
}

const MatchStatusTabs: React.FC<Props> = ({
  activeStatus,
  onChange,
  search,
  leagueId,
  teamId,
}) => {
  const statuses = Object.values(MatchListStatus);
  const buildScopeInfo = () => {
    if (leagueId) {
      return { scope: LiveScopeEnum.LEAGUE, id: leagueId };
    }
    if (teamId) {
      return { scope: LiveScopeEnum.TEAM, id: teamId };
    }
    return { scope: LiveScopeEnum.GENERAL };
  };
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
            teamId={teamId}
            scopeInfo={buildScopeInfo()}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default MatchStatusTabs;
