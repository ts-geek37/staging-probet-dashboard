"use client";

import { ApiResponse } from "@/api/types";
import { Plan } from "@/types/prices";
import useSWR from "swr";

type PlansResponse = ApiResponse<Plan[]>;

export const usePlans = () => {
  const { data, error, isLoading } = useSWR<PlansResponse>("/api/v2/prices", {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  return {
    plans: data?.data ?? null,
    loading: isLoading,
    error,
  };
};
