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
      {upcomingMatches && (
        <MatchListing
          title="Upcoming Matches"
          matches={upcomingMatches}
          mode="recent"
        />
      )}
      <LeagueBanner banner="betting" />
      {recentMatches && (
        <MatchListing
          title="Recent Matches"
          matches={recentMatches}
          mode="upcoming"
        />
      )}
    </div>
  );
};

export default Matches;
