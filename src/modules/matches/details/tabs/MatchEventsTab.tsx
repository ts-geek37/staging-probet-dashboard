"use client";

import React from "react";
import { MatchDetailView, MatchEventsResponse } from "@/types/matches";
import useMatchDetail from "../../hooks/useMatchDetail";
import { NoData, SkeletonCardLoader } from "@/components";
import MatchEvents from "../../components/MatchEvents";

interface Props {
  matchId: number;
}

const MatchEventsTab: React.FC<Props> = ({ matchId }) => {
  const { data, isLoading } = useMatchDetail(matchId, MatchDetailView.EVENTS);

  const eventsData = data as MatchEventsResponse | undefined;

  if (isLoading) return <SkeletonCardLoader />;
  if (!eventsData ) return <NoData message="Events not available" />;

  return (
    <div className="bg-[#14181F] border border-primary-gray/20 rounded-xl p-4 space-y-2">
      <h3 className="text-white font-semibold mb-4">Match Events</h3>

      {eventsData.events.map((event) => (
        <MatchEvents
          key={event.id}
          event={event}
          homeTeamId={eventsData.home_team.id}
          homeTeamName={eventsData.home_team.name}
          awayTeamName={eventsData.away_team.name}
        />
      ))}
    </div>
  );
};

export default MatchEventsTab;
