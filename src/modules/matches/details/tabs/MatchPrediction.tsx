"use client";

import React from "react";

import { NoData, SkeletonCardLoader } from "@/components";
import { MarketCard } from "@/modules/predictions/components";
import usePredictionDetails from "@/modules/predictions/hooks/usePredictionDetails";

interface Props {
  matchId: number;
}

const MatchPredictionsTab: React.FC<Props> = ({ matchId }) => {
  const { markets, isLoading, error } = usePredictionDetails({
    fixtureId: matchId,
  });

  if (isLoading) {
    return <SkeletonCardLoader />;
  }

  if (error || markets.length === 0) {
    return <NoData message="Predictions not available" />;
  }

  return (
    <section className="space-y-6">
      <div className="border-b border-white/10 pb-4">
        <h2 className="text-xl font-bold text-white">Match Predictions</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {markets.map((market, index) => (
          <MarketCard
            key={`${market.type}-${index}`}
            type={market.type}
            data={market.data}
          />
        ))}
      </div>
    </section>
  );
};

export default MatchPredictionsTab;
