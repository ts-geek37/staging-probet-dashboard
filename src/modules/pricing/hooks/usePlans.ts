"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { Plan, PlanWithFeatures } from "@/types/prices";

type PlansResponse = ApiResponse<Plan[]>;
const FEATURES = [
  "Full prediction access",
  "All match statistics",
  "Head-to-head analysis",
  "Email alerts",
  "Priority support / API access",
];

const SECONDARY_FEATURES: Record<string, string[]> = {
  monthly: [
    "Full prediction access",
    "All match statistics",
    "Head-to-head analysis",
    "Email alerts",
  ],
  quarterly: [
    "Full prediction access",
    "All match statistics",
    "Head-to-head analysis",
    "Email alerts",
    "Priority support",
  ],
  "semi-annual": [
    "Full prediction access",
    "All match statistics",
    "Head-to-head analysis",
    "Email alerts",
    "Priority support/API access",
  ],
  annual: [
    "Full prediction access",
    "All match statistics",
    "Head-to-head analysis",
    "Email alerts/Custom alerts",
    "Priority support/API access",
  ],
};

export const usePlans = () => {
  const { data, error, isLoading } = useSWR<PlansResponse>("/api/v2/prices", {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });
  const plans: PlanWithFeatures[] =
    data?.data?.map((plan) => ({
      ...plan,
      features: SECONDARY_FEATURES[plan.billingCycle] ?? FEATURES,
    })) ?? [];

  return {
    plans,
    loading: isLoading,
    error,
  };
};
