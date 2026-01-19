"use client";

import React from "react";

import { ApiResponse } from "@/api/types";
import { VIPBanner } from "@/components";
import { HomeResponse } from "@/types/home";

import { LiveScopeEnum } from "../ws/types";
import Banner from "./Banner";
import { Testimonials } from "./components";
import FinishedMatchesCards from "./FinishedMatchesCards";
import { useHome } from "./hooks";
import LatestNews from "./LatestNews";
import LiveMatchCards from "./LiveMatchesCards";
import PredictionBanner from "./PredictionBanner";
import TopLeagues from "./TopLeagues";
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
      <div className="max-w-7xl w-full mx-auto px-4">
        <VIPBanner />
        {data.sections.live_now.length > 0 && (
          <>
            <LiveMatchCards
              initialMatches={data.sections.live_now}
              scopeInfo={{ scope: LiveScopeEnum.GENERAL }}
            />
            <VIPBanner />
          </>
        )}
        {data.sections.starting_soon.length > 0 && (
          <>
            <UpcomingMatchCards matches={data.sections.starting_soon} />
            <VIPBanner />
          </>
        )}
        {data.sections.recently_finished.length > 0 && (
          <>
            <FinishedMatchesCards matches={data.sections.recently_finished} />
            <VIPBanner />
          </>
        )}
        <TopLeagues
          topLeagues={data.top_leagues}
          standings={data.popular_teams}
        />
        <VIPBanner />
        <PredictionBanner />
        <VIPBanner />
        <LatestNews news={data.news ?? []} />
        <Testimonials />
      </div>
    </>
  );
};

export default Home;
