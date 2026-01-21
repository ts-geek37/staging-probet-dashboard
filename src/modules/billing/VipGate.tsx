import { ReactNode } from "react";
import { useSubscription } from "./hooks";

type Props = {
  children: ReactNode;
  fallback?: ReactNode;
};

const VipGate = ({ children, fallback }: Props) => {
  const { subscription, loading } = useSubscription();

  if (loading) return null;
  if (!subscription?.is_vip) return fallback ?? null;

  return <>{children}</>;
};

export default VipGate;
