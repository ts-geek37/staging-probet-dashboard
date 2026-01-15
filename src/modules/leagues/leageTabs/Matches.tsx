import React from "react";

import { Ads } from "@/components";
import MatchListing from "@/components/MatchListing";

import { useLeagueMatches } from "../hooks";
import LeagueBanner from "../LeagueBanner";

interface Props {
  id: number;
}

const Matches: React.FC<Props> = ({ id }) => {
  const { recentMatches, upcomingMatches, liveMatches, isLoading } =
    useLeagueMatches(id);

  return (
    <div className="flex-1 text-white flex flex-col gap-4 sm:gap-8 md:gap-12">
      {isLoading ? (
        <MatchListing
          title="Live Matches"
          matches={[]}
          mode="recent"
          isLoading
        />
      ) : (
        liveMatches.length > 0 && (
          <MatchListing
            title="Live Matches"
            matches={liveMatches}
            mode="recent"
            BadgeText="Live"
          />
        )
      )}

      <Ads />

      {isLoading ? (
        <MatchListing
          title="Upcoming Matches"
          matches={[]}
          mode="upcoming"
          isLoading
        />
      ) : (
        upcomingMatches.length > 0 && (
          <MatchListing
            title="Upcoming Matches"
            matches={upcomingMatches}
            mode="upcoming"
          />
        )
      )}

      <LeagueBanner banner="betting" />

      {isLoading ? (
        <MatchListing
          title="Recent Matches"
          matches={[]}
          mode="recent"
          isLoading
        />
      ) : (
        recentMatches.length > 0 && (
          <MatchListing
            title="Recent Matches"
            matches={recentMatches}
            mode="recent"
          />
        )
      )}
    </div>
  );
};

export default Matches;
