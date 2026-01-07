import Image from "next/image";
import React from "react";

import { ApiResponse } from "@/api/types";
import MatchListing from "@/components/MatchListing";
import { LeagueProfileResponse } from "@/types/leagues";

import { overviewStats } from "../constant";
import { useLeagueOverview } from "../hooks";
import LeagueBanner from "../LeagueBanner";

interface Props {
  initialLeagues: ApiResponse<LeagueProfileResponse>;
}

const Overview: React.FC<Props> = ({ initialLeagues }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="flex flex-col gap-2"></div>

          <div className="grid grid-cols-2 xl:grid-cols-4 justify-center items-center gap-2 sm:gap-4"></div>
        </div>

        <div className="md:col-span-1"></div>
      </div>
      {/* It's Image */}
      <LeagueBanner banner="betting" />
    </div>
  );
};

export default Overview;
