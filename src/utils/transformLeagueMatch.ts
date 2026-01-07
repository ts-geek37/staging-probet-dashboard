import { RecentMatchProps } from "@/components/RecentMatchCard";
import { UpcomingMatchProps } from "@/components/UpcomingMatchCard";
import { LeagueMatch } from "@/types/leagues";

export type MatchMode = "recent" | "upcoming";
export type MatchWithOptionalLeague = LeagueMatch & {
  leagueName?: string;
};

export const transformToUpcomingMatch = (
  match: MatchWithOptionalLeague,
): UpcomingMatchProps => {
  const kickoff = new Date(match.kickoff_time);
  return {
    date: kickoff.toLocaleDateString(),
    time: kickoff.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    teamA: match.home_team.name,
    teamB: match.away_team.name,
    teamALogo: match?.home_team?.logo ?? "/no-image.png",
    teamBLogo: match?.away_team?.logo ?? "/no-image.png",
  };
};

export const transformToRecentMatch = (
  match: MatchWithOptionalLeague,
): RecentMatchProps => {
  const kickoff = new Date(match.kickoff_time);
  return {
    leagueName: match.leagueName ?? "Unknown League",
    matchDate: kickoff.toLocaleDateString(),
    teamA: {
      name: match.home_team.name,
      logo: match.home_team.logo ?? "/no-image.png",
    },
    teamB: {
      name: match.away_team.name,
      logo: match.away_team.logo ?? "/no-image.png",
    },
  };
};

export function transformLeagueMatch(
  match: MatchWithOptionalLeague,
  mode: MatchMode,
): UpcomingMatchProps | RecentMatchProps {
  switch (mode) {
    case "upcoming":
      return transformToUpcomingMatch(match);
    case "recent":
      return transformToRecentMatch(match);
    default:
      throw new Error(`Unknown mode: ${mode}`);
  }
}
