"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { NoData, SkeletonCardLoader } from "@/components";
import { MatchEventsResponse } from "@/types/matches";
import MatchEvents from "../../components/MatchEvents";
import useMatchDetail from "../../hooks/useMatchDetail";

interface Props {
  matchId: number;
}

const MatchEventsTab: React.FC<Props> = ({ matchId }) => {
  const { data, isLoading } = useMatchDetail(matchId, "events");
  const eventsData = data as MatchEventsResponse | undefined;

  if (isLoading) return <SkeletonCardLoader />;
  if (!eventsData?.events.length) return <NoData message="No events recorded for this match" />;

  return (
    <div className="max-w-7xl mx-auto py-4">
      <div className="flex items-center justify-between mb-6 px-2">
        <h3 className="text-lg font-bold text-white tracking-tight">Match Timeline</h3>
        <span className="text-sm text-white bg-[#14181F] px-3 py-1 rounded-xl">
          {eventsData.events.length} Events
        </span>
      </div>

      <Card className="bg-[#14181F]  border border-primary-gray/20 py-3">
        <div className="divide-y divide-gray-800/50">
          {eventsData.events.map((event) => (
            <MatchEvents key={event.id} event={event} />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default MatchEventsTab;
