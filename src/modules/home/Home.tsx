import React from "react";

import Banner from "./Banner";
import LiveMatchCard from "./LiveMatchCards";
import UpcomingMatchCards from "./UpcomingMatchCards";

const Home: React.FC = () => (
  <>
    <Banner />
    <LiveMatchCard />
    <UpcomingMatchCards />
  </>
);

export default Home;
