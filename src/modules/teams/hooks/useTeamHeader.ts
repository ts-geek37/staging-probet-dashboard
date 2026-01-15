import { useMemo } from "react";

import { TeamHeaderApi } from "@/types/teams";

export interface UseTeamHeaderResult {
  id: number;
  name: string;
  shortName: string;
  logo: string | null;
  countryName?: string;
  countryFlag?: string;
}

const useTeamHeader = (
  team: TeamHeaderApi | null,
): UseTeamHeaderResult | null => {
  return useMemo(() => {
    if (!team) return null;

    const shortName =
      team.short_code ??
      team.name
        .split(" ")
        .filter(Boolean)
        .map((w) => w[0])
        .join("")
        .slice(0, 3)
        .toUpperCase();

    return {
      id: team.id,
      name: team.name,
      shortName,
      logo: team.logo ?? null,
      countryName: team.country?.name,
      countryFlag: team.country?.flag,
    };
  }, [team]);
};

export default useTeamHeader;
