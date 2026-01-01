"use client";

import { ApiResponse } from "@/api/types";
import { LeagueResponse } from "@/types/leagues";

import { LeaguesProvider } from "../provider";
import LeagueOverView from "./LeagueOverView";
import TabList from "./TabList";

interface Props {
  initialLeagues: ApiResponse<LeagueResponse>;
}
const LeaguesDetails: React.FC<Props> = ({ initialLeagues }) => {
  const league = initialLeagues?.data?.league;
  return (
    <LeaguesProvider initialLeagues={initialLeagues}>
      <div className="flex-1 flex flex-col gap-8 max-w-7xl mx-auto w-full py-8">
        {league && <LeagueOverView league={league} />}
        <TabList />
      </div>
    </LeaguesProvider>
  );
};

export default LeaguesDetails;
