"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import {
  GetPredictableMatchesParams,
  PredictableMatchesResponse,
} from "@/types/prediction";

import { useSubscription } from "../../billing/hooks";

interface UsePredictionParams extends GetPredictableMatchesParams {
  initialData: ApiResponse<PredictableMatchesResponse>;
}

const usePrediction = ({
  page = 1,
  limit = 10,
  initialData,
}: UsePredictionParams) => {
  const { isVip } = useSubscription();

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

  const matchCards = matches.map((match, index) => ({
    match,
    variant: !isVip && index > 0 ? "vip" : "prediction",
  }));

  return {
    matchCards,
    matches,
    isVip,
    page: pagination?.page ?? page,
    limit: pagination?.limit ?? limit,
    has_more: isVip ? (pagination?.has_more ?? false) : false,
    count: isVip ? (pagination?.count ?? matches.length) : 1,
    isLoading,
    error,
  };
};

export default usePrediction;
