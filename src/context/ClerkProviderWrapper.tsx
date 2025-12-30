"use client";

import dynamic from "next/dynamic";
import React from "react";

const ClerkProvider = dynamic(
  () => import("@clerk/nextjs").then((m) => m.ClerkProvider),
  { ssr: false }
);

const ClerkProviderWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default ClerkProviderWrapper;
