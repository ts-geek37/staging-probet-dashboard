"use client";

import React from "react";

import { ApiResponse } from "@/api/types";
import { VIPBanner } from "@/components";
import { HomeResponse } from "@/types/home";

import Banner from "./Banner";
import { useHome } from "./hooks";
import LatestNews from "./LatestNews";
import LiveMatchCard from "./LiveMatchCards";
import PredictionBanner from "./PredictionBanner";
import TopEuropeanLeaguesPage from "./TopEuropeanLeagues";
import UpcomingMatchCards from "./UpcomingMatchCards";

interface Props {
  initialHome: ApiResponse<HomeResponse>;
}

const Home: React.FC<Props> = ({ initialHome }) => {
  const { data } = useHome(initialHome);

  if (!data) return null;

  return (
    <>
      <Banner />
      <div className="max-w-7xl mx-auto px-4">
        <VIPBanner />
        <LiveMatchCard matches={data.live_matches} />
        <VIPBanner />
        <UpcomingMatchCards matches={data.upcoming_matches} />
        <VIPBanner />
        <TopEuropeanLeaguesPage
          topLeagues={data.top_leagues}
          standings={data.league_standings}
        />
        <VIPBanner />
        <PredictionBanner />
        <VIPBanner />
        <LatestNews news={data.latest_news} />
      </div>
    </>
  );
};

export default Home;
