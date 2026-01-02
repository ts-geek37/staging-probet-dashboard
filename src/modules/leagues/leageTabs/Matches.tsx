import React from "react";

import { useLeagueMatches } from "../hooks";

interface Props {
  id: number;
}

const Matches: React.FC<Props> = ({ id }) => {
  const { matches } = useLeagueMatches(id);

  return (
    <div className="space-y-4 text-white">
      <h2 className="text-xl font-semibold">Matches</h2>
    </div>
  );
};

export default Matches;
