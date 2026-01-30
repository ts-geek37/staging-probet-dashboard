"use client";

import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import useSWRMutation from "swr/mutation";

import { useSubscription } from "@/context";

import { toast } from "sonner";
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
        console.log("Cancelling subscription...");
        toast.success(res?.message ?? "Subscription cancelled successfully");

        setTimeout(async () => {
          await refresh();
          setIsPendingCancel(false);
          console.log("Subscription cancelled");
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
      console.error("Cancellation error:", err);
    }
  };

  return {
    cancelSubscription,
    isCancelling: isMutating,
    isPendingCancel,
    error,
  };
};

export default useCancelSubscription;
