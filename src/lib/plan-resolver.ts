import { Plan } from "@/types/prices";
import { Subscription } from "@/types/subscription";

export type PlanUIState = "available" | "current" | "disabled";

export function derivePlanState(
  plan: Plan,
  subscription: Subscription | null | undefined,
): PlanUIState {
  if (!subscription || !subscription.is_vip) {
    return "available";
  }
  if (
    subscription.status === "active" &&
    subscription.billing_cycle === plan.billingCycle
  ) {
    return "current";
  }

  return "disabled";
}

export const formatPrice = (amount: number, currency: string) => {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const getPlanDurationLabel = (billingCycle: string) => {
  switch (billingCycle) {
    case "monthly":
      return "Billed monthly";
    case "yearly":
      return "Billed yearly";
    default:
      return "Recurring plan";
  }
};

export const getDiscountPercent = (plan: Plan, baseMonthlyPrice?: number) => {
  if (!baseMonthlyPrice) return null;
  if (plan.billingCycle !== "yearly") return null;

  const yearlyFromMonthly = baseMonthlyPrice * 12;
  const discount =
    ((yearlyFromMonthly - plan.amount) / yearlyFromMonthly) * 100;

  return Math.round(discount);
};
