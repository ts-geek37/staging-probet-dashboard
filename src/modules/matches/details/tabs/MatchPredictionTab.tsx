import React from "react";

import { NoData, SkeletonCardLoader } from "@/components";
import {
  GoalLineCard,
  KeyOutcomeCard,
  MarketCard,
  OutcomeCard,
} from "@/modules/predictions/components";
import PredictionSentenceCard from "@/modules/predictions/components/PredictionSentenceCard";
import usePredictionDetails from "@/modules/predictions/hooks/usePredictionDetails";

interface Props {
  matchId: number;
  homeTeam?: string;
  awayTeam?: string;
}

const MatchPredictionsTab: React.FC<Props> = ({
  matchId,
  homeTeam = "HOME",
  awayTeam = "AWAY",
}) => {
  const {
    isLoading,
    error,
    keyMarkets,
    goalLines,
    cornerMarkets,
    otherMarkets,
  } = usePredictionDetails({ fixtureId: matchId });

  if (isLoading) return <SkeletonCardLoader />;
  if (error) return <NoData message="Predictions not available" />;

  return (
    <section className="space-y-10">
      <h2 className="text-2xl font-bold text-white">Match Predictions</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PredictionSentenceCard
            fixtureId={matchId}
            homeTeam={homeTeam}
            awayTeam={awayTeam}
          />

          <KeyOutcomeCard
            label="First Half Winner"
            type="ternary"
            homeValue={keyMarkets.firstHalf.home}
            awayValue={keyMarkets.firstHalf.away}
            drawValue={keyMarkets.firstHalf.draw}
          />

          <KeyOutcomeCard
            label="Both Teams To Score"
            type="binary"
            homeValue={keyMarkets.btts.yes}
            awayValue={keyMarkets.btts.no}
          />
          <KeyOutcomeCard
            label="Team To Score First"
            type="ternary" // or binary depending on API
            {...keyMarkets.teamToScoreFirst}
          />
        </div>

        <div className="flex flex-wrap lg:flex-col gap-6">
          <OutcomeCard
            label="Home Win"
            value={keyMarkets.fullTime.home}
            colorClass={"text-primary-green"}
          />
          <OutcomeCard
            label="Draw"
            value={keyMarkets.fullTime.draw}
            colorClass={"text-primary-yellow"}
          />
          <OutcomeCard
            label="Away Win"
            value={keyMarkets.fullTime.away}
            colorClass={"text-primary-red"}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {goalLines.consolidated.map((g) => (
          <GoalLineCard key={g.line} {...g} />
        ))}
      </div>

      {cornerMarkets.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {cornerMarkets.map((m, i) => (
            <MarketCard key={i} {...m} />
          ))}
        </div>
      )}

      {otherMarkets.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherMarkets.map((m, i) => (
            <MarketCard key={i} {...m} />
          ))}
        </div>
      )}
    </section>
  );
};

export default MatchPredictionsTab;
