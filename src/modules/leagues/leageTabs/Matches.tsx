import { LeagueMatches } from "@/types/leagues";
import React from "react";

interface Props {
  data?: LeagueMatches;
}

const Matches: React.FC<Props> = ({ data }) => {
  return (
    <div className="space-y-4 text-white">
      <h2 className="text-xl font-semibold">Matches</h2>
    </div>
  );
};

export default Matches;
