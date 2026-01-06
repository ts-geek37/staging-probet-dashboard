"use client";
import React from "react";

import { ApiResponse } from "@/api/types";
import {
  LeagueProfileResponse,
  LeagueResponse,
  LeagueView,
} from "@/types/leagues";

import Matches from "./Matches";
import Overview from "./Overview";
import Standings from "./Standings";
import Stats from "./Stats";
import Teams from "./Teams";

interface Props {
  tab: LeagueView;
  initialLeagues: ApiResponse<LeagueProfileResponse>;
}

const LeagueTab: React.FC<Props> = ({ tab, initialLeagues }) => {
  const id = initialLeagues?.data?.id ?? 0;
  switch (tab) {
    case LeagueView.OVERVIEW:
      return <Overview initialLeagues={initialLeagues} />;
    case LeagueView.STANDINGS:
      return <Standings id={id} />;
    case LeagueView.MATCHES:
      return <Matches id={id} />;
    case LeagueView.STATISTICS:
      return <Stats id={id} />;
    default:
      return null;
  }
};

export default LeagueTab;
