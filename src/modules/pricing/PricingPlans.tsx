"use client";

import { Star } from "lucide-react";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { derivePlanState } from "@/lib/plan-resolver";
import { PlanWithFeatures } from "@/types/prices";
import { Subscription } from "@/types/subscription";

import PlanCard from "./PlanCard";

interface Props {
  plans: PlanWithFeatures[];
  subscription: Subscription | null | undefined;
  isVip: boolean;
}

const PricingPlans: React.FC<Props> = ({ plans, subscription }) => {
  const sortedPlans = [...plans].sort((a, b) => a.amount - b.amount);
  const monthlyPlan = sortedPlans.find((p) => p.billingCycle === "monthly");

  return (
    <section className="m-auto w-full max-w-7xl px-4 sm:px-6  py-8 sm:py-15">
      <div className="flex justify-center mb-4">
        <Badge variant="yellow">
          <Star className="h-3.5 w-3.5" />
          VIP Membership
        </Badge>
      </div>

      <div className="mb-8 text-center">
        <h1 className="mb-3 text-3xl font-bold text-white">
          Unlock Premium Predictions
        </h1>
        <p className="text-sm text-slate-400">
          Get full access to detailed match analysis, confidence ratings, and
          expert insights across Global leagues.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {sortedPlans.map((plan, index) => {
          const state = derivePlanState(plan, subscription);
          return (
            <PlanCard
              key={index}
              plan={plan}
              state={state}
              highlight={plan.billingCycle === "quarterly"}
              monthlyAmount={monthlyPlan?.amount}
              expiryAt={
                state === "current" || state === "cancelled"
                  ? (subscription?.current_period_end ?? null)
                  : null
              }
            />
          );
        })}
      </div>
    </section>
  );
};

export default PricingPlans;
