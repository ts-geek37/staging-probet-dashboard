"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { Plan, PlanWithFeatures } from "@/types/prices";

type PlansResponse = ApiResponse<Plan[]>;
const FEATURES = [
  "Full prediction access",
  "All match statistics",
  "Latest football news",
  "Live match scores",
];

export const usePlans = () => {
  const { data, error, isLoading } = useSWR<PlansResponse>("/api/v2/prices", {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });
  const plans: PlanWithFeatures[] =
    data?.data?.map((plan) => ({
      ...plan,
      features: FEATURES,
    })) ?? [];

  return {
    plans,
    loading: isLoading,
    error,
  };
};
