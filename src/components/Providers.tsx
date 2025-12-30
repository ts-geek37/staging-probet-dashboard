"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";
import Toaster from "./ui/sonner";

const ClerkProvider = dynamic(
  () => import("@clerk/nextjs").then((m) => m.ClerkProvider),
  { ssr: false }
);

const Providers: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      {children}
      <Toaster />
    </ClerkProvider>
  );
};

export default Providers;
