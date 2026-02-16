"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { useSubscription } from "@/context";
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
  const { isVip, isSubscriptionLoading } = useSubscription();

  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const { data, error, isLoading } = useSWR<
    ApiResponse<PredictableMatchesResponse>
  >(`/api/v2/predictions/matches?${query.toString()}`, {
    fallbackData: initialData,
    revalidateOnMount: true,
  });

  const matches = data?.data?.data ?? [];
  const pagination = data?.data?.pagination;
  const matchCards = matches.map((match, index) => {
    const variant: PredictionCardVariant =
      !isVip && index > 0 ? "vip" : "prediction";

    return {
      match,
      variant,
    };
  });

  return {
    matchCards,
    matches,
    isVip,
    page: pagination?.page ?? page,
    limit: pagination?.limit ?? limit,
    has_more: isVip ? (pagination?.has_more ?? false) : false,
    count: isVip ? (pagination?.count ?? matches.length) : 1,
    isLoading: isSubscriptionLoading || isLoading,
    error,
  };
};

export default usePrediction;
