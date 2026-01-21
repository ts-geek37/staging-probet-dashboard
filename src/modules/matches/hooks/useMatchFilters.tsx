"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { useLeagues } from "@/modules/leagues/hooks/useLeagues";
import { MatchListStatus } from "@/types/matches";
import type { League } from "../components/LeagueSelectDropdown";

const useMatchFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [leagueSearch, setLeagueSearch] = useState("");
  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  const statusParam = searchParams.get("status");
  const leagueIdParam = searchParams.get("leagueId");

  /** -------- Status -------- */
  const status = useMemo(() => {
    const values = Object.values(MatchListStatus) as string[];
    if (statusParam && values.includes(statusParam)) {
      return statusParam as MatchListStatus;
    }
    return MatchListStatus.LIVE;
  }, [statusParam]);

  /** -------- League ID (URL) -------- */
  const selectedLeagueId = useMemo(() => {
    const parsed = Number(leagueIdParam);
    return !isNaN(parsed) && leagueIdParam !== null ? parsed : null;
  }, [leagueIdParam]);

  /** -------- Leagues data -------- */
  const { leagues, isLoading: isLeaguesLoading } = useLeagues({
    search: leagueSearch,
    fetchAll: true,
  });

  /** -------- Selected league (derived) -------- */
  const selectedLeague = useMemo<League | null>(() => {
    if (!selectedLeagueId) return null;

    const league = leagues.find((l) => l.id === selectedLeagueId);
    if (!league) return null;

    return {
      id: league.id,
      name: league.name,
      logo: league.logo || "/no-image.png",
    };
  }, [selectedLeagueId, leagues]);

  /** -------- URL updater -------- */
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

  /** -------- Handlers -------- */
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
    selectedLeague,
    leagues,
    isLeaguesLoading,

    handleStatusChange,
    handleLeagueChange,
    handleSearchChange,

    leagueSearch,
    setLeagueSearch,
    search,
  };
};

export default useMatchFilters;
