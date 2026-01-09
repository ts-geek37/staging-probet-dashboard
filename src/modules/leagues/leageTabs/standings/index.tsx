import React from "react";

import { StandingCard } from "./StandingCard";
import StandingCardSkeleton from "./StandingCardSkeleon";
import useLeagueStandings from "../../hooks/useLeagueStandings";
import LeagueBanner from "../../LeagueBanner";

interface Props {
  id: number;
}

const Standings: React.FC<Props> = ({ id }) => {
  const { standings, isLoading } = useLeagueStandings(id);

  return (
    <div className="flex-1 text-white flex flex-col gap-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <StandingCardSkeleton key={index} />
            ))
          : standings?.map((row) => (
              <StandingCard key={row?.team?.id} row={row} />
            ))}
      </div>

      <LeagueBanner banner="champions" />
    </div>
  );
};

export default Standings;
