import { LeagueView } from "@/types/leagues";

export const LeagueTabs = [
  { value: LeagueView.STANDINGS, label: "Standings" },
  { value: LeagueView.MATCHES, label: "Matches" },
  { value: LeagueView.STATISTICS, label: "Stats" },
];

export const statsConfigMap = {
  matches_played: "Matches Played",
  total_goals: "Total Goals",
  average_goals_per_match: "Goals per Match",
} as const;

export const scoringStatMap: Record<string, { label: string; suffix: string }> =
  {
    home_goals_percentage: { label: "Home Goals", suffix: "%" },
    away_goals_percentage: { label: "Away Goals", suffix: "%" },
    over_25_percentage: { label: "Over 2.5", suffix: "%" },
    under_25_percentage: { label: "Under 2.5", suffix: "%" },
  };

export const disciplineStatMap: Record<
  string,
  { label: string; valueClassName: string }
> = {
  yellow_cards: {
    label: "Yellow Cards",
    valueClassName: "text-primary-yellow",
  },
  average_yellow_cards: {
    label: "Avg Yellow Cards",
    valueClassName: "text-primary-yellow",
  },
  red_cards: {
    label: "Red Cards",
    valueClassName: "text-red-500",
  },
  average_red_cards: {
    label: "Avg Red Cards",
    valueClassName: "text-red-500",
  },
};
