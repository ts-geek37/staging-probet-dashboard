import React from "react";

import { NoData, SkeletonCardLoader } from "@/components";
import {
  GoalLineCard,
  KeyOutcomeCard,
  MarketCard,
  OutcomeCard,
} from "@/modules/predictions/components";
import OtherMarketCard from "@/modules/predictions/components/OtherMarketCard";
import PredictionSentenceCard from "@/modules/predictions/components/PredictionSentenceCard";
import usePredictionDetails from "@/modules/predictions/hooks/usePredictionDetails";

import VIPUnlockCard from "../../components/VIPUnlockCard";

interface Team {
  name: string;
}

interface Teams {
  home: Team;
  away: Team;
}

interface Props {
  matchId: number;
  teams: Teams;
}

const MatchPredictionsTab: React.FC<Props> = ({ matchId, teams }) => {
  const {
    isPageLoading,
    error,
    keyMarkets,
    goalLines,
    cornerMarkets,
    otherMarkets,
    predictionSentence,
    doubleChanceData,
    isVip,
  } = usePredictionDetails({ fixtureId: matchId });

  if (isPageLoading) return <SkeletonCardLoader />;
  if (error) return <NoData message="Predictions not available" />;
  if (!isVip) {
    return <VIPUnlockCard />;
  }

  const isNumericMarket = (data: unknown): data is Record<string, number> => {
    if (!data || typeof data !== "object") return false;
    return Object.values(data).every((v) => typeof v === "number");
  };

  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-bold text-white">Match Predictions</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {predictionSentence && (
            <PredictionSentenceCard
              text={predictionSentence}
              homeLabel={teams.home.name}
              awayLabel={teams.away.name}
            />
          )}

          <KeyOutcomeCard
            label="First Half Winner"
            type="ternary"
            homeValue={keyMarkets.firstHalf.home}
            awayValue={keyMarkets.firstHalf.away}
            drawValue={keyMarkets.firstHalf.draw}
            homeLabel={teams.home.name}
            awayLabel={teams.away.name}
          />

          <KeyOutcomeCard
            label="Both Teams To Score"
            type="binary"
            homeValue={keyMarkets.btts.yes}
            awayValue={keyMarkets.btts.no}
            homeLabel="Yes"
            awayLabel="No"
          />

          <KeyOutcomeCard
            label="Team to Score First"
            type="ternary"
            homeValue={keyMarkets.teamToScoreFirst.home}
            awayValue={keyMarkets.teamToScoreFirst.away}
            drawValue={keyMarkets.teamToScoreFirst.draw}
            homeLabel={teams.home.name}
            awayLabel={teams.away.name}
          />
        </div>

        <div className="flex flex-wrap lg:flex-col gap-6">
          <OutcomeCard
            label="Home Win"
            value={keyMarkets.fullTime.home}
            colorClass="text-primary-green"
            teamName={teams.home.name}
          />
          <OutcomeCard
            label="Draw"
            value={keyMarkets.fullTime.draw}
            colorClass="text-primary-yellow"
          />
          <OutcomeCard
            label="Away Win"
            value={keyMarkets.fullTime.away}
            colorClass="text-primary-red"
            teamName={teams.away.name}
          />
        </div>
      </div>

      <h3 className="text-sm sm:text-xl font-bold text-white">
        Goals Overview
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {goalLines.consolidated.map((g) => (
          <GoalLineCard
            key={g.line}
            {...g}
            homeTeamName={teams.home.name}
            awayTeamName={teams.away.name}
          />
        ))}
      </div>

      <h3 className="text-sm sm:text-xl font-bold text-white">
        Corners Overview
      </h3>
      {cornerMarkets.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {cornerMarkets
            .filter((m) => isNumericMarket(m.data))
            .map((m, i) => (
              <MarketCard
                key={i}
                type={m.type}
                data={m.data as Record<string, number>}
              />
            ))}
        </div>
      )}

      <h3 className="text-sm sm:text-xl font-bold text-white">Other Markets</h3>
      {otherMarkets.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherMarkets
            .filter((m) => isNumericMarket(m.data))
            .map((m, i) => (
              <div
                key={i}
                className={i === 0 ? "md:col-span-2" : "md:col-span-1"}
              >
                <OtherMarketCard
                  type={m.type}
                  data={m.data as Record<string, number>}
                />
              </div>
            ))}
          {doubleChanceData.length > 0 && (
            <div>
              {doubleChanceData.map((m, i) => (
                <div
                  key={i}
                  className={i === 0 ? "md:col-span-2" : "md:col-span-1"}
                >
                  <MarketCard type={m.type} data={m.data} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default MatchPredictionsTab;
