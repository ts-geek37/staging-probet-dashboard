import React from "react";

import MatchListing from "@/components/MatchListing";

import { useLeagueMatches } from "../hooks";
import LeagueBanner from "../LeagueBanner";

interface Props {
  id: number;
}

const Matches: React.FC<Props> = ({ id }) => {
  const { recentMatches, upcomingMatches } = useLeagueMatches(id);

  return (
    <div className="flex-1 text-white flex flex-col gap-12">
      {upcomingMatches.length > 0 && (
        <MatchListing
          title="Upcoming Matches"
          matches={upcomingMatches}
          mode="upcoming"
        />
      )}
      <LeagueBanner banner="betting" />
      {recentMatches.length > 0 && (
        <MatchListing
          title="Recent Matches"
          matches={recentMatches}
          mode="recent"
        />
      )}
    </div>
  );
};

export default Matches;
