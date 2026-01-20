import React from "react";

import { Ads } from "@/components";
import MatchListing from "@/components/MatchListing";
import LiveMatchCards from "@/modules/home/LiveMatchesCards";
import { LiveScopeEnum } from "@/modules/ws/types";

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
      <LiveMatchCards
        initialMatches={liveMatches}
        scopeInfo={{ scope: LiveScopeEnum.LEAGUE, id }}
      />
      {isLoading ? (
        <MatchListing title="Live Matches" matches={[]} isLoading />
      ) : (
        liveMatches.length > 0 && (
          <MatchListing title="Live Matches" matches={liveMatches} />
        )
      )}

      <Ads />

      {isLoading ? (
        <MatchListing title="Upcoming Matches" matches={[]} isLoading />
      ) : (
        upcomingMatches.length > 0 && (
          <MatchListing title="Upcoming Matches" matches={upcomingMatches} />
        )
      )}

      <LeagueBanner banner="betting" />

      {isLoading ? (
        <MatchListing title="Recent Matches" matches={[]} isLoading />
      ) : (
        recentMatches.length > 0 && (
          <MatchListing title="Recent Matches" matches={recentMatches} />
        )
      )}
    </div>
  );
};

export default Matches;
