"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";

import {
  formatPrice,
  getDiscountPercent,
  getPlanDurationLabel,
  PlanUIState,
} from "@/lib/plan-resolver";
import { UpgradeCTA } from "@/modules/billing";
import { Plan } from "@/types/prices";

interface Props {
  plan: Plan;
  state: PlanUIState;
  highlight?: boolean;
  expiryAt?: string | null;
}

const FEATURES = [
  "Full prediction access",
  "All match statistics",
  "Head-to-head analysis",
  "Email alerts",
  "Priority support / API access",
];

const PlanCard: React.FC<Props> = ({ plan, state, highlight, expiryAt }) => {
  const router = useRouter();
  const { isSignedIn } = useUser();

  const discount =
    plan.billingCycle === "yearly" ? getDiscountPercent(plan) : null;

  const handleSignIn = () => {
    router.push(`/sign-in?redirect_url=/pricing`);
  };

  return (
    <div
      className={`relative flex flex-col rounded-xl border p-6 transition ${
        highlight ? "border-blue-500" : "border-slate-800"
      }`}
    >
      {highlight && (
        <span className="absolute right-4 top-4 rounded-full bg-blue-500/10 px-2 py-1 text-xs text-blue-400">
          Best value
        </span>
      )}

      <h3 className="text-lg font-medium text-white">{plan.label}</h3>

      <div className="mt-2">
        <p className="text-3xl font-bold text-white">
          {formatPrice(plan.amount, plan.currency)}
        </p>
        <p className="mt-1 text-xs text-slate-400">
          {getPlanDurationLabel(plan.billingCycle)}
        </p>

        {discount && (
          <p className="mt-1 text-xs text-green-400">
            Save {discount}% compared to monthly
          </p>
        )}
      </div>

      {state === "current" && expiryAt && (
        <p className="mt-2 text-xs text-slate-400">
          Renews on{" "}
          {new Date(expiryAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      )}

      <ul className="mt-6 flex flex-col gap-2 text-sm text-slate-400">
        {FEATURES.map((feature) => (
          <li key={feature}>✔ {feature}</li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        {state === "current" && (
          <button
            disabled
            className="w-full rounded-lg bg-slate-700 px-4 py-2 text-sm text-white opacity-60"
          >
            Current plan
          </button>
        )}

        {state === "disabled" && (
          <button
            disabled
            className="w-full rounded-lg bg-slate-700 px-4 py-2 text-sm text-white opacity-40"
          >
            Not available
          </button>
        )}

        {state === "available" && (
          <>
            {!isSignedIn ? (
              <button
                onClick={handleSignIn}
                className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
              >
                Sign in to continue
              </button>
            ) : (
              <UpgradeCTA billingCycle={plan.billingCycle} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PlanCard;
