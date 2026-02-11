"use client";

import React from "react";

import DataError from "@/components/DataError";
import { useSubscription } from "@/context";

import { usePlans } from "./hooks/usePlans";
import PricingPlans from "./PricingPlans";
import PricingSkeleton from "./PricingSkeleton";

const PricingShell: React.FC = () => {
  const {
    subscription,
    isVip,
    isSubscriptionLoading: subscriptionLoading,
    isCancelling,
  } = useSubscription();

  const { plans, loading: plansLoading, error: plansError } = usePlans();

  const isResolving = isCancelling || subscriptionLoading || plansLoading;

  if (isResolving) {
    return <PricingSkeleton />;
  }

  if (plansError || !plans) {
    return (
      <DataError message="Failed to load pricing plans. Please try again later." />
    );
  }

  return (
    <PricingPlans
      plans={plans}
      subscription={subscription}
      isVip={isVip ?? false}
    />
  );
};

export default PricingShell;
