"use client";

import { useUser } from "@clerk/nextjs";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

import { Badge } from "@/components/ui/badge";
import {
  formatPrice,
  getDiscountPercent,
  getPlanDurationLabel,
  PlanUIState,
} from "@/lib/plan-resolver";
import { cn } from "@/lib/utils";
import { PlanWithFeatures } from "@/types/prices";

import { PlanCTA } from ".";

interface Props {
  plan: PlanWithFeatures;
  state: PlanUIState;
  highlight?: boolean;
  expiryAt?: string | null;
  monthlyAmount?: number;
}

const PlanCard: React.FC<Props> = ({
  plan,
  state,
  highlight,
  expiryAt,
  monthlyAmount,
}) => {
  const router = useRouter();
  const { isSignedIn } = useUser();

  const discount = monthlyAmount
    ? getDiscountPercent(plan, monthlyAmount)
    : null;

  const handleSignIn = () => {
    router.push(`/sign-in?redirect_url=/pricing`);
  };

  const getPlanMonths = (billingCycle: string) => {
    switch (billingCycle) {
      case "monthly":
        return 1;
      case "quarterly":
        return 3;
      case "semi_annual":
        return 6;
      case "yearly":
        return 12;
      default:
        return 1;
    }
  };

  const planMonths = getPlanMonths(plan.billingCycle);

  return (
    <div
      className={cn(
        "relative group flex flex-col rounded-md border px-4 mobile:px-6 py-6 transition-all duration-300",
        highlight
          ? "border-primary-green/50 bg-primary-green/20 shadow-lg shadow-primary-green/10"
          : "border-primary-green/20 bg-primary-green/10 hover:border-primary-green/30 hover:bg-primary-green/20 active:border-primary-green/30 active:bg-primary-green/25",
      )}
    >
      {highlight && (
        <Badge
          variant="green"
          className="absolute right-0 top-0 rounded-none rounded-bl-md rounded-tr-md px-4 py-1.5 sm:py-2.5 text-xs sm:text-sm font-semibold text-white/80 group-hover:text-white"
        >
          Most Popular
        </Badge>
      )}

      <div className="mb-4">
        <h3 className="text-sm font-medium tracking-wide text-white">
          {plan.label}
        </h3>
      </div>

      <div className="min-h-24">
        <div className="flex flex-wrap items-baseline gap-2">
          {plan.eurPrices && (
            <p className="text-3xl sm:text-5xl font-bold text-white">
              {formatPrice(Number(plan.eurPrices), "EUR")}
            </p>
          )}

          {plan.usdPrices && (
            <p className="text-xl sm:text-2xl font-semibold text-slate-400">
              / {formatPrice(Number(plan.usdPrices), "USD")}
            </p>
          )}

          <span className="text-slate-500 text-sm sm:text-base">
            {getPlanDurationLabel(plan.billingCycle)}
          </span>
        </div>

        {discount && (
          <p className="mt-2 text-sm font-medium text-primary-green">
            Save {discount}%
          </p>
        )}
      </div>

      <ul className="mb-2 grow flex flex-col gap-4">
        {plan?.features?.map((feature) => (
          <li key={feature} className="flex items-center gap-3 text-sm">
            <Check className="size-5 shrink-0 text-white group-hover:text-primary-green" />
            <span className="text-slate-300 group-hover:scale-y-105 transition-all duration-300">
              {feature}
            </span>
          </li>
        ))}

        <li className="flex items-center gap-3 text-sm">
          <Check className="size-5 shrink-0 text-white group-hover:text-primary-green" />
          <span className="text-slate-300 group-hover:scale-y-105 transition-all duration-300">
            Unlimited prediction access for {planMonths}{" "}
            {planMonths > 1 ? "months" : "month"}
          </span>
        </li>
      </ul>

      <PlanCTA
        state={state}
        isSignedIn={isSignedIn ?? false}
        billingCycle={plan?.billingCycle}
        onSignIn={handleSignIn}
        expiryAt={expiryAt}
      />
    </div>
  );
};

export default PlanCard;
