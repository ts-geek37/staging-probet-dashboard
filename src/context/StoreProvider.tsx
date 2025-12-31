"use client";

import { Provider } from "react-redux";
import { ReactNode, useRef } from "react";
import { makeStore } from "@/lib/store";

const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const storeRef = useRef<ReturnType<typeof makeStore> | null>(null);
  if (!storeRef.current) storeRef.current = makeStore();

  return <Provider store={storeRef.current}>{children}</Provider>;
};
export default StoreProvider;