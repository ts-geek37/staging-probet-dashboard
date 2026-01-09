"use client";

import React from "react";

import { ApiResponse } from "@/api/types";
import { LiveMatchCard, VIPBanner } from "@/components";
import { HomeResponse } from "@/types/home";

import Banner from "./Banner";
import { Testimonials } from "./components";
import { useHome } from "./hooks";
import LatestNews from "./LatestNews";
import PredictionBanner from "./PredictionBanner";
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
      <div className="max-w-7xl w-full mx-auto px-4">
        <VIPBanner />
        {/* <LiveMatchCard matches={data.live_matches} /> */}
        <VIPBanner />
        <UpcomingMatchCards matches={data.upcoming_matches} />
        <VIPBanner />
        {/* <TopEuropeanLeaguesPage
          topLeagues={data.top_leagues}
          standings={data.league_standings}
        /> */}
        <VIPBanner />
        <PredictionBanner />
        <VIPBanner />
        <LatestNews news={data.latest_news} />
        <Testimonials />
      </div>
    </>
  );
};

export default Home;
