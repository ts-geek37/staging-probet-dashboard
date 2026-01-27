import { Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PlanUIState } from "@/lib/plan-resolver";
import { BillingCycle } from "@/types/prices";

import { useCheckout } from "./hooks";

type PlanCTAProps = {
  state: PlanUIState;
  isSignedIn: boolean;
  billingCycle: BillingCycle;
  onSignIn: () => void;
};

export const PlanCTA: React.FC<PlanCTAProps> = ({
  state,
  isSignedIn,
  billingCycle,
  onSignIn,
}) => {
  const { checkout, loading, error } = useCheckout();

  switch (state) {
    case "current":
      return (
        <Button
          disabled
          className="w-full rounded-lg bg-slate-800 px-4 py-3 text-sm font-medium text-slate-400"
        >
          Current Plan
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
