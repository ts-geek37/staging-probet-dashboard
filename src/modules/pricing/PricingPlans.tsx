"use client";

import React from "react";

import { derivePlanState } from "@/lib/plan-resolver";
import { Plan } from "@/types/prices";
import { Subscription } from "@/types/subscription";

import PlanCard from "./PlanCard";

interface Props {
  plans: Plan[];
  subscription: Subscription | null | undefined;
  isVip: boolean;
}

const PricingPlans: React.FC<Props> = ({ plans, subscription, isVip }) => {
  const sortedPlans = [...plans].sort((a, b) => a.amount - b.amount);

  return (
    <section className="m-auto max-w-6xl px-6 ">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {sortedPlans.map((plan, index) => {
          const state = derivePlanState(plan, subscription);

          return (
            <PlanCard
              key={plan.billingCycle}
              plan={plan}
              state={state}
              highlight={!isVip && index === 1}
              expiryAt={
                state === "current"
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
