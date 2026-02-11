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
  currency?: "EUR" | "USD";
};

const PlanCTA: React.FC<PlanCTAProps> = ({
  state,
  isSignedIn,
  billingCycle,
  onSignIn,
  expiryAt,
  currency = "EUR",
}) => {
  const { checkout, loading, error } = useCheckout();

  switch (state) {
    case "current":
      return (
        <div className="group relative overflow-hidden rounded-2xl pt-2 ">
          <div className="relative flex flex-col items-center gap-3 rounded-[14px] bg-card p-2 py-3 border border-primary-gray/20 min-h-25">
            <div className="flex items-center gap-1.5 rounded-full bg-primary-green/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-green ring-1 ring-inset ring-primary-green/20">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-green opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-green"></span>
              </span>
              Active Now
            </div>

            <div className="flex flex-col items-center gap-1">
              {expiryAt && (
                <span className="text-center text-xs text-primary-gray">
                  The current plan expires <br />
                  <span className="text-white">
                    on {formatDateOnly(expiryAt)}
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>
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
        <div className="group relative mt-2 overflow-hidden rounded-2xl border border-primary-gray/20">
          <div className="relative flex flex-col items-center gap-3 rounded-[15px] bg-card p-3 py-3">
            <div className="flex items-center gap-1.5 rounded-full bg-slate-500/10 p-2 text-[10px] font-bold uppercase tracking-wider text-primary-gray ring-1 ring-inset ring-slate-500/20">
              <Lock className="size-3" />
              Plan Locked
            </div>

            <div className="flex flex-col items-center gap-1 text-center">
              <p className="max-w-50 text-xs leading-snug text-primary-gray">
                This option is restricted while your <br />
                <span className="text-primary-green/70">
                  active subscription
                </span>{" "}
                is in effect.
              </p>
            </div>
          </div>
        </div>
      );

    case "cancelled":
      return (
        <div className="group relative overflow-hidden rounded-2xl border border-primary-gray/20 mt-2">
          <div className="relative flex flex-col items-center gap-3 rounded-[15px] bg-card p-2 py-4 backdrop-blur-md">
            <div className="flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-red-400 ring-1 ring-inset ring-red-500/20">
              Cancelled
            </div>

            <p className="text-center text-xs leading-relaxed text-primary-gray">
              You still have full access to all features <br /> until the date{" "}
              <span className="text-white">{formatDateOnly(expiryAt)}</span>
            </p>
          </div>
        </div>
      );
    case "available":
      if (!isSignedIn) {
        return (
          <Button
            onClick={onSignIn}
            variant="outline"
            className="w-full rounded-lg px-4 py-5 text-sm font-medium border-primary-gray/20 hover:text-white hover:bg-black/80 text-white/90 mt-4"
          >
            Sign in to continue
          </Button>
        );
      }

      return (
        <div className="space-y-3">
          <Button
            onClick={() => checkout(billingCycle, currency)}
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
