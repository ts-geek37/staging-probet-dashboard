"use client";

import React from "react";
import { MatchDetailView } from "@/types/matches";
import { useMatchDetail } from "../../hooks";

interface Props {
  matchId: number;
}

const MatchLineupsTab: React.FC<Props> = ({ matchId }) => {
  const { data, isLoading } = useMatchDetail(matchId, MatchDetailView.LINEUPS);

  if (isLoading) return <p>Loading lineups…</p>;
  if (!data || !("lineups" in data)) return <p>No lineup data</p>;

  return <pre>{JSON.stringify(data.lineups, null, 2)}</pre>;
};

export default MatchLineupsTab;
