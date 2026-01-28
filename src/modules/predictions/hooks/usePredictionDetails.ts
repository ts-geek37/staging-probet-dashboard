"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { FixturePredictionsResponse } from "@/types/prediction";

import { useSubscription } from "../../billing/hooks";

interface UsePredictionDetailsParams {
  fixtureId?: number;
}

type YesNoData = { yes?: number; no?: number; equal?: number };
type HomeAwayDrawData = { home?: number; away?: number; draw?: number };

interface DoubleChanceMarketData {
  draw_home?: number;
  draw_away?: number;
  home_away?: number;
}

interface Market {
  type: string;
  data?: unknown;
}

const usePredictionDetails = ({ fixtureId }: UsePredictionDetailsParams) => {
  const shouldFetch = !!fixtureId;

  const { data, isLoading, error } = useSWR<
    ApiResponse<FixturePredictionsResponse>
  >(shouldFetch ? `/api/v2/predictions/matches/${fixtureId}` : null);

  const markets: Market[] = data?.data?.markets ?? [];
  const predictionSentence = data?.data?.prediction_sentence ?? "";

  const getMarketByType = (type: string) =>
    markets.find((m) => m.type === type);

  const parseOverUnderMarkets = (prefix: string) =>
    markets
      .filter((m) => m.type.startsWith(prefix))
      .map((m) => {
        const line = m.type.match(/(\d+(\.\d+)?)/)?.[0] ?? "";
        const d = m.data as YesNoData;
        return {
          line,
          yes: d?.yes ?? 0,
          no: d?.no ?? 0,
          equal: d?.equal ?? 0,
        };
      });

  const { isVip, isSubscriptionLoading } = useSubscription();
  const isPageLoading = isLoading || isSubscriptionLoading || isVip === null;

  const firstHalf = getMarketByType("First Half Winner Probability")?.data as
    | HomeAwayDrawData
    | undefined;
  const btts = getMarketByType("Both Teams To Score Probability")?.data as
    | YesNoData
    | undefined;
  const fullTime = getMarketByType("Fulltime Result Probability")?.data as
    | HomeAwayDrawData
    | undefined;
  const teamToScoreFirst = getMarketByType("Team To Score First Probability")
    ?.data as HomeAwayDrawData | undefined;

  const generalGoals = parseOverUnderMarkets("Over/Under");
  const homeGoals = parseOverUnderMarkets("Home Over/Under");
  const awayGoals = parseOverUnderMarkets("Away Over/Under");

  const doubleChanceData = (() => {
    const data = getMarketByType("Double Chance Probability")?.data as
      | DoubleChanceMarketData
      | undefined;
    if (!data) return [];
    return [
      {
        type: "Double Chance Probability",
        data: {
          draw_home: Number(data.draw_home ?? 0),
          draw_away: Number(data.draw_away ?? 0),
          home_away: Number(data.home_away ?? 0),
        },
      },
    ];
  })();

  const goalLines = Array.from(
    new Set([
      ...generalGoals.map((g) => g.line),
      ...homeGoals.map((g) => g.line),
      ...awayGoals.map((g) => g.line),
    ]),
  )
    .sort((a, b) => Number(a) - Number(b))
    .map((line) => ({
      line,
      matchValue: generalGoals.find((g) => g.line === line)?.yes ?? 0,
      homeValue: homeGoals.find((g) => g.line === line)?.yes ?? 0,
      awayValue: awayGoals.find((g) => g.line === line)?.yes ?? 0,
    }));

  const cornerMarkets = markets.filter((m) => m.type.startsWith("Corners"));

  const excludedMarketTypes = new Set([
    "Both Teams To Score Probability",
    "Over/Under 2.5 Probability",
    "First Half Winner Probability",
    "Fulltime Result Probability",
    "Team To Score First Probability",
    "Double Chance Probability",
    ...markets
      .filter((m) =>
        /^(Over\/Under|Home Over\/Under|Away Over\/Under|Corners)/.test(m.type),
      )
      .map((m) => m.type),
  ]);

  const otherMarkets = markets.filter((m) => !excludedMarketTypes.has(m.type));

  const isNumericMarket = (data: unknown): data is Record<string, number> =>
    !!data &&
    typeof data === "object" &&
    Object.values(data).every((v) => typeof v === "number");

  const hasValidValues = (data: Record<string, number> | undefined) =>
    data && Object.values(data).some((v) => v > 0);

  const hasContent =
    !!predictionSentence?.trim() ||
    (!!firstHalf && Object.values(firstHalf).some((v) => (v ?? 0) > 0)) ||
    (!!btts && hasValidValues(btts)) ||
    (!!teamToScoreFirst &&
      Object.values(teamToScoreFirst).some((v) => (v ?? 0) > 0)) ||
    (!!fullTime && Object.values(fullTime).some((v) => (v ?? 0) > 0)) ||
    goalLines.some(
      (g) => g.matchValue > 0 || g.homeValue > 0 || g.awayValue > 0,
    ) ||
    cornerMarkets.some(
      (m) => isNumericMarket(m.data) && hasValidValues(m.data),
    ) ||
    otherMarkets.some(
      (m) => isNumericMarket(m.data) && hasValidValues(m.data),
    ) ||
    doubleChanceData.length > 0;

  return {
    isPageLoading,
    error,
    hasContent,
    predictionSentence,

    keyMarkets: {
      firstHalf: {
        home: Number(firstHalf?.home ?? 0),
        away: Number(firstHalf?.away ?? 0),
        draw: Number(firstHalf?.draw ?? 0),
      },
      btts: {
        yes: Number(btts?.yes ?? 0),
        no: Number(btts?.no ?? 0),
      },
      fullTime: {
        home: Number(fullTime?.home ?? 0),
        draw: Number(fullTime?.draw ?? 0),
        away: Number(fullTime?.away ?? 0),
      },
      teamToScoreFirst: {
        home: Number(teamToScoreFirst?.home ?? 0),
        away: Number(teamToScoreFirst?.away ?? 0),
        draw: Number(teamToScoreFirst?.draw ?? 0),
      },
    },

    goalLines: {
      consolidated: goalLines,
    },

    cornerMarkets,
    otherMarkets,
    doubleChanceData,
    isVip,
  };
};

export default usePredictionDetails;
