import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { MatchListStatus } from "@/types/matches";

const useMatchFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const statusParam = searchParams.get("status");
  const leagueIdParam = searchParams.get("leagueId");
  const searchQueryParam = searchParams.get("search");
  const [search, setSearch] = useState(searchQueryParam ?? "");

  const status = useMemo(() => {
    const values = Object.values(MatchListStatus) as string[];
    if (statusParam && values.includes(statusParam)) {
      return statusParam as MatchListStatus;
    }
    return MatchListStatus.LIVE;
  }, [statusParam]);

  const selectedLeagueId = useMemo(() => {
    const parsed = Number(leagueIdParam);
    return !isNaN(parsed) && leagueIdParam !== null ? parsed : null;
  }, [leagueIdParam]);

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleStatusChange = (newStatus: MatchListStatus) => {
    updateParams({ status: newStatus });
  };

  const handleLeagueChange = (leagueId: number | null) => {
    updateParams({ leagueId: leagueId?.toString() || null });
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  return {
    status,
    selectedLeagueId,
    handleStatusChange,
    handleLeagueChange,
    handleSearchChange,
    search,
  };
};
export default useMatchFilters;
