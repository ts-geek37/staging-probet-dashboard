import { LeagueView } from "@/types/leagues";

export const LeagueTabs = [
  { value: LeagueView.OVERVIEW, label: "Overview" },
  { value: LeagueView.STANDINGS, label: "Standings" },
  { value: LeagueView.MATCHES, label: "Matches" },
  { value: LeagueView.TEAMS, label: "Teams" },
  { value: LeagueView.STATS, label: "Stats" },
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
