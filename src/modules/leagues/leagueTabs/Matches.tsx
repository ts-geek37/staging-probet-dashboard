import React from "react";

import { Ads, NoData } from "@/components";
import MatchListing from "@/components/MatchListing";
import { MatchListStatus } from "@/types/matches";

import { useGeneralLiveMatches } from "@/modules/ws/hooks";
import { useLeagueMatches } from "../hooks";
import LeagueBanner from "../LeagueBanner";

interface Props {
  id: number;
}

const Matches: React.FC<Props> = ({ id }) => {
  const { recentMatches, upcomingMatches, liveMatches, isLoading } =
    useLeagueMatches(id);
  const { data } = useGeneralLiveMatches(liveMatches);
  const liveMatchesData = data.filter((match) => match.league?.id == id);
  if (
    !isLoading &&
    recentMatches.length == 0 &&
    upcomingMatches.length == 0 &&
    liveMatchesData.length == 0
  ) {
    return <NoData message="No matches found for this league." />;
  }
  return (
    <div className="flex-1 text-white flex flex-col gap-4 sm:gap-8 md:gap-12">
      {isLoading ? (
        <MatchListing title="Live Matches" matches={[]} isLoading />
      ) : (
        <div className="flex flex-col gap-4 sm:gap-6">
          <MatchListing
            title="Live Matches"
            matches={liveMatchesData}
            href={`/matches?status=${MatchListStatus.LIVE}&leagueId=${id}`}
          />
          {liveMatchesData.length === 0 && (
            <NoData message="No matches are live at the moment. Live Matches will appear here once matches start." />
          )}
          {liveMatchesData.length > 0 && <Ads />}
        </div>
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
