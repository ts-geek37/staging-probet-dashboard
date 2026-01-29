import { ReactNode } from "react";

import { useSubscription } from "@/context";

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

const VipGate = ({ children, fallback }: Props) => {
  const { subscription, isSubscriptionLoading } = useSubscription();

  if (isSubscriptionLoading) return null;
  if (!subscription?.is_vip) return fallback ?? null;

  return <>{children}</>;
};

export default VipGate;
