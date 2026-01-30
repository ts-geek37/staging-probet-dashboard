import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import { Toaster } from "sonner";

import { SubscriptionProvider, SWRProvider } from "@/context";

import Footer from "./Footer";
import Header from "./header";

interface LayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ClerkProvider>
      <SWRProvider>
        <SubscriptionProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            {children}
            <Footer />
          </div>
          <Toaster />
        </SubscriptionProvider>
      </SWRProvider>
    </ClerkProvider>
  );
};

export default AppLayout;
