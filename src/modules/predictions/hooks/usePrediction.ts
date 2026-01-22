"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import {
  GetPredictableMatchesParams,
  PredictableMatchesResponse,
  PredictionCardVariant,
} from "@/types/prediction";

interface UsePredictionParams extends GetPredictableMatchesParams {
  initialData: ApiResponse<PredictableMatchesResponse>;
}

const usePrediction = ({
  page = 1,
  limit = 10,
  initialData,
}: UsePredictionParams) => {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const { data, error, isLoading } = useSWR<
    ApiResponse<PredictableMatchesResponse>
  >(`/api/v2/predictions/matches?${query.toString()}`, {
    fallbackData: initialData,
    revalidateOnMount: false,
  });

  const matches = data?.data?.data ?? [];
  const pagination = data?.data?.pagination;

  const matchCards = matches.map((match, index) => {
    const variant: PredictionCardVariant = index === 0 ? "prediction" : "vip";

    return {
      match,
      variant,
    };
  });

  return {
    matchCards,
    matches,
    page: pagination?.page ?? page,
    limit: pagination?.limit ?? limit,
    has_more: pagination?.has_more ?? false,
    count: pagination?.count ?? 0,
    isLoading,
    error,
  };
};

export default usePrediction;
