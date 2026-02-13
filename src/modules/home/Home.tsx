"use client";

import React from "react";
import { ApiResponse } from "@/api/types";
import { Banner, VIPBanner } from "@/components";
import { useSubscription } from "@/context";
import { HomeResponse } from "@/types/home";
import { MatchListStatus } from "@/types/matches";

import AccuratePredictions from "./AccuratePredictions";
import HomeBanner from "./Banner";
import { Testimonials } from "./components";
import FinishedMatchesCards from "./FinishedMatchesCards";
import { useHome } from "./hooks";
import LatestNews from "./LatestNews";
import LiveMatchCards from "./LiveMatchesCards";
import PredictionBanner from "./PredictionBanner";
import TopLeagues from "./TopLeagues";
import UpcomingMatchCards from "./UpcomingMatchesCards";
import { LiveScopeEnum } from "../ws/types";
import FootballBanner from "@/components/FootBallBanner";

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
      <HomeBanner />

      <div className="relative w-full">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-bg via-transparent to-primary-bg opacity-90 -z-10" />

        <div className="relative max-w-7xl w-full mx-auto px-4 sm:px-6">
          {!isVip && (
            <div className="pb-5 sm:pb-10 pt-5 sm:pt-15">
              <VIPBanner />
            </div>
          )}
          <div className="relative w-full">
            <div className="relative max-w-7xl w-full mx-auto ">
              {live_now.length > 0 && (
                <LiveMatchCards
                  initialMatches={live_now}
                  title="Live Matches"
                  href={`/matches?status=${MatchListStatus.LIVE}`}
                  scopeInfo={{ scope: LiveScopeEnum.GENERAL }}
                  className="py-5 md:py-10"
                  limit={3}
                />
              )}

              {starting_soon.length > 0 && (
                <UpcomingMatchCards matches={starting_soon} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full">
        <div className="hidden xl:block absolute inset-0 -z-10 w-full">
          <FootballBanner />
        </div>

        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6">
          {recently_finished.length > 0 && (
            <FinishedMatchesCards matches={recently_finished} />
          )}

          <AccuratePredictions
            predictions={accuratePredictions}
            isLoading={isLoading}
          />

          <div className="absolute inset-0 -z-10 w-full"></div>
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6">
        <PredictionBanner />
        <TopLeagues topLeagues={topLeagues} standings={popularTeams} />
        {news?.length > 0 && <LatestNews news={news} />}

        {!isVip && (
          <div className="pb-5 sm:pb-10 pt-5 sm:pt-15">
            <VIPBanner />
          </div>
        )}
      </div>

      <div className="w-full relative">
        <FootballBanner variant="left">
          <div className="w-full">
            <Testimonials />
          </div>
        </FootballBanner>
      </div>
    </>
  );
};

export default Home;
