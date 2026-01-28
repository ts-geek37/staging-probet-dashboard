"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { Subscription } from "@/types/subscription";

const useSubscription = () => {
  const { data, error, isLoading, mutate } = useSWR<ApiResponse<Subscription>>(
    "/api/v2/billing/subscription",
  );

  const isVip = isLoading || !data ? false : Boolean(data?.data?.is_vip);

  return {
    subscription: data?.data,
    isVip,
    isSubscriptionLoading: isLoading,
    error,
    refresh: mutate,
  };
};

export default useSubscription;
