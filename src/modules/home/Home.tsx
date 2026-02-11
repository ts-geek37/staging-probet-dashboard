"use client";

import React from "react";

import { ApiResponse } from "@/api/types";
import { VIPBanner } from "@/components";
import { useSubscription } from "@/context";
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
      news,
    },
    topLeagues,
    popularTeams,
    isLoading,
  } = useHome(initialHome);
  const { isVip } = useSubscription();

  return (
    <>
      <Banner />
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6">
        {!isVip && (
          <div className="pb-5 sm:pb-10 pt-5 sm:pt-15">
            <VIPBanner />
          </div>
        )}
        {live_now.length > 0 && (
          <>
            <LiveMatchCards
              initialMatches={live_now}
              title="Live Matches"
              href={`/matches?status=${MatchListStatus.LIVE}`}
              scopeInfo={{ scope: LiveScopeEnum.GENERAL }}
              className="py-10 md:py-20"
              limit={3}
            />
          </>
        )}

        {starting_soon.length > 0 && (
          <>
            <UpcomingMatchCards matches={starting_soon} />
          </>
        )}

        {recently_finished.length > 0 && (
          <>
            <FinishedMatchesCards matches={recently_finished} />
          </>
        )}

        <AccuratePredictions
          predictions={accuratePredictions}
          isLoading={isLoading}
        />

        <TopLeagues topLeagues={topLeagues} standings={popularTeams} />
        <PredictionBanner />

        {news?.length > 0 && <LatestNews news={news} />}
        {!isVip && (
          <div className="pb-5 sm:pb-10 pt-5 sm:pt-15">
            <VIPBanner />
          </div>
        )}

        <Testimonials />
      </div>
    </>
  );
};

export default Home;
