"use client";

import React from "react";

import { NoData, SkeletonCardLoader } from "@/components";
import { Card } from "@/components/ui/card";
import { useLiveMatchEvents } from "@/modules/ws/hooks";
import { MatchDetailView, MatchEventsResponse } from "@/types/matches";

import { MatchEvents } from "../../components";
import useMatchDetail from "../../hooks/useMatchDetail";

interface Props {
  matchId: number;
  isLive: boolean;
}

const MatchEventsTab: React.FC<Props> = ({ matchId, isLive }) => {
  const { data, isLoading } = useMatchDetail(matchId, MatchDetailView.EVENTS);

  const eventsData = data as MatchEventsResponse | null;

  const { events: liveEvents, loading: liveLoading } = useLiveMatchEvents({
    matchId,
    enabled: isLive,
  });

  const events = isLive ? liveEvents : (eventsData?.events ?? []);

  const loading = isLive ? liveLoading : isLoading;

  if (loading) return <SkeletonCardLoader />;

  if (!events?.length) {
    return <NoData message="No events recorded for this match" />;
  }

  const sortedEvents = [...events].sort((a, b) => {
    const aTime = (a?.minute ?? 0) + (a?.extra_minute ?? 0);
    const bTime = (b?.minute ?? 0) + (b?.extra_minute ?? 0);
    return bTime - aTime;
  });

  return (
    <>
      <div className="flex items-center justify-between mb-6 px-2">
        <h3 className="text-lg font-bold text-white tracking-tight">
          Match Timeline
        </h3>
        <span className="text-sm text-white bg-[#14181F] px-3 py-1 rounded-xl">
          {events?.length} Events
        </span>
      </div>

      <Card className="border border-primary-gray/20 py-0">
        <div className="divide-y divide-primary-gray/20">
          {sortedEvents.map((event, index) => (
            <MatchEvents key={event.id} event={event} index={index} />
          ))}
        </div>
      </Card>
    </>
  );
};

export default MatchEventsTab;
