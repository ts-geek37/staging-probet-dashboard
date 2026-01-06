"use client";
import React from "react";

import { ApiResponse } from "@/api/types";
import { LeagueResponse, LeagueView } from "@/types/leagues";

import Matches from "./Matches";
import Overview from "./Overview";
import Standings from "./Standings";
import Stats from "./Stats";
import Teams from "./Teams";

interface Props {
  tab: LeagueView;
  initialLeagues: ApiResponse<LeagueResponse>;
}

const LeagueTab: React.FC<Props> = ({ tab, initialLeagues }) => {
  const id = initialLeagues?.data?.league?.id ?? 0;
  switch (tab) {
    case LeagueView.OVERVIEW:
      return <Overview initialLeagues={initialLeagues} />;
    case LeagueView.STANDINGS:
      return <Standings id={id} />;
    case LeagueView.MATCHES:
      return <Matches id={id} />;
    case LeagueView.STATS:
      return <Stats id={id} />;
    case LeagueView.TEAMS:
      return <Teams id={id} />;
    default:
      return null;
  }
};

export default LeagueTab;
