import { LeagueView } from "@/types/leagues";

export const LeagueTabs = [
  // { value: LeagueView.OVERVIEW, label: "Overview" },
  { value: LeagueView.STANDINGS, label: "Standings" },
  { value: LeagueView.MATCHES, label: "Matches" },
  { value: LeagueView.STATISTICS, label: "Stats" },
];
type LeagueStatsKey =
  | "total_teams"
  | "matches_played"
  | "goals_scored"
  | "goals_per_match";

export const overviewStats: {
  key: LeagueStatsKey;
  label: string;
  format: boolean;
}[] = [
  {
    key: "total_teams",
    label: "Total Teams",
    format: false,
  },
  {
    key: "matches_played",
    label: "Matches Played",
    format: false,
  },
  {
    key: "goals_scored",
    label: "Goals Scored",
    format: false,
  },
  {
    key: "goals_per_match",
    label: "Goals per Match",
    format: true,
  },
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
