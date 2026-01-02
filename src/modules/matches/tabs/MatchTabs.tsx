"use client";

import React from "react";

import { MatchListStatus } from "@/types/matches";

import FinishedMatches from "./FinishedMatches";
import LiveMatches from "./LiveMatches";
import UpcomingMatches from "./UpcomingMatches";

interface Props {
  status: MatchListStatus;
}

const MatchTabs: React.FC<Props> = ({ status }) => {
  switch (status) {
    case MatchListStatus.LIVE:
      return <LiveMatches />;
    case MatchListStatus.UPCOMING:
      return <UpcomingMatches />;
    case MatchListStatus.FINISHED:
      return <FinishedMatches />;
    default:
      return null;
  }
};

export default MatchTabs;
