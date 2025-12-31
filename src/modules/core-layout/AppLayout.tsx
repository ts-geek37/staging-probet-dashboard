import { ClerkProviderWrapper, StoreProvider } from "@/context";
import React from "react";
import { Toaster } from "sonner";
interface LayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ClerkProviderWrapper>
      <StoreProvider>
        {children}
        <Toaster />
      </StoreProvider>
    </ClerkProviderWrapper>
  );
};

export default AppLayout;
