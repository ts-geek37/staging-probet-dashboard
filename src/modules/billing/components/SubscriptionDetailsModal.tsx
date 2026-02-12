"use client";

import { XIcon } from "lucide-react";
import React, { useState } from "react";

import { ConfirmationPopUp } from "@/components/ConfirmationPopUp";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSubscription } from "@/context";
import { formatDate24h } from "@/lib/plan-resolver";
import { BillingCycle } from "@/types/prices";

import { useCancelSubscription } from "../hooks";

interface SubscriptionDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
const BILLING_CYCLE_LABEL: Record<BillingCycle, string> = {
  monthly: "Monthly",
  quarterly: "Quarterly",
  semi_annual: "Semi Annual",
  yearly: "Yearly",
};

const SubscriptionDetailsModal: React.FC<SubscriptionDetailsModalProps> = ({
  open,
  onOpenChange,
}) => {
  const { subscription, isSubscriptionLoading } = useSubscription();
  const { cancelSubscription, isCancelling } = useCancelSubscription();
  const [reason, setReason] = useState("");

  if (isSubscriptionLoading || !subscription) {
    return null;
  }

  const formattedDate = formatDate24h(subscription.current_period_end);
  const planName = subscription.billing_cycle
    ? BILLING_CYCLE_LABEL[subscription.billing_cycle]
    : "Active";

  const isCancelled = subscription.status === "cancel_at_period_end";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[525px] border-primary-green/30 max-sm:px-4 backdrop-blur-sm"
        showCloseButton={false}
      >
        <DialogClose className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-colors duration-200 border-none bg-transparent outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:outline-none">
          <XIcon className="w-5 h-5" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <DialogHeader className="text-left space-y-3">
          <DialogTitle className="text-2xl font-semibold text-white tracking-tight">
            Current Subscription
          </DialogTitle>
          <DialogDescription className="text-primary-gray text-base">
            Manage your subscription and billing details.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-6">
          <div className="rounded-xl bg-gradient-to-br from-gray-800/40 to-gray-800/20 border border-gray-700/50 p-5 shadow-lg transition-all duration-200 hover:border-gray-600/50">
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="flex justify-between text-xs font-medium text-primary-gray uppercase tracking-wider sm:hidden">
                <span>Plan</span>
                <span>{isCancelled ? "Ends on" : "Renews on"}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="hidden sm:block text-xs font-medium text-primary-gray uppercase tracking-wider">
                    Plan
                  </p>
                  <p className="text-lg sm:text-xl font-bold text-white">
                    {planName} VIP
                  </p>
                </div>

                <div className="text-right space-y-1">
                  <p className="hidden sm:block text-xs font-medium text-primary-gray uppercase tracking-wider">
                    {isCancelled ? "Ends on" : "Renews on"}
                  </p>
                  <p className="text-sm sm:text-base font-semibold text-primary-green">
                    {formattedDate}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {isCancelled ? (
            <div className="p-4 rounded-xl bg-yellow-900/10 border border-yellow-700/30 text-primary-yellow text-sm leading-relaxed shadow-sm">
              Your subscription is set to cancel on{" "}
              <span className="font-semibold">{formattedDate}</span>. You will
              have access until then.
            </div>
          ) : (
            <ConfirmationPopUp
              title="Cancel your subscription?"
              description={
                <>
                  Your subscription will remain active until{" "}
                  <span className="font-semibold">{formattedDate}</span>. If you
                  cancel it,{" "}
                  <span className="font-semibold">
                    no recurring payment will be charged
                  </span>{" "}
                  for the next cycle.
                  <div className="mt-6 space-y-3">
                    <Label
                      htmlFor="cancellation-reason"
                      className="text-white font-medium text-sm"
                    >
                      Why are you cancelling?
                    </Label>
                    <Textarea
                      id="cancellation-reason"
                      placeholder="Please let us know why you're leaving so we can improve."
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      maxLength={200}
                      className="bg-gray-900/50 border-gray-700/50 text-white placeholder:text-primary-gray min-h-[150px] resize-none focus:border-gray-600 transition-colors duration-200"
                    />
                  </div>
                </>
              }
              onConfirm={async () => {
                await cancelSubscription(reason);
                onOpenChange(false);
              }}
              confirmDisabled={!reason.trim()}
              trigger={
                <Button
                  variant="default"
                  className="w-full text-red-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 font-medium py-6 rounded-lg border border-transparent hover:border-red-500/20"
                  disabled={isCancelling}
                >
                  {isCancelling ? "Processing..." : "Cancel Subscription"}
                </Button>
              }
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionDetailsModal;
