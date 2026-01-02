"use client";

import React from "react";

import { MatchDetailView } from "@/types/matches";

import { useMatchDetail } from "../../hooks";

interface Props {
  matchId: number;
}

const MatchStatsTab: React.FC<Props> = ({ matchId }) => {
  const { data, isLoading, error } = useMatchDetail(
    matchId,
    MatchDetailView.STATS,
  );

  if (isLoading) return <p>Loading stats…</p>;
  if (error || !data || !("statistics" in data))
    return <p>No stats available</p>;

  return <pre>{JSON.stringify(data.statistics, null, 2)}</pre>;
};

export default MatchStatsTab;
