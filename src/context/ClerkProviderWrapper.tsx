"use client";

import dynamic from "next/dynamic";
import React from "react";
interface WrapperProps {
  children: React.ReactNode;
}

const ClerkProvider = dynamic(
  () => import("@clerk/nextjs").then((m) => m.ClerkProvider),
  { ssr: false }
);

const ClerkProviderWrapper: React.FC<WrapperProps> = ({ children }) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default ClerkProviderWrapper;
