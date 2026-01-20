import React from "react";

import StandingsTable from "./StandingsTable";
import useLeagueStandings from "../../hooks/useLeagueStandings";
import LeagueBanner from "../../LeagueBanner";

interface Props {
  id: number;
}

const Standings: React.FC<Props> = ({ id }) => {
  const { standings } = useLeagueStandings(id);

  return (
    <div className="flex-1 text-white flex flex-col gap-12">
      <StandingsTable standings={standings || []} />
      <LeagueBanner banner="champions" />
    </div>
  );
};

export default Standings;
