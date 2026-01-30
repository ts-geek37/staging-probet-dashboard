"use client";

import { useAuth } from "@clerk/nextjs";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
} from "react";
import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { Subscription } from "@/types/subscription";

interface SubscriptionContextType {
  subscription: Subscription | null | undefined;
  isVip: boolean | null;
  isSubscriptionLoading: boolean;
  isCancelling: boolean;
  setIsCancelling: (value: boolean) => void;
  error: Error | null;
  refresh: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(
  undefined,
);

export const SubscriptionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isLoaded, isSignedIn } = useAuth();
  const [isCancelling, setIsCancelling] = React.useState(false);

  const { data, error, isLoading, mutate } = useSWR<ApiResponse<Subscription>>(
    "/api/v2/billing/subscription",
  );

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) {
      mutate(); 
    } else {
      mutate(undefined, false);
    }
  }, [isLoaded, isSignedIn, mutate]);

  // Re-fetch subscription whenever auth state changes
  const refreshSubscription = useCallback(() => {
    if (isLoaded && isSignedIn) {
      mutate();
    } else if (isLoaded && !isSignedIn) {
      mutate(undefined, false);
    }
  }, [isLoaded, mutate, isSignedIn]);

  const isVip = isLoading || !data ? null : Boolean(data?.data?.is_vip);

  const value = {
    subscription: data?.data,
    isVip,
    isSubscriptionLoading: isLoading,
    isCancelling,
    setIsCancelling,
    error,
    refresh: refreshSubscription,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error(
      "useSubscriptionContext must be used within a SubscriptionProvider",
    );
  }
  return context;
};
