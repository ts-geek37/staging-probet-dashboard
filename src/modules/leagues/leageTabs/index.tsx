"use client";
import React from "react";

import { LeagueView } from "@/types/leagues";

import Matches from "./Matches";
import Standings from "./standings";
import Stats from "./stats";
import TopScorers from "./topScorers";

interface Props {
  tab: LeagueView;
  id: number;
}

const LeagueTab: React.FC<Props> = ({ tab, id }) => {
  switch (tab) {
    case LeagueView.STANDINGS:
      return <Standings id={id} />;
    case LeagueView.MATCHES:
      return <Matches id={id} />;
    case LeagueView.STATISTICS:
      return <Stats id={id} />;
    case LeagueView.TOP_SCORERS:
      return <TopScorers id={id} />;
    default:
      return null;
  }
};

export default LeagueTab;
