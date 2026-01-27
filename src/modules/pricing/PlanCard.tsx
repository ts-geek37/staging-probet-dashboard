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
import { BillingCycle, Plan } from "@/types/prices";

import { PlanCTA } from "../billing/PlanCTA";

interface Props {
  plan: Plan;
  state: PlanUIState;
  highlight?: boolean;
  expiryAt?: string | null;
  monthlyAmount?: number;
}

const FEATURES = [
  "Full prediction access",
  "All match statistics",
  "Head-to-head analysis",
  "Email alerts",
  "Priority support / API access",
];

const SECONDARY_FEATURES: Record<string, string[]> = {
  monthly: [
    "Full prediction access",
    "All match statistics",
    "Head-to-head analysis",
    "Email alerts",
  ],
  quarterly: [
    "Full prediction access",
    "All match statistics",
    "Head-to-head analysis",
    "Email alerts",
    "Priority support",
  ],
  "semi-annual": [
    "Full prediction access",
    "All match statistics",
    "Head-to-head analysis",
    "Email alerts",
    "Priority support/API access",
  ],
  annual: [
    "Full prediction access",
    "All match statistics",
    "Head-to-head analysis",
    "Email alerts/Custom alerts",
    "Priority support/API access",
  ],
};

const PlanCard: React.FC<Props> = ({
  plan,
  state,
  highlight,
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

  const features = SECONDARY_FEATURES[plan.billingCycle] || FEATURES;

  return (
    <div
      className={cn(
        "relative group flex flex-col rounded-md border p-6 transition-all duration-300",
        highlight
          ? "border-primary-green/50 bg-primary-green/20 shadow-lg shadow-primary-green/10"
          : "border-primary-green/20 bg-primary-green/10 hover:border-primary-green/30 hover:bg-primary-green/20 active:border-primary-green/30 active:bg-primary-green/25",
      )}
    >
      {highlight && (
        <Badge
          variant="green"
          className="absolute right-0 top-0 rounded-none rounded-bl-md rounded-tr-md  px-4 py-1.5 sm:py-2.5 text-xs sm:text-sm font-semibold text-white/80 group-hover:text-white"
        >
          Most Popular
        </Badge>
      )}

      <div className="mb-4">
        <h3 className="text-sm font-medium tracking-wide text-white">
          {plan.label}
        </h3>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <p className="text-3xl sm:text-5xl font-bold text-white">
            {formatPrice(plan.amount, plan.currency)}
          </p>
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

      <ul className="mb-8 flex flex-col gap-4">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-3 text-sm">
            <Check className="size-5 shrink-0 text-white group-hover:text-primary-green" />
            <span className="text-slate-300 group-hover:scale-y-105 transition-all duration-300">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <PlanCTA
          state={state}
          isSignedIn={isSignedIn ?? false}
          billingCycle={plan?.billingCycle}
          onSignIn={handleSignIn}
        />
      </div>
    </div>
  );
};

export default PlanCard;
