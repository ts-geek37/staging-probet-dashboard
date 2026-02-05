import React from "react";

import { Ads, NoData } from "@/components";
import MatchListing from "@/components/MatchListing";
import { MatchListStatus } from "@/types/matches";

import { useLeagueMatches } from "../hooks";
import LeagueBanner from "../LeagueBanner";

interface Props {
  id: number;
}

const Matches: React.FC<Props> = ({ id }) => {
  const { recentMatches, upcomingMatches, liveMatches, isLoading } =
    useLeagueMatches(id);
  if (
    !isLoading &&
    recentMatches.length == 0 &&
    upcomingMatches.length == 0 &&
    liveMatches.length == 0
  ) {
    return <NoData message="No matches found for this league." />;
  }
  return (
    <div className="flex-1 text-white flex flex-col gap-4 sm:gap-8 md:gap-12">
      {isLoading ? (
        <MatchListing title="Live Matches" matches={[]} isLoading />
      ) : (
        liveMatches.length > 0 && (
          <>
            <MatchListing
              title="Live Matches"
              matches={liveMatches}
              href={`/matches?status=${MatchListStatus.LIVE}&leagueId=${id}`}
            />
            <Ads />
          </>
        )
      )}

      {isLoading ? (
        <MatchListing title="Upcoming Matches" matches={[]} isLoading />
      ) : (
        upcomingMatches.length > 0 && (
          <>
            <MatchListing
              title="Upcoming Matches"
              matches={upcomingMatches}
              href={`/matches?status=${MatchListStatus.UPCOMING}&leagueId=${id}`}
            />
          </>
        )
      )}

      <LeagueBanner banner="betting" />

      {isLoading ? (
        <MatchListing title="Recent Matches" matches={[]} isLoading />
      ) : (
        recentMatches.length > 0 && (
          <MatchListing
            title="Recent Matches"
            matches={recentMatches}
            href={`/matches?status=${MatchListStatus.FINISHED}&leagueId=${id}`}
          />
        )
      )}
    </div>
  );
};

export default Matches;
