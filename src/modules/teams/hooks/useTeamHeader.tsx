import { useMemo } from "react";

import { TeamBase } from "@/types/teams";

interface UseTeamsHeaderResult extends TeamBase {
  shortName: string;
}

const useTeamHeader = (team: TeamBase | null): UseTeamsHeaderResult | null => {
  return useMemo(() => {
    if (!team) return null;

    const words = team?.name.split(" ").filter(Boolean);

    const shortName =
      words.length === 1
        ? words[0].slice(0, 3).toUpperCase()
        : words.map((word) => word[0].toUpperCase()).join("");

    return {
      shortName,
      ...team,
    };
  }, [team]);
};
export default useTeamHeader;
