import { Lock } from "lucide-react";

import { ConfirmationPopUp } from "@/components/ConfirmationPopUp";
import { Button } from "@/components/ui/button";
import { formatDate24h, PlanUIState } from "@/lib/plan-resolver";
import { BillingCycle } from "@/types/prices";

import { useCancelSubscription, useCheckout } from "../billing/hooks";

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
  const { cancelSubscription, isCancelling } = useCancelSubscription();

  switch (state) {
    case "current":
      const formattedDate = formatDate24h(expiryAt);
      return (
        <ConfirmationPopUp
          title="Cancel your subscription?"
          description={
            <>
              Your subscription will remain active until{" "}
              <span className="font-semibold">{formattedDate}</span>.
              If you cancel it,{" "}
              <span className="font-semibold">
                No recurring payment will be charged
              </span>{" "}
              for the next cycle.
            </>
          }
          onConfirm={async () => {
            await cancelSubscription();
          }}
          trigger={
            <Button
              disabled={isCancelling}
              className="w-full rounded-lg bg-slate-800 px-4 py-3 text-sm font-medium text-slate-400"
            >
              {isCancelling ? "Cancelling..." : "Cancel Plan"}
            </Button>
          }
        />
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
export default PlanCTA;
