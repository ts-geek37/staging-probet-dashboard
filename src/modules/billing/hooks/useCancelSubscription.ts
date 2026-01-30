"use client";

import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

import { useSubscription } from "@/context";

import { AUTH_REQUIRED, TOKEN_UNAVAILABLE } from "./useCheckout";

type CancelSubscriptionResponse = {
  message: string;
};

const cancelFetcher = async (
  url: string,
  {
    arg,
  }: {
    arg: { token: string };
  },
): Promise<CancelSubscriptionResponse> => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${arg.token}`,
    },
  });

  if (!res.ok) {
    throw new Error(`CANCELLATION_FAILED_${res.status}`);
  }
  const json = await res.json();

  return json?.data;
};

const useCancelSubscription = () => {
  const { isSignedIn, getToken } = useAuth();
  const [isPendingCancel, setIsPendingCancel] = useState(false);
  const { refresh } = useSubscription();

  const { trigger, isMutating, error } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v2/billing/cancel-subscription`,
    cancelFetcher,
    {
      onSuccess: async (res) => {
        setIsPendingCancel(true);
        toast.success(res?.message ?? "Subscription cancelled successfully");

        setTimeout(async () => {
          await refresh();
          setIsPendingCancel(false);
        }, 2000);
      },
      onError: (err: Error) => {
        toast.error(
          err.message.startsWith("CANCELLATION_FAILED_")
            ? "Failed to cancel subscription. Please try again."
            : err.message,
        );
        setIsPendingCancel(true);
        setTimeout(async () => {
          await refresh();
          setIsPendingCancel(false);
        }, 2000);
      },
    },
  );

  const cancelSubscription = async () => {
    try {
      if (!isSignedIn) {
        throw new Error(AUTH_REQUIRED);
      }

      const token = await getToken();
      if (!token) {
        throw new Error(TOKEN_UNAVAILABLE);
      }
      const result = await trigger({ token });

      return result;
    } catch (err) {
      console.log("Cancellation error:", err);
      setIsPendingCancel(false);
    }
  };

  return {
    cancelSubscription,
    isCancelling: isMutating || isPendingCancel,
    error,
  };
};

export default useCancelSubscription;
