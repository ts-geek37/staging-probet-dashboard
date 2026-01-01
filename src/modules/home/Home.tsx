"use client";

import React from "react";

import { ApiResponse } from "@/api/types";
import { HomeResponse } from "@/types/home";

import { VIPBanner } from "@/components";
import Banner from "./Banner";
import LiveMatchCard from "./LiveMatchCards";
import UpcomingMatchCards from "./UpcomingMatchCards";
import { useHome } from "./hooks";

interface Props {
  initialHome: ApiResponse<HomeResponse>;
}

const Home: React.FC<Props> = ({ initialHome }) => {
  const { data } = useHome(initialHome);

  if (!data) return null;

  return (
    <>
      <Banner />
      <VIPBanner />
      <LiveMatchCard matches={data.live_matches} />
      <VIPBanner />
      <UpcomingMatchCards matches={data.upcoming_matches} />
      <VIPBanner />
    </>
  );
};

export default Home;
