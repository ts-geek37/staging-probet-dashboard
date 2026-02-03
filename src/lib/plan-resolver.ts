import { BillingCycle, Plan } from "@/types/prices";
import { Subscription } from "@/types/subscription";

export type PlanUIState =
  | "available"
  | "current"
  | "disabled"
  | "active"
  | "cancelled";

export const derivePlanState = (
  plan: Plan,
  subscription: Subscription | null | undefined,
): PlanUIState => {
  if (!subscription || !subscription.is_vip) {
    return "available";
  }

  if (subscription.status === "cancel_at_period_end") {
    return subscription.billing_cycle === plan.billingCycle
      ? "cancelled"
      : "active";
  }

  if (subscription.status === "active") {
    return subscription.billing_cycle === plan.billingCycle
      ? "current"
      : "active";
  }

  return "disabled";
};

export const formatPrice = (amount: number, currency: string): string => {
  return new Intl.NumberFormat("en-US", { 
    style: "currency",
    currency,
    currencyDisplay: "symbol",
    maximumFractionDigits: 0,
  }).format(amount);
};


export const getPlanDurationLabel = (billingCycle: string): string => {
  switch (billingCycle) {
    case "monthly":
      return "/month";
    case "quarterly":
      return "/3 months";
    case "semi_annual":
      return "/6 months";
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

export const formatDate24h = (
  dateString: string | null | undefined,
): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
};

export const formatDateOnly = (
  dateString: string | null | undefined,
): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};
