"use client";

import React from "react";
import { MatchDetailView } from "@/types/matches";
import { useMatchDetail } from "../../hooks";

interface Props {
  matchId: number;
}

const MatchEventsTab: React.FC<Props> = ({ matchId }) => {
  const { data, isLoading } = useMatchDetail(matchId, MatchDetailView.EVENTS);

  if (isLoading) return <p>Loading events…</p>;
  if (!data || !("events" in data)) return <p>No events</p>;

  return <pre>{JSON.stringify(data.events, null, 2)}</pre>;
};

export default MatchEventsTab;
