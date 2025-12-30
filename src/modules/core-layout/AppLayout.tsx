import { ClerkProviderWrapper } from "@/context";
import React from "react";
import { Toaster } from "sonner";
interface LayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ClerkProviderWrapper>
      {children}
      <Toaster />
    </ClerkProviderWrapper>
  );
};

export default AppLayout;
