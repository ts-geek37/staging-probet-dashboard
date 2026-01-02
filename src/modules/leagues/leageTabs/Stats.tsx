import React from "react";

import { useLeagueStats } from "../hooks";

interface Props {
  id: number;
}

const Stats: React.FC<Props> = ({ id }) => {
  const { stats } = useLeagueStats(id);

  return (
    <div className="space-y-4 text-white">
      <h2 className="text-xl font-semibold">Stats</h2>
    </div>
  );
};

export default Stats;
