"use client";

import { ApiResponse } from "@/api/types";
import { Subscription } from "@/types/subscription";
import useSWR from "swr";

const useSubscription = () => {
  const { data, error, isLoading, mutate } = useSWR<ApiResponse<Subscription>>(
    "/api/v2/billing/subscription",
  );

  return {
    subscription: data?.data,
    isVip: data?.data?.is_vip ?? false,
    loading: isLoading,
    error,
    refresh: mutate,
  };
};

export default useSubscription;
