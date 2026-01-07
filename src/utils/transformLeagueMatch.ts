import { RecentMatchProps } from "@/components/RecentMatchCard";
import { UpcomingMatchProps } from "@/components/UpcomingMatchCard";
import { MatchListItem } from "@/types/leagues";

export type MatchMode = "recent" | "upcoming";
export type MatchWithOptionalLeague = MatchListItem & {
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
    teamA: match.teams.home.name,
    teamB: match.teams.away.name,
    teamALogo: match?.teams?.home?.logo ?? "/no-image.png",
    teamBLogo: match?.teams?.away?.logo ?? "/no-image.png",
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
      name: match.teams.home.name,
      logo: match.teams.home.logo ?? "/no-image.png",
      score: match.score?.home ?? 0,
    },
    teamB: {
      name: match.teams.away.name,
      logo: match.teams.away.logo ?? "/no-image.png",
      score: match.score?.away ?? 0,
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
