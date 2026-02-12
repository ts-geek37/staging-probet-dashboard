"use client";

import { Star } from "lucide-react";
import React, { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { derivePlanState } from "@/lib/plan-resolver";
import { PlanWithFeatures } from "@/types/prices";
import { Subscription } from "@/types/subscription";

import PlanCard from "./PlanCard";

interface Props {
  plans: PlanWithFeatures[];
  subscription: Subscription | null | undefined;
  isVip: boolean;
}
const currencies = ["EUR", "USD"] as const;
type Currency = (typeof currencies)[number];

const PricingPlans: React.FC<Props> = ({ plans, subscription }) => {
  const [currency, setCurrency] = useState<Currency>("EUR");
  const sortedPlans = [...plans].sort((a, b) => a.eurPrices - b.eurPrices);
  const subscriptionCurrency = useMemo((): Currency => {
    const curr = subscription?.currency?.toUpperCase();
    return currencies.includes(curr as Currency) ? (curr as Currency) : "EUR";
  }, [subscription?.currency]);
  const hasSubscriptionCurrency = !!subscription?.currency;

  const activeCurrency = hasSubscriptionCurrency
    ? subscriptionCurrency
    : currency;

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
          <Tabs
            value={currency}
            onValueChange={(val) => {
              if (hasSubscriptionCurrency) return;
              setCurrency(val as Currency);
            }}
          >
            <TabsList className="h-10 rounded-full bg-slate-800/50 p-1 ring-1 ring-white/10">
              {currencies.map((item) => (
                <TabsTrigger
                  key={item}
                  value={item}
                  disabled={
                    hasSubscriptionCurrency && subscriptionCurrency !== item
                  }
                  className="rounded-full px-6 py-1.5 text-sm font-medium text-slate-400 data-[state=active]:bg-primary-green data-[state=active]:text-white"
                >
                  {item}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
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
