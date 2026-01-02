"use client";

import React from "react";
import { MatchDetailView } from "@/types/matches";
import { useMatchDetail } from "../../hooks";

interface Props {
  matchId: number;
}

const MatchPredictionsTab: React.FC<Props> = ({ matchId }) => {
  const { data, isLoading } = useMatchDetail(
    matchId,
    MatchDetailView.PREDICTIONS,
  );

  if (isLoading) return <p>Loading predictions…</p>;
  if (!data || !("prediction" in data)) return <p>No predictions available</p>;

  return <pre>{JSON.stringify(data.prediction, null, 2)}</pre>;
};

export default MatchPredictionsTab;
