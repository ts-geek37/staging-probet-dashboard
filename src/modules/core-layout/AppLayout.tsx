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
        <div className="min-h-screen flex flex-col">
          <Header />
          {children}
          <Footer />
        </div>
        <Toaster />
      </StoreProvider>
    </ClerkProviderWrapper>
  );
};

export default AppLayout;
