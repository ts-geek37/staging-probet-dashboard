"use client";

import React from "react";

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
import { useSubscription } from "@/context";
import { formatDate24h } from "@/lib/plan-resolver";

import { XIcon } from "lucide-react";
import { useCancelSubscription } from "../hooks";

interface SubscriptionDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SubscriptionDetailsModal: React.FC<SubscriptionDetailsModalProps> = ({
  open,
  onOpenChange,
}) => {
  const { subscription, isSubscriptionLoading } = useSubscription();
  const { cancelSubscription, isCancelling } = useCancelSubscription();

  if (isSubscriptionLoading || !subscription) {
    return null;
  }

  const formattedDate = formatDate24h(subscription.current_period_end);
  const planName = subscription.billing_cycle
    ? subscription.billing_cycle.charAt(0).toUpperCase() +
      subscription.billing_cycle.slice(1)
    : "Active";

  const isCancelled = subscription.status === "cancel_at_period_end";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[425px] border-primary-green"
        showCloseButton={false}
      >
        <DialogClose className="absolute top-4 right-4 text-gray-300 hover:text-white border-none bg-transparent outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:outline-none">
          <XIcon />
          <span className="sr-only">Close</span>
        </DialogClose>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            Current Subscription
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Manage your subscription and billing details.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex justify-between items-center p-3 rounded-lg bg-gray-800/50 border border-gray-700">
            <div>
              <p className="text-sm font-medium text-gray-400">Plan</p>
              <p className="text-lg font-semibold text-white">{planName} VIP</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-400">
                {isCancelled ? "Ends on" : "Renews on"}
              </p>
              <p className="text-sm font-semibold text-primary-green">
                {formattedDate}
              </p>
            </div>
          </div>

          {isCancelled ? (
            <div className="p-3 rounded-lg bg-yellow-900/20 border border-yellow-700/50 text-yellow-500 text-sm">
              Your subscription is set to cancel on {formattedDate}. You will
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
                </>
              }
              onConfirm={async () => {
                await cancelSubscription();
                onOpenChange(false);
              }}
              trigger={
                <Button
                  variant="default"
                  className="w-full text-red-500 hover:text-red-400 hover:bg-red-500/10"
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
