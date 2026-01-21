"use client";

import React from "react";

import { MatchListItem } from "@/types/home";
import { MatchListStatus } from "@/types/matches";

import FinishedMatches from "./FinishedMatches";
import LiveMatches from "./LiveMatches";
import UpcomingMatches from "./UpcomingMatches";
import { LiveMatchesScopeProps, LiveScopeEnum } from "../../ws/types";

interface Props {
  status: MatchListStatus;
  search?: string;
  leagueId?: number;
  teamId?: number;
  initialMatches?: MatchListItem[];
  scopeInfo?: LiveMatchesScopeProps;
}


const MatchTabs: React.FC<Props> = ({ status, search, leagueId, initialMatches, scopeInfo, teamId }) => {
  switch (status) {
    case MatchListStatus.LIVE:
      return (
        <LiveMatches
          search={search}
          leagueId={leagueId}
          initialMatches={initialMatches ?? []}
          scopeInfo={scopeInfo ?? { scope: LiveScopeEnum.GENERAL }}
        />
      );
    case MatchListStatus.UPCOMING:
      return <UpcomingMatches search={search} leagueId={leagueId} teamId={teamId} />;
    case MatchListStatus.FINISHED:
      return <FinishedMatches search={search} leagueId={leagueId} teamId={teamId} />;
    default:
      return null;
  }
};

export default MatchTabs;
