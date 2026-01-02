"use client";

import { SWRConfig } from "swr";

import { swrFetcher } from "@/lib/swrFetcher";

interface Props {
  children: React.ReactNode;
}

const SWRProvider: React.FC<Props> = ({ children }) => {
  return (
    <SWRConfig
      value={{
        fetcher: swrFetcher,
        revalidateOnFocus: false,
        revalidateIfStale: true,
        dedupingInterval: 30_000,
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SWRProvider;
