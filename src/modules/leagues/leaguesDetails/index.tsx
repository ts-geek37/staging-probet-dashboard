"use client";

import { ApiResponse } from "@/api/types";
import { LeagueProfileResponse } from "@/types/leagues";

import LeagueOverView from "./LeagueOverView";
import TabList from "./TabList";

interface Props {
  initialLeagues: ApiResponse<LeagueProfileResponse>;
}
const LeaguesDetails: React.FC<Props> = ({ initialLeagues }) => {
  const league = initialLeagues?.data;
  const leagueId = league?.id;

  return (
    <div className="flex-1 flex flex-col gap-8 max-w-7xl mx-auto w-full px-4 py-12  ">
      {league && <LeagueOverView initialLeagues={initialLeagues} />}
      {leagueId && <TabList league={league} />}
    </div>
  );
};

export default LeaguesDetails;
