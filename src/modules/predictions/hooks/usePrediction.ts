"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import {
  GetPredictableMatchesParams,
  PredictableMatchesResponse,
} from "@/types/prediction";

const usePrediction = ({
  page = 1,
  limit = 10,
}: GetPredictableMatchesParams) => {
  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const { data, error, isLoading } = useSWR<
    ApiResponse<PredictableMatchesResponse>
  >(`/api/v2/predictions/matches?${query.toString()}`);

  const matches = data?.data?.data ?? [];
  const pagination = data?.data?.pagination;

  return {
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
