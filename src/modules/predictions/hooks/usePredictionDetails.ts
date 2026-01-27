"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import {
  FixturePredictionsResponse,
  FixtureValueBetsResponse,
  FullTimeResultPrediction,
  OverUnderPrediction,
  PredictionMarket,
  PredictionMarketType,
  YesNoPrediction,
} from "@/types/prediction";

interface UsePredictionDetailsParams {
  fixtureId?: number;
}
const isOverUnderMarket = (
  market: PredictionMarket,
): market is Extract<PredictionMarket, { data: OverUnderPrediction }> => {
  return "over" in market.data && "under" in market.data;
};

const usePredictionDetails = ({ fixtureId }: UsePredictionDetailsParams) => {
  const shouldFetch = Boolean(fixtureId);

  const predictionsSWR = useSWR<ApiResponse<FixturePredictionsResponse>>(
    shouldFetch ? `/api/v2/predictions/matches/${fixtureId}` : null,
  );

  const valueBetsSWR = useSWR<ApiResponse<FixtureValueBetsResponse>>(
    shouldFetch ? `/api/v2/predictions/matches/${fixtureId}/value-bets` : null,
  );

  const markets: PredictionMarket[] = predictionsSWR.data?.data?.markets ?? [];

  /* -------------------- Helpers -------------------- */
  const getMarket = <T extends PredictionMarketType>(
    type: T,
  ): Extract<PredictionMarket, { type: T }> | undefined =>
    markets.find(
      (m): m is Extract<PredictionMarket, { type: T }> => m.type === type,
    );

  const extractGoalData = (types: PredictionMarketType[]) =>
    markets
      .filter(
        (m): m is Extract<PredictionMarket, { data: { over: number } }> =>
          types.includes(m.type) && isOverUnderMarket(m),
      )
      .map((m) => {
        const line = m.type.match(/(\d+(\.\d+)?)/)?.[0] ?? "";
        return {
          line,
          over: m.data.over,
        };
      });

  /* -------------------- Key Markets -------------------- */
  const firstHalf = getMarket(PredictionMarketType.FIRST_HALF_WINNER);
  const btts = getMarket(PredictionMarketType.BOTH_TEAMS_TO_SCORE);
  const fullTime = getMarket(PredictionMarketType.FULLTIME_RESULT);
  const teamToScoreFirst = getMarket(PredictionMarketType.TEAM_TO_SCORE_FIRST);

  /* -------------------- Goal Analysis -------------------- */
  const generalGoals = extractGoalData([
    PredictionMarketType.OVER_UNDER_1_5,
    PredictionMarketType.OVER_UNDER_2_5,
    PredictionMarketType.OVER_UNDER_3_5,
    PredictionMarketType.OVER_UNDER_4_5,
  ]);

  const homeGoals = extractGoalData([
    PredictionMarketType.HOME_OVER_UNDER_0_5,
    PredictionMarketType.HOME_OVER_UNDER_1_5,
    PredictionMarketType.HOME_OVER_UNDER_2_5,
    PredictionMarketType.HOME_OVER_UNDER_3_5,
  ]);

  const awayGoals = extractGoalData([
    PredictionMarketType.AWAY_OVER_UNDER_0_5,
    PredictionMarketType.AWAY_OVER_UNDER_1_5,
    PredictionMarketType.AWAY_OVER_UNDER_2_5,
    PredictionMarketType.AWAY_OVER_UNDER_3_5,
  ]);

  const allLines = Array.from(
    new Set([
      ...generalGoals.map((d) => d.line),
      ...homeGoals.map((d) => d.line),
      ...awayGoals.map((d) => d.line),
    ]),
  ).sort((a, b) => Number(a) - Number(b));

  const consolidatedGoalData = allLines.map((line) => ({
    line,
    matchValue: generalGoals.find((d) => d.line === line)?.over ?? 0,
    homeValue: homeGoals.find((d) => d.line === line)?.over ?? 0,
    awayValue: awayGoals.find((d) => d.line === line)?.over ?? 0,
  }));

  /* -------------------- Market Grouping -------------------- */
  const cornerMarkets = markets.filter((m) => m.type.startsWith("Corners"));

  const usedTypes = new Set<PredictionMarketType>(
    [
      PredictionMarketType.BOTH_TEAMS_TO_SCORE,
      PredictionMarketType.OVER_UNDER_2_5,
      PredictionMarketType.FIRST_HALF_WINNER,
      PredictionMarketType.FULLTIME_RESULT,
      PredictionMarketType.TEAM_TO_SCORE_FIRST,
      ...generalGoals.map(() => null),
    ].filter(Boolean) as PredictionMarketType[],
  );

  const otherMarkets = markets.filter((m) => !usedTypes.has(m.type));

  /* -------------------- Final Return -------------------- */
  return {
    isLoading: predictionsSWR.isLoading || valueBetsSWR.isLoading,
    error: predictionsSWR.error || valueBetsSWR.error,

    keyMarkets: {
      firstHalf: {
        home: Number((firstHalf?.data as FullTimeResultPrediction)?.home ?? 0),
        away: Number((firstHalf?.data as FullTimeResultPrediction)?.away ?? 0),
        draw: Number((firstHalf?.data as FullTimeResultPrediction)?.draw ?? 0),
      },
      btts: {
        yes: Number((btts?.data as YesNoPrediction)?.yes ?? 0),
        no: Number((btts?.data as YesNoPrediction)?.no ?? 0),
      },
      fullTime: {
        home: Number((fullTime?.data as FullTimeResultPrediction)?.home ?? 0),
        draw: Number((fullTime?.data as FullTimeResultPrediction)?.draw ?? 0),
        away: Number((fullTime?.data as FullTimeResultPrediction)?.away ?? 0),
      },
      teamToScoreFirst: {
        homeValue: Number(
          (teamToScoreFirst?.data as FullTimeResultPrediction)?.home ?? 0,
        ),
        awayValue: Number(
          (teamToScoreFirst?.data as FullTimeResultPrediction)?.away ?? 0,
        ),
        drawValue: Number(
          (teamToScoreFirst?.data as FullTimeResultPrediction)?.draw ?? 0,
        ),
      },
    },

    goalLines: {
      consolidated: consolidatedGoalData,
    },

    cornerMarkets,
    otherMarkets,
  };
};

export default usePredictionDetails;
