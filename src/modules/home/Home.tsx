"use client";

import React from "react";

import { ApiResponse } from "@/api/types";
import { VIPBanner } from "@/components";
import { HomeResponse } from "@/types/home";

import Banner from "./Banner";
import { useHome } from "./hooks";
import LatestNews from "./LatestNews";
import LiveMatchCard from "./LiveMatchesCards";
import PredictionBanner from "./PredictionBanner";
import TopEuropeanLeaguesPage from "./TopEuropeanLeagues";
import UpcomingMatchCards from "./UpcomingMatchesCards";

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
        <LiveMatchCard matches={data.sections.live_now} />
        <VIPBanner />
        <UpcomingMatchCards matches={data.sections.starting_soon} />
        <VIPBanner />
        <TopEuropeanLeaguesPage
          topLeagues={data.top_leagues}
          standings={data.popular_teams}
        />
        <VIPBanner />
        <PredictionBanner />
        <VIPBanner />
        <LatestNews news={data.news ?? []} />
      </div>
    </>
  );
};

export default Home;
