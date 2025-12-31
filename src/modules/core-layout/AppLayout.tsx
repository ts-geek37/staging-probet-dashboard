import React from "react";
import { Toaster } from "sonner";

import { ClerkProviderWrapper, StoreProvider } from "@/context";

import Footer from "./Footer";
import Header from "./header";

interface LayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ClerkProviderWrapper>
      <StoreProvider>
        <Header />
        {children}
        <Footer />
        <Toaster />
      </StoreProvider>
    </ClerkProviderWrapper>
  );
};

export default AppLayout;
