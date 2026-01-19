"use client";

import React from "react";

import { MatchListStatus } from "@/types/matches";

import FinishedMatches from "./FinishedMatches";
import LiveMatches from "./LiveMatches";
import UpcomingMatches from "./UpcomingMatches";

interface Props {
  status: MatchListStatus;
  search?: string;

  initialMatches?: any;
  scopeInfo?: any;
}

const MatchTabs: React.FC<Props> = ({
  status,
  search,
  initialMatches,
  scopeInfo,
}) => {
  switch (status) {
    case MatchListStatus.LIVE:
      return (
        <LiveMatches
          search={search}
          initialMatches={initialMatches}
          scopeInfo={scopeInfo}
        />
      );

    case MatchListStatus.UPCOMING:
      return <UpcomingMatches search={search} />;
    case MatchListStatus.FINISHED:
      return <FinishedMatches search={search} />;
    default:
      return null;
  }
};

export default MatchTabs;
