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
    shouldFetch ? `/api/v2/predictions/matches/${fixtureId}` : null,
  );

  const valueBetsSWR = useSWR<ApiResponse<FixtureValueBetsResponse>>(
    shouldFetch ? `/api/v2/predictions/matches/${fixtureId}/value-bets` : null,
  );

  const predictions = predictionsSWR.data?.data ?? null;
  const valueBets = valueBetsSWR.data?.data ?? null;

  return {
    fixture_id: predictions?.fixture_id ?? null,
    predictable: predictions?.predictable ?? false,
    markets: predictions?.markets ?? [],
    bets: valueBets?.bets ?? [],
    isLoading: predictionsSWR.isLoading || valueBetsSWR.isLoading,
    error: predictionsSWR.error || valueBetsSWR.error,
    rawPredictions: predictionsSWR.data,
    rawValueBets: valueBetsSWR.data,
  };
};

export default usePredictionDetails;
