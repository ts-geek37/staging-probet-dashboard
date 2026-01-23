"use client";

import useSWR from "swr";
import { ApiResponse } from "@/api/types";

/* -------------------- Types -------------------- */

interface Market {
  type: string;
  data: Record<string, number>;
}

interface PredictionAPIResponse {
  fixture_id: number;
  predictable: boolean;
  markets: Market[];
}

interface UsePredictionSentenceParams {
  fixtureId?: number;
  homeTeam: string;
  awayTeam: string;
}

interface PredictionSentenceResult {
  sentence: string;
  mainPick: "HOME" | "AWAY" | "DRAW";
  confidence: number;
  supportingMarkets: string[];
}

/* -------------------- Helpers -------------------- */

const getMarket = (markets: Market[], type: string) =>
  markets.find((m) => m.type === type)?.data;

const getHighestProb = (data: Record<string, number>) =>
  Object.entries(data).sort((a, b) => b[1] - a[1])[0];

const getBestDoubleChance = (dc?: Record<string, number>) => {
  if (!dc) return null;
  const [key, value] = getHighestProb(dc);
  return value >= 60 ? key : null;
};

const getGoalInsight = (markets: Market[]) => {
  const btts = getMarket(markets, "Both Teams To Score Probability");
  if (btts?.yes >= 55) return "Both teams are likely to score";

  const over25 = getMarket(markets, "Over/Under 2.5 Probability");
  if (over25?.yes >= 55) return "Goals are expected in this match";

  return null;
};

const getH2HInsight = (
  markets: Market[],
  ftPick: string,
  homeTeam: string,
  awayTeam: string,
) => {
  const h2h = getMarket(markets, "Head To Head Result Probability");
  if (!h2h) return null;

  const [h2hPick, h2hProb] = getHighestProb(h2h);

  // Only support if H2H aligns with FT pick and is meaningful
  if (h2hPick === ftPick && h2hProb >= 45) {
    const team =
      h2hPick === "home"
        ? homeTeam
        : h2hPick === "away"
        ? awayTeam
        : "Neither side";

    return {
      text: `Recent head-to-head meetings favor ${team}`,
      strength: h2hProb,
    };
  }

  return null;
};

/* -------------------- Hook -------------------- */

const usePredictionSentence = ({
  fixtureId,
  homeTeam,
  awayTeam,
}: UsePredictionSentenceParams) => {
  const shouldFetch = Boolean(fixtureId);

  const { data, error, isLoading } = useSWR<
    ApiResponse<PredictionAPIResponse>
  >(
    shouldFetch
      ? `/api/v2/predictions/matches/${fixtureId}`
      : null,
  );

  if (isLoading || error || !data?.data?.predictable) {
    return {
      isLoading,
      error,
      prediction: null as PredictionSentenceResult | null,
    };
  }

  const markets = data.data.markets;

  const ft = getMarket(markets, "Fulltime Result Probability");
  if (!ft) {
    return { isLoading, error, prediction: null };
  }

  const [ftPick, ftProb] = getHighestProb(ft);

  const dc = getMarket(markets, "Double Chance Probability");
  const dcPick = getBestDoubleChance(dc);

  const goalInsight = getGoalInsight(markets);
  const h2hInsight = getH2HInsight(
    markets,
    ftPick,
    homeTeam,
    awayTeam,
  );

  /* -------------------- Sentence Builder -------------------- */

  const teamLabel =
    ftPick === "home"
      ? homeTeam
      : ftPick === "away"
      ? awayTeam
      : "Both teams";

  let sentence =
    ftPick === "draw"
      ? `${homeTeam} and ${awayTeam} are expected to share the points`
      : `${teamLabel} are slight favorites to win this match`;

  if (dcPick) {
    sentence += ", with a strong chance of avoiding defeat";
  }

  if (h2hInsight) {
    sentence += `. ${h2hInsight.text}`;
  }

  if (goalInsight) {
    sentence += `. ${goalInsight}`;
  }

  /* -------------------- Confidence (Soft Adjust) -------------------- */

  let confidence = ftProb;

  if (h2hInsight) {
    confidence = Math.min(confidence + 3, 75);
  }

  const prediction: PredictionSentenceResult = {
    sentence: sentence + ".",
    mainPick: ftPick.toUpperCase() as "HOME" | "AWAY" | "DRAW",
    confidence: Number(confidence.toFixed(2)),
    supportingMarkets: [
      dcPick ? "Double Chance" : null,
      h2hInsight ? "Head-to-Head Advantage" : null,
      goalInsight,
    ].filter(Boolean) as string[],
  };

  return {
    isLoading,
    error,
    prediction,
  };
};

export default usePredictionSentence;
