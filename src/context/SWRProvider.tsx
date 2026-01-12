"use client";

import { useSwrFetcher } from "@/lib/swrFetcher";
import { SWRConfig } from "swr";

interface Props {
  children: React.ReactNode;
}

const SWRProvider: React.FC<Props> = ({ children }) => {
  const fetcher = useSwrFetcher();
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
        revalidateIfStale: true,
        dedupingInterval: 2000,
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SWRProvider;
