"use client";

import React from "react";

import { ApiResponse } from "@/api/types";
import { VIPBanner } from "@/components";
import { HomeResponse } from "@/types/home";
import { MatchListStatus } from "@/types/matches";

import AccuratePredictions from "./AccuratePredictions";
import Banner from "./Banner";
import { Testimonials } from "./components";
import FinishedMatchesCards from "./FinishedMatchesCards";
import { useHome } from "./hooks";
import LatestNews from "./LatestNews";
import LiveMatchCards from "./LiveMatchesCards";
import PredictionBanner from "./PredictionBanner";
import TopLeagues from "./TopLeagues";
import UpcomingMatchCards from "./UpcomingMatchesCards";
import { LiveScopeEnum } from "../ws/types";

interface Props {
  initialHome: ApiResponse<HomeResponse>;
}

const Home: React.FC<Props> = ({ initialHome }) => {
  const {
    sections: {
      live_now,
      starting_soon,
      recently_finished,
      accuratePredictions,
    },
    topLeagues,
    popularTeams,
    news,
    isLoading,
  } = useHome(initialHome);

  return (
    <>
      <Banner />
      <div className="max-w-7xl w-full mx-auto px-4">
        <VIPBanner />

        {live_now.length > 0 && (
          <>
            <LiveMatchCards
              initialMatches={live_now}
              href={`/matches?status=${MatchListStatus.LIVE}`}
              scopeInfo={{ scope: LiveScopeEnum.GENERAL }}
              className="py-10 md:py-20"
              limit={6}
            />
            <VIPBanner />
          </>
        )}

        {starting_soon.length > 0 && (
          <>
            <UpcomingMatchCards matches={starting_soon} />
            <VIPBanner />
          </>
        )}

        {recently_finished.length > 0 && (
          <>
            <FinishedMatchesCards matches={recently_finished} />
            <VIPBanner />
          </>
        )}

        <TopLeagues topLeagues={topLeagues} standings={popularTeams} />

        <VIPBanner />
        <PredictionBanner />
        <VIPBanner />
        <AccuratePredictions
          predictions={accuratePredictions}
          isLoading={isLoading}
        />

        <LatestNews news={news} />
        <Testimonials />
      </div>
    </>
  );
};

export default Home;
