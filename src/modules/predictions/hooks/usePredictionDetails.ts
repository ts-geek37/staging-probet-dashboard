"use client";

import useSWR from "swr";
import { ApiResponse } from "@/api/types";
import {
  FixturePredictionsResponse,
  FixtureValueBetsResponse,
} from "@/types/prediction";

interface UsePredictionDetailsParams {
  fixtureId?: number;
}

const usePredictionDetails = ({ fixtureId }: UsePredictionDetailsParams) => {
  const shouldFetch = Boolean(fixtureId);

  const predictionsSWR = useSWR<ApiResponse<FixturePredictionsResponse>>(
    shouldFetch ? `/api/v2/predictions/matches/${fixtureId}` : null
  );

  const valueBetsSWR = useSWR<ApiResponse<FixtureValueBetsResponse>>(
    shouldFetch ? `/api/v2/predictions/matches/${fixtureId}/value-bets` : null
  );

  const markets = predictionsSWR.data?.data?.markets ?? [];

  /* -------------------- Helpers -------------------- */
  const getMarket = (type: string) => markets.find((m) => m.type === type);

  const extractGoalData = (prefix: string) =>
    markets
      .filter((m) => m.type.startsWith(prefix) && m.type.includes("Probability"))
      .map((m) => {
        const parts = m.type.replace(" Probability", "").split(" ");
        const line = parts[parts.length - 1];
        return {
          line,
          over: Number((m.data as any)?.yes ?? 0),
        };
      });

  /* -------------------- Key Markets -------------------- */
  const firstHalf = getMarket("First Half Winner Probability");
  const btts = getMarket("Both Teams To Score Probability");
  const fullTime = getMarket("Fulltime Result Probability");
  const teamToScoreFirst = getMarket("Team To Score First Probability");

  /* -------------------- Goal Analysis -------------------- */
  const generalGoals = extractGoalData("Over/Under");
  const homeGoals = extractGoalData("Home Over/Under");
  const awayGoals = extractGoalData("Away Over/Under");

  const allLines = Array.from(
    new Set([
      ...generalGoals.map((d) => d.line),
      ...homeGoals.map((d) => d.line),
      ...awayGoals.map((d) => d.line),
    ])
  ).sort((a, b) => Number(a) - Number(b));

  const consolidatedGoalData = allLines.map((line) => ({
    line,
    matchValue: generalGoals.find((d) => d.line === line)?.over ?? 0,
    homeValue: homeGoals.find((d) => d.line === line)?.over ?? 0,
    awayValue: awayGoals.find((d) => d.line === line)?.over ?? 0,
  }));

  /* -------------------- Market Grouping -------------------- */
  const cornerMarkets = markets.filter((m) => m.type.startsWith("Corners"));

  const usedTypes = [
    "Both Teams To Score Probability",
    "Over/Under 2.5 Probability",
    "First Half Winner Probability",
    "Fulltime Result Probability",
    "Team To Score First Probability",
    ...markets
      .filter((m) =>
        m.type.match(/^(Over\/Under|Home Over\/Under|Away Over\/Under|Corners)/)
      )
      .map((m) => m.type),
  ];

  const otherMarkets = markets.filter((m) => !usedTypes.includes(m.type));

  /* -------------------- Final Return -------------------- */
  return {
    isLoading: predictionsSWR.isLoading || valueBetsSWR.isLoading,
    error: predictionsSWR.error || valueBetsSWR.error,

    keyMarkets: {
      firstHalf: {
        home: Number((firstHalf?.data as any)?.home ?? 0),
        away: Number((firstHalf?.data as any)?.away ?? 0),
        draw: Number((firstHalf?.data as any)?.draw ?? 0),
      },
      btts: {
        yes: Number((btts?.data as any)?.yes ?? 0),
        no: Number((btts?.data as any)?.no ?? 0),
      },
      fullTime: {
        home: Number((fullTime?.data as any)?.home ?? 0),
        draw: Number((fullTime?.data as any)?.draw ?? 0),
        away: Number((fullTime?.data as any)?.away ?? 0),
      },
      teamToScoreFirst: {
        homeValue: Number((teamToScoreFirst?.data as any)?.home ?? 0),
        awayValue: Number((teamToScoreFirst?.data as any)?.away ?? 0),
        drawValue: Number((teamToScoreFirst?.data as any)?.draw ?? 0),
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
