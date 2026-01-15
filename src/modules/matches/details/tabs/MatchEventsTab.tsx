"use client";

import React from "react";

import { NoData, SkeletonCardLoader } from "@/components";
import { Card } from "@/components/ui/card";
import { MatchEventsResponse, MatchDetailView } from "@/types/matches";

import { MatchEvents } from "../../components";
import useMatchDetail from "../../hooks/useMatchDetail";

interface Props {
  matchId: number;
}

const MatchEventsTab: React.FC<Props> = ({ matchId }) => {
  const { data, isLoading } = useMatchDetail(matchId, MatchDetailView.EVENTS);
  const eventsData = data as MatchEventsResponse;

  if (isLoading) return <SkeletonCardLoader />;
  if (!eventsData?.events.length)
    return <NoData message="No events recorded for this match" />;

  return (
    <>
      <div className="flex items-center justify-between mb-6 px-2">
        <h3 className="text-lg font-bold text-white tracking-tight">
          Match Timeline
        </h3>
        <span className="text-sm text-white bg-[#14181F] px-3 py-1 rounded-xl">
          {eventsData.events.length} Events
        </span>
      </div>

      <Card className="border border-primary-gray/20 py-0">
        <div className="divide-y divide-primary-gray/20">
          {eventsData.events.map((event, index) => (
            <MatchEvents key={event.id} event={event} index={index} />
          ))}
        </div>
      </Card>
    </>
  );
};

export default MatchEventsTab;
