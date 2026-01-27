import { BillingCycle, Plan } from "@/types/prices";
import { Subscription } from "@/types/subscription";

export type PlanUIState = "available" | "current" | "disabled" | "active";

export const derivePlanState = (
  plan: Plan,
  subscription: Subscription | null | undefined,
): PlanUIState => {
  if (!subscription || !subscription.is_vip) {
    return "available";
  }
  if (
    subscription.status === "active" &&
    subscription.billing_cycle === plan.billingCycle
  ) {
    return "current";
  }
  if (subscription.status === "active") {
    return "active";
  }

  return "disabled";
};

export const formatPrice = (amount: number, currency: string): string => {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const getPlanDurationLabel = (billingCycle: string): string => {
  switch (billingCycle) {
    case "monthly":
      return "/month";
    case "quarterly":
      return "/3 month";
    case "semi_annual":
      return "/6 month";
    case "yearly":
      return "/year";
    default:
      return "";
  }
};

const BILLING_CYCLE_MONTHS: Record<BillingCycle, number> = {
  monthly: 1,
  quarterly: 3,
  semi_annual: 6,
  yearly: 12,
};

export const getDiscountPercent = (
  plan: Plan,
  monthlyAmount: number,
): number | null => {
  const months = BILLING_CYCLE_MONTHS[plan.billingCycle];
  if (months === 1) return null;

  const baseline = monthlyAmount * months;
  const discount = ((baseline - plan.amount) / baseline) * 100;

  return Math.round(discount);
};
export const getPlanValue = (billingCycle?: BillingCycle): number => {
  if (!billingCycle) return 0;
  return BILLING_CYCLE_MONTHS[billingCycle] || 0;
};
