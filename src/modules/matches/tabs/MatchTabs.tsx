"use client";

import React from "react";
import { MatchListStatus } from "@/types/matches";
import FinishedMatches from "./FinishedMatches";
import LiveMatches from "./LiveMatches";
import UpcomingMatches from "./UpcomingMatches";

interface Props {
  status: MatchListStatus;
  search?: string;
}

const MatchTabs: React.FC<Props> = ({ status, search }) => {
  switch (status) {
    case MatchListStatus.LIVE:
      return <LiveMatches search={search} />;
    case MatchListStatus.UPCOMING:
      return <UpcomingMatches search={search} />;
    case MatchListStatus.FINISHED:
      return <FinishedMatches search={search} />;
    default:
      return null;
  }
};

export default MatchTabs;
