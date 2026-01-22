"use client";

import { SWRConfig } from "swr";

import { useSwrFetcher } from "@/lib/swrFetcher";

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
