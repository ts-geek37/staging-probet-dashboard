import { serverFetch } from "@/api/http";
import {
  FixturePredictionsResponse,
  GetPredictableMatchesParams,
  PredictableMatchesResponse,
} from "@/types/prediction";

import { ApiResponse } from "./types";

export const getPredictableMatches = (
  params: GetPredictableMatchesParams,
): Promise<ApiResponse<PredictableMatchesResponse>> => {
  const query = new URLSearchParams({
    page: String(params.page),
    limit: String(params.limit),
  });

  return serverFetch<PredictableMatchesResponse>(
    `/api/v2/predictions/matches?${query.toString()}`,
  );
};

export const getFixturePredictions = (
  fixtureId: number,
): Promise<ApiResponse<FixturePredictionsResponse>> => {
  return serverFetch<FixturePredictionsResponse>(
    `/api/v2/predictions/matches/${fixtureId}`,
  );
};
