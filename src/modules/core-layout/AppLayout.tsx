import { ClerkProviderWrapper } from "@/context";
import React from "react";
import { Toaster } from "sonner";

const AppLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ClerkProviderWrapper>
      {children}
      <Toaster />
    </ClerkProviderWrapper>
  );
};

export default AppLayout;
