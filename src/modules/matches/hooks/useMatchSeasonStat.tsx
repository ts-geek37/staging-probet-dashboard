import {
  BarChart3,
  BookOpen,
  Shield,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useMemo } from "react";
import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import {
  MatchDetailView,
  MatchDetailViewResponseMap,
  MatchesTeamStats,
} from "@/types/matches";

import { StatRowProps } from "../components/StatSection";

interface QuickStatCardConfig {
  label: string;
  icon: React.ReactNode;
  homeValue: string | number;
  awayValue: string | number;
}

interface StatSectionConfig {
  title: string;
  icon: React.ReactNode;
  rows: StatRowProps[];
}
const num = (value?: number): number => value ?? 0;

const perGame = (total?: number, games?: number): string | number =>
  games ? (num(total) / games).toFixed(1) : 0;
const fixed = (value?: number, digits = 1): string =>
  value !== undefined ? value.toFixed(digits) : "0.0";

const useMatchSeasonStat = (matchId: number, seasonId?: number) => {
  const { data, error, isLoading } = useSWR<
    ApiResponse<MatchDetailViewResponseMap[MatchDetailView.SEASON_STATS]>
  >(`/api/v2/matches/${matchId}/team-stats/${seasonId}`);

  const stats = data?.data as MatchesTeamStats;
  const home = stats?.home;
  const away = stats?.away;

  const statSections = useMemo<StatSectionConfig[]>(() => {
    if (!home || !away) return [];

    const h = home?.stats;
    const a = away?.stats;

    const winRate = (wins?: number, games?: number) =>
      games ? fixed((num(wins) / games) * 100) : "0.0";

    return [
      {
        title: "General",
        icon: <BarChart3 className="h-4 w-4 text-blue-500" />,
        rows: [
          {
            label: "Matches Played",
            homeValue: num(h.games_played),
            awayValue: num(a.games_played),
          },
          {
            label: "Wins",
            homeValue: num(h.wins),
            awayValue: num(a.wins),
          },
          {
            label: "Draws",
            homeValue: num(h.draws),
            awayValue: num(a.draws),
          },
          {
            label: "Losses",
            homeValue: num(h.losses),
            awayValue: num(a.losses),
            isHigherBetter: false,
          },
          {
            label: "Points Per Game",
            homeValue: fixed(h.points_per_game),
            awayValue: fixed(a.points_per_game),
          },
          {
            label: "Win Rate",
            homeValue: winRate(h.wins, h.games_played),
            awayValue: winRate(a.wins, a.games_played),
            suffix: "%",
          },
        ],
      },
      {
        title: "Discipline & Style",
        icon: <BookOpen className="h-4 w-4 text-purple-500" />,
        rows: [
          {
            label: "Yellow Cards",
            homeValue: num(h.yellow_cards),
            awayValue: num(a.yellow_cards),
            isHigherBetter: false,
          },
          {
            label: "Red Cards",
            homeValue: num(h.red_cards),
            awayValue: num(a.red_cards),
            isHigherBetter: false,
          },
          {
            label: "Possession",
            homeValue: fixed(h.possession),
            awayValue: fixed(a.possession),
            suffix: "%",
          },
          {
            label: "Pass Accuracy",
            homeValue: fixed(h.pass_stats?.accuracy_percentage),
            awayValue: fixed(a.pass_stats?.accuracy_percentage),
            suffix: "%",
          },
          {
            label: "Avg. Age",
            homeValue: fixed(h.average_player_age),
            awayValue: fixed(a.average_player_age),
            isHigherBetter: false,
          },
          {
            label: "Avg. Height",
            homeValue: num(h?.average_player_height ?? 0),
            awayValue: num(a?.average_player_height ?? 0),
            suffix: "cm",
          },
        ],
      },

      {
        title: "Attack",
        icon: <Zap className="h-4 w-4 text-yellow-500" />,
        rows: [
          {
            label: "Goals For",
            homeValue: num(h.goals_for),
            awayValue: num(a.goals_for),
          },
          {
            label: "Expected Goals",
            homeValue: fixed(h.expected_goals),
            awayValue: fixed(a.expected_goals),
          },
          {
            label: "Shots Per Game",
            homeValue: perGame(h.shots, h.games_played),
            awayValue: perGame(a.shots, a.games_played),
          },
          {
            label: "Shot Acc.",
            homeValue: fixed(h.shot_on_target_percentage),
            awayValue: fixed(a.shot_on_target_percentage),
            suffix: "%",
          },
          {
            label: "Conversion",
            homeValue: fixed(h.shot_conversion_rate),
            awayValue: fixed(a.shot_conversion_rate),
            suffix: "%",
          },
        ],
      },

      {
        title: "Defense",
        icon: <Shield className="h-4 w-4 text-primary-green" />,
        rows: [
          {
            label: "Goals Against",
            homeValue: num(h.goals_against),
            awayValue: num(a.goals_against),
            isHigherBetter: false,
          },
          {
            label: "Clean Sheets",
            homeValue: num(h.clean_sheets),
            awayValue: num(a.clean_sheets),
          },
          {
            label: "Rating",
            homeValue: fixed(h.rating),
            awayValue: fixed(a.rating),
          },
        ],
      },
    ];
  }, [home, away]);

  const quickStatCards = useMemo<QuickStatCardConfig[]>(() => {
    if (!home || !away) return [];

    return [
      {
        label: "Scored First",
        icon: <Target className="h-6 w-6 text-red-500" />,
        homeValue: num(home.stats.goal_results?.scored_first),
        awayValue: num(away.stats.goal_results?.scored_first),
      },
      {
        label: "Both Halves Scored",
        icon: <TrendingUp className="h-6 w-6 text-orange-500" />,
        homeValue: num(home.stats.half_results?.scored_both_halves),
        awayValue: num(away.stats.half_results?.scored_both_halves),
      },
      {
        label: "Avg. Player Rating",
        icon: <BarChart3 className="h-6 w-6 text-indigo-500" />,
        homeValue: fixed(home.stats.rating),
        awayValue: fixed(away.stats.rating),
      },
    ];
  }, [home, away]);

  return {
    stats,
    statSections,
    error,
    isLoading,
    quickStatCards,
  };
};

export default useMatchSeasonStat;
