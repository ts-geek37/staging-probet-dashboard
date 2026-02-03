import { Lock } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { formatDateOnly, PlanUIState } from "@/lib/plan-resolver";
import { BillingCycle } from "@/types/prices";

import { useCheckout } from "../billing/hooks";

type PlanCTAProps = {
  state: PlanUIState;
  isSignedIn: boolean;
  billingCycle: BillingCycle;
  onSignIn: () => void;
  expiryAt?: string | null;
};

const PlanCTA: React.FC<PlanCTAProps> = ({
  state,
  isSignedIn,
  billingCycle,
  onSignIn,
  expiryAt,
}) => {
  const { checkout, loading, error } = useCheckout();

  switch (state) {
    case "current":
      return (
        <Button
          disabled
          variant="green"
          className="w-full flex-col h-auto rounded-lg px-4 py-3 text-sm font-medium disabled:opacity-90"
        >
          <span className="flex items-center justify-center gap-2 text-white text-sm">
            <Lock className="size-5 text-primary-green" />
            Current Plan
          </span>
          {expiryAt && (
            <span className="text-[10px] text-white/70 uppercase tracking-wider mt-1">
              Expires: {formatDateOnly(expiryAt)}
            </span>
          )}
        </Button>
      );

    case "disabled":
      return (
        <Button
          disabled
          variant="ghost"
          className="w-full rounded-lg px-4 py-3 text-sm font-medium transition"
        >
          Not Available
        </Button>
      );
    case "active":
      return (
        <Button
          disabled
          variant="green"
          className="w-full rounded-lg px-4 py-3 text-sm font-medium disabled:opacity-90"
        >
          <span className="flex items-center justify-center gap-2 text-white text-sm">
            <Lock className="size-5 text-primary-green" />
            Locked During Active Period
          </span>
        </Button>
      );

    case "cancelled":
      return (
        <Button
          disabled
          className="w-full h-auto flex-col rounded-lg bg-slate-800 px-4 py-3 text-sm font-medium text-slate-500"
        >
          <span className="flex items-center justify-center gap-2 text-white text-sm">
            <Lock className="size-5 text-primary-green" />
            Cancelled
          </span>
          {expiryAt && (
            <span className="text-[10px] text-white/50 uppercase tracking-wider mt-1">
              Access until: {formatDateOnly(expiryAt)}
            </span>
          )}
        </Button>
      );

    case "available":
      if (!isSignedIn) {
        return (
          <Button
            onClick={onSignIn}
            variant="green"
            className="w-full rounded-lg px-4 py-3 text-sm font-medium transition text-white/80 group-hover:text-white"
          >
            Sign in to continue
          </Button>
        );
      }

      return (
        <div className="space-y-3">
          <Button
            onClick={() => checkout(billingCycle)}
            disabled={loading}
            variant="green"
            className="w-full rounded-lg px-5 py-3 text-sm font-medium text-white/80 group-hover:text-white transition hover:bg-primary-green/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Processing..." : "Get Started"}
          </Button>

          {error && (
            <p className="text-center text-sm text-red-400">
              Unable to start checkout. Please try again.
            </p>
          )}
        </div>
      );

    default:
      return null;
  }
};
export default PlanCTA;
