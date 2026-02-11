"use client";

import { Star } from "lucide-react";
import React, { useState } from "react";

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
  const [currency, setCurrency] = useState<"EUR" | "USD">("EUR");
  const sortedPlans = [...plans].sort((a, b) => a.eurPrices - b.eurPrices);
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
        <p className="text-sm text-slate-400 mb-6">
          Get full access to detailed match analysis, confidence ratings, and
          expert insights across Global leagues.
        </p>

        <div className="flex justify-center">
          <div className="relative inline-flex h-10 items-center rounded-full bg-slate-800/50 p-1 ring-1 ring-white/10">
            <button
              onClick={() => setCurrency("EUR")}
              className={`relative z-10 rounded-full px-6 py-1.5 text-sm font-medium transition-colors duration-200 ${
                currency === "EUR"
                  ? "text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              EUR
            </button>
            <button
              onClick={() => setCurrency("USD")}
              className={`relative z-10 rounded-full px-6 py-1.5 text-sm font-medium transition-colors duration-200 ${
                currency === "USD"
                  ? "text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              USD
            </button>
            <div
              className={`absolute left-1 top-1 h-8 w-[calc(50%-4px)] rounded-full bg-primary-green transition-transform duration-300 ease-out ${
                currency === "USD" ? "translate-x-full" : "translate-x-0"
              }`}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {sortedPlans.map((plan, index) => {
          const state = derivePlanState(plan, subscription);
          return (
            <PlanCard
              key={index}
              plan={plan}
              state={state}
              currency={currency}
              highlight={plan.billingCycle === "quarterly"}
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
