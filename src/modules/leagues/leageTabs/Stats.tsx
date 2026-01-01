import { LeagueStats } from "@/types/leagues";
import React from "react";

interface Props {
  data?: LeagueStats;
}

const Stats: React.FC<Props> = ({ data }) => {
  return (
    <div className="space-y-4 text-white">
      <h2 className="text-xl font-semibold">Stats</h2>
    </div>
  );
};

export default Stats;
