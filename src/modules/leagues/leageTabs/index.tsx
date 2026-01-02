"use client";
import React from "react";

import { LeagueView } from "@/types/leagues";

import Matches from "./Matches";
import Overview from "./Overview";
import Standings from "./Standings";
import Stats from "./Stats";
import Teams from "./Teams";

interface Props {
  tab: LeagueView;
}

const LeagueTab: React.FC<Props> = ({ tab }) => {
  switch (tab) {
    case LeagueView.OVERVIEW:
      return <Overview />;
    case LeagueView.STANDINGS:
      return <Standings />;
    case LeagueView.MATCHES:
      return <Matches />;
    case LeagueView.STATS:
      return <Stats />;
    case LeagueView.TEAMS:
      return <Teams />;
    default:
      return null;
  }
};

export default LeagueTab;
