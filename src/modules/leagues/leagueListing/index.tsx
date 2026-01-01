"use client";

import { M_PLUS_1 } from "next/font/google";

import { ApiResponse } from "@/api/types";
import { LeagueListResponse } from "@/types/leagues";

import { useLeagues } from "../hooks";
import LeagueCard from "./LeagueCard";
import LeagueCardSkeleton from "./LeagueCardSkeleton";

interface Props {
  initialLeagues: ApiResponse<LeagueListResponse>;
}

const LeagueListing: React.FC<Props> = ({ initialLeagues }) => {
  const { leagues, isLoading } = useLeagues(1, 20, initialLeagues);

  const handleLeagueClick = (leagueId: number) => {
    console.log(`Navigate to /leagues/${leagueId}`);
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="text-white flex flex-col gap-2">
        <h1 className="text-4xl font-bold mb-2">European Leagues</h1>
        <p>
          Explore standings, matches, and statistics for top European football
          leagues.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <LeagueCardSkeleton key={index} />
            ))
          : leagues.map((league) => (
              <LeagueCard
                key={league.id}
                league={league}
                onClick={() => handleLeagueClick(league.id)}
              />
            ))}
      </div>
    </div>
  );
};

export default LeagueListing;
