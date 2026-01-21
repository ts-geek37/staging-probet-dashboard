"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useEffect } from "react";

import { useLeagues } from "@/modules/leagues/hooks/useLeagues";
import { MatchListStatus } from "@/types/matches";

import type { League } from "../components/LeagueSelectDropdown";

const useMatchFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [leagueSearch, setLeagueSearch] = useState("");
  const [search, setSearch] = useState(searchParams.get("q") ?? "");

  const statusParam = searchParams.get("status");
  const leagueIdParam = searchParams.get("leagueId");

  const status = useMemo(() => {
    const values = Object.values(MatchListStatus) as string[];
    if (statusParam && values.includes(statusParam)) {
      return statusParam as MatchListStatus;
    }
    return MatchListStatus.LIVE;
  }, [statusParam]);

  const selectedLeagueId = useMemo(() => {
    const parsed = Number(leagueIdParam);
    return !isNaN(parsed) ? parsed : undefined;
  }, [leagueIdParam]);

  const teamIdParam = searchParams.get("teamId");
  const teamId = useMemo<number | undefined>(() => {
    if (!teamIdParam) return undefined;
    const parsed = Number(teamIdParam);
    return isNaN(parsed) ? undefined : parsed;
  }, [teamIdParam]);

  const { leagues, isLoading: isLeaguesLoading } = useLeagues({
    search: leagueSearch,
    fetchAll: true,
  });

  const selectedLeague = useMemo<League | null>(() => {
    if (selectedLeagueId === undefined) return null;
    const league = leagues.find((l) => l.id === selectedLeagueId);
    if (!league) return null;
    return { id: league.id, name: league.name, logo: league.logo || "/no-image.png" };
  }, [selectedLeagueId, leagues]);

  const updateParams = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined) {
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

  const handleLeagueChange = (league: League | null) => {
    setSearch("");
    updateParams({
      leagueId: league ? league.id.toString() : undefined,
      q: undefined,
    });
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  useEffect(() => {
    const qFromQuery = searchParams.get("q") ?? "";
    setSearch(qFromQuery);
  }, [searchParams]);

  return {
    status,
    selectedLeagueId,
    selectedLeague,
    leagues,
    isLeaguesLoading,
    search,
    leagueSearch,
    setLeagueSearch,
    handleStatusChange,
    handleLeagueChange,
    handleSearchChange,
    teamId,
  };
};

export default useMatchFilters;
