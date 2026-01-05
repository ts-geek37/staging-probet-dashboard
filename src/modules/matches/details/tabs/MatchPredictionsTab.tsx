"use client";

import React from "react";

import { MatchDetailView } from "@/types/matches";
import { useMatchDetail } from "../../hooks";
import MatchPrediction from "../../components/MatchPrediction";
import { NoData, SkeletonCardLoader } from "@/components";

interface Props {
  matchId: number;
}

const MatchPredictionsTab: React.FC<Props> = ({ matchId }) => {
  const { data, isLoading } = useMatchDetail(
    matchId,
    MatchDetailView.PREDICTIONS
  );

 if (isLoading) return <SkeletonCardLoader />;
  if (!data || !("prediction" in data)) return <NoData message="Prediction not available" />;

  const { home_win_probability, draw_probability, away_win_probability } = data.prediction;

  return <MatchPrediction home={home_win_probability} draw={draw_probability} away={away_win_probability} />;
};

export default MatchPredictionsTab;
