import React from "react";

import { NoData, SkeletonCardLoader } from "@/components";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  GoalLineCard,
  KeyOutcomeCard,
  OutcomeCard,
  OtherMarketCard,
  PredictionSentenceCard,
  MarketPieChart,
  DoubleChanceCard,
} from "@/modules/predictions/components";
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
    hasContent,
  } = usePredictionDetails({ fixtureId: matchId });

  if (isPageLoading) return <SkeletonCardLoader />;
  if (error) return <NoData message="Predictions not available" />;
  if (!isVip) return <VIPUnlockCard />;

  const isNumericMarket = (data: unknown): data is Record<string, number> =>
    !!data &&
    typeof data === "object" &&
    Object.values(data).every((v) => typeof v === "number");

  const hasValidValues = (data: Record<string, number> | undefined) =>
    data && Object.values(data).some((v) => v > 0);

  if (!hasContent) return <NoData message="Predictions not available" />;

  return (
    <section className="space-y-8">
      {predictionSentence && predictionSentence.trim().length > 0 && (
        <PredictionSentenceCard
          text={predictionSentence}
          homeLabel={teams.home.name}
          awayLabel={teams.away.name}
        />
      )}

      {keyMarkets && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {keyMarkets.firstHalf &&
              Object.values(keyMarkets.firstHalf).some((v) => v > 0) && (
                <KeyOutcomeCard
                  label="First Half Winner"
                  type="ternary"
                  homeValue={keyMarkets.firstHalf.home}
                  awayValue={keyMarkets.firstHalf.away}
                  drawValue={keyMarkets.firstHalf.draw}
                  homeLabel={teams.home.name}
                  awayLabel={teams.away.name}
                />
              )}

            {keyMarkets.btts && hasValidValues(keyMarkets.btts) && (
              <KeyOutcomeCard
                label="Both Teams To Score"
                type="binary"
                homeValue={keyMarkets.btts.yes}
                awayValue={keyMarkets.btts.no}
                homeLabel="Yes"
                awayLabel="No"
              />
            )}

            {keyMarkets.teamToScoreFirst &&
              Object.values(keyMarkets.teamToScoreFirst).some((v) => v > 0) && (
                <KeyOutcomeCard
                  label="Team to Score First"
                  type="ternary"
                  homeValue={keyMarkets.teamToScoreFirst.home}
                  awayValue={keyMarkets.teamToScoreFirst.away}
                  drawValue={keyMarkets.teamToScoreFirst.draw}
                  homeLabel={teams.home.name}
                  awayLabel={teams.away.name}
                />
              )}
          </div>

          <div className="flex flex-wrap lg:flex-col gap-6">
            {keyMarkets.fullTime?.home > 0 && (
              <OutcomeCard
                label="Home Win"
                value={keyMarkets.fullTime.home}
                colorClass="text-primary-green"
                teamName={teams.home.name}
              />
            )}
            {keyMarkets.fullTime?.draw > 0 && (
              <OutcomeCard
                label="Draw"
                value={keyMarkets.fullTime.draw}
                colorClass="text-primary-yellow"
              />
            )}
            {keyMarkets.fullTime?.away > 0 && (
              <OutcomeCard
                label="Away Win"
                value={keyMarkets.fullTime.away}
                colorClass="text-primary-red"
                teamName={teams.away.name}
              />
            )}
          </div>
        </div>
      )}

      {goalLines?.consolidated?.length > 0 && (
        <>
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
        </>
      )}

      {cornerMarkets?.filter(
        (m) => isNumericMarket(m.data) && hasValidValues(m.data),
      ).length > 0 && (
        <>
          <h3 className="text-sm sm:text-xl font-bold text-white">
            Corners Overview
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cornerMarkets
              .filter((m) => isNumericMarket(m.data) && hasValidValues(m.data))
              .map((m, i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-semibold text-white truncate border-l-2 border-primary-green pl-2">
                      {m.type.replace(/Probability/gi, "").trim()}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <MarketPieChart
                      data={Object.entries(m.data as Record<string, number>)}
                    />
                  </CardContent>
                </Card>
              ))}
          </div>
        </>
      )}

      {(otherMarkets?.filter(
        (m) => isNumericMarket(m.data) && hasValidValues(m.data),
      ).length > 0 ||
        doubleChanceData?.length > 0) && (
        <>
          <h3 className="text-sm sm:text-xl font-bold text-white">
            Other Markets
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherMarkets
              .filter((m) => isNumericMarket(m.data) && hasValidValues(m.data))
              .map((m, i) => (
                <div
                  key={i}
                  className="md:col-span-2 w-full min-w-0 flex flex-col h-full"
                >
                  <OtherMarketCard
                    type={m.type}
                    data={m.data as Record<string, number>}
                  />
                </div>
              ))}

            {doubleChanceData?.length > 0 && (
              <div className="md:col-span-1 w-full flex flex-col h-full">
                <DoubleChanceCard data={doubleChanceData} />
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default MatchPredictionsTab;
