"use client";

import React from "react";

import { useSubscription } from "@/modules/billing/hooks";

import { usePlans } from "./hooks/usePlans";
import PricingPlans from "./PricingPlans";
import PricingSkeleton from "./PricingSkeleton";

const PricingShell: React.FC = () => {
  const {
    subscription,
    isVip,
    isSubscriptionLoading: subscriptionLoading,
  } = useSubscription();

  const { plans, loading: plansLoading, error: plansError } = usePlans();

  const isResolving = isSubscriptionLoading || plansLoading;

  if (isResolving) {
    return <PricingSkeleton />;
  }

  if (plansError || !plans) {
    return (
      <div className="text-center text-sm text-red-400">
        Failed to load pricing plans. Please try again later.
      </div>
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
