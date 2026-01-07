import React from "react";

import { Ads } from "@/components";
import MatchListing from "@/components/MatchListing";

import { useLeagueMatches } from "../hooks";
import LeagueBanner from "../LeagueBanner";

interface Props {
  id: number;
}

const Matches: React.FC<Props> = ({ id }) => {
  const { recentMatches, upcomingMatches, liveMatches } = useLeagueMatches(id);

  return (
    <div className="flex-1 text-white flex flex-col gap-12">
      {liveMatches.length > 0 && (
        <MatchListing
          title="Live Matches"
          matches={liveMatches}
          mode="recent"
        />
      )}
      <Ads />
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
