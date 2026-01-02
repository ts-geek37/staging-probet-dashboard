import React from "react";

import { useLeagueTeams } from "../hooks";

interface Props {
  id: number;
}

const Teams: React.FC<Props> = ({ id }) => {
  const { teams } = useLeagueTeams(id);
  return (
    <div className="space-y-4 text-white">
      <h2 className="text-xl font-semibold">Teams</h2>
    </div>
  );
};

export default Teams;
