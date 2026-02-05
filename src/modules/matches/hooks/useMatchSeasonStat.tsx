import {
  Activity,
  ArrowRight,
  BarChart3,
  BookOpen,
  Shield,
  Target,
  TrendingUp,
  Trophy,
  Users,
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

interface QuickStatCardConfig {
  label: string;
  icon: React.ReactNode;
  homeValue: string | number;
  awayValue: string | number;
}

export interface StatRow {
  label: string;
  homeValue?: string | number;
  awayValue?: string | number;
  suffix?: string;
  isHigherBetter?: boolean;
}

export interface StatSectionConfig {
  title: string;
  icon: React.ReactNode;
  rows: StatRow[];
  className?: string;
}

const fixed = (value?: number, digits = 1): string =>
  value !== undefined ? value.toFixed(digits) : "0.0";

const safeNum = (value: number | null | undefined): number => value ?? 0;

const safeFixed = (value: number | null | undefined): string =>
  value != null ? fixed(value) : "0.0";

const winRate = (wins?: number | null, games?: number | null) => {
  const w = safeNum(wins);
  const g = safeNum(games);
  return g > 0 ? fixed((w / g) * 100) : "0.0";
};

const safePerGame = (total?: number | null, games?: number | null) => {
  const t = safeNum(total);
  const g = safeNum(games);
  return g > 0 ? fixed(t / g) : "0.0";
};

const createRow = (
  label: string,
  homeValue: number | string | null | undefined,
  awayValue: number | string | null | undefined,
  options?: { suffix?: string; isHigherBetter?: boolean },
): StatRow | null => {
  if (homeValue == null && awayValue == null) return null;
  const isZero = (val: any) => {
    if (val === null || val === undefined) return true;
    if (typeof val === "number") return val === 0;
    const cleanVal = val.toString().replace(/[^0-9.]/g, "");
    return cleanVal === "0" || cleanVal === "0.0" || cleanVal === "";
  };

  if (isZero(homeValue) && isZero(awayValue)) return null;

  return {
    label,
    homeValue: homeValue ?? 0,
    awayValue: awayValue ?? 0,
    suffix: options?.suffix,
    isHigherBetter: options?.isHigherBetter,
  };
};

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

    if (!h || !a) return [];

    const sections: StatSectionConfig[] = [
      {
        title: "General",
        icon: <BarChart3 className="h-4 w-4 text-blue-500" />,
        rows: [
          createRow("Matches Played", h.games_played, a.games_played),
          createRow("Minutes Played", h.minutes_played, a.minutes_played),
          createRow("Wins", h.wins, a.wins),
          createRow("Draws", h.draws, a.draws),
          createRow("Losses", h.losses, a.losses, { isHigherBetter: false }),
          createRow(
            "Points Per Game",
            safeFixed(h.points_per_game),
            safeFixed(a.points_per_game),
          ),
          createRow(
            "Win Rate",
            winRate(h.wins, h.games_played),
            winRate(a.wins, a.games_played),
            { suffix: "%" },
          ),
        ].filter((row): row is StatRow => row !== null),
      },
      {
        title: "Scoring Patterns",
        icon: <Target className="h-4 w-4 text-pink-500" />,
        rows: [
          createRow(
            "Most Scored Half",
            h.most_scored_half?.most_scored_half,
            a.most_scored_half?.most_scored_half,
          ),
          createRow(
            "Goals in Most Scored Half",
            h.most_scored_half?.most_scored_half_goals,
            a.most_scored_half?.most_scored_half_goals,
          ),
          createRow(
            "1st Half Goals",
            h.most_scored_half?.details["1st-half"]?.total,
            a.most_scored_half?.details["1st-half"]?.total,
          ),
          createRow(
            "2nd Half Goals",
            h.most_scored_half?.details["2nd-half"]?.total,
            a.most_scored_half?.details["2nd-half"]?.total,
          ),

          // --- ADDED: Scoring Percentages ---
          ...(
            ["0-15", "15-30", "30-45", "45-60", "60-75", "75-90"] as const
          ).flatMap((range) => [
            createRow(
              `Goals ${range} min`,
              h.scoring_minutes?.[range]?.count,
              a.scoring_minutes?.[range]?.count,
            ),
            createRow(
              `${range} min Score %`,
              safeFixed(h.scoring_minutes?.[range]?.percentage),
              safeFixed(a.scoring_minutes?.[range]?.percentage),
              { suffix: "%" },
            ),
          ]),

          // --- ADDED: Conceded Percentages ---
          ...(
            ["0-15", "15-30", "30-45", "45-60", "60-75", "75-90"] as const
          ).flatMap((range) => [
            createRow(
              `Conceded ${range} min`,
              h.conceded_scoring_minutes?.[range]?.count,
              a.conceded_scoring_minutes?.[range]?.count,
              { isHigherBetter: false },
            ),
            createRow(
              `${range} min Concede %`,
              safeFixed(h.conceded_scoring_minutes?.[range]?.percentage),
              safeFixed(a.conceded_scoring_minutes?.[range]?.percentage),
              { isHigherBetter: false, suffix: "%" },
            ),
          ]),
        ].filter((row): row is StatRow => row !== null),
      },
      {
        title: "Discipline & Style",
        icon: <BookOpen className="h-4 w-4 text-purple-500" />,
        rows: [
          createRow("Yellow Cards", h.yellow_cards, a.yellow_cards, {
            isHigherBetter: false,
          }),
          createRow("Red Cards", h.red_cards, a.red_cards, {
            isHigherBetter: false,
          }),
          createRow(
            "Yellow-Red Cards",
            h.yellow_red_cards,
            a.yellow_red_cards,
            {
              isHigherBetter: false,
            },
          ),
          createRow(
            "Fouls Per Card",
            safeFixed(h.fouls_per_card),
            safeFixed(a.fouls_per_card),
          ),
          createRow(
            "Possession",
            safeFixed(h.possession),
            safeFixed(a.possession),
            {
              suffix: "%",
            },
          ),
          createRow(
            "Pass Accuracy",
            safeFixed(h.pass_stats?.accuracy_percentage),
            safeFixed(a.pass_stats?.accuracy_percentage),
            { suffix: "%" },
          ),
          createRow("Total Passes", h.pass_stats?.total, a.pass_stats?.total),
          createRow(
            "Accurate Passes",
            h.pass_stats?.accurate,
            a.pass_stats?.accurate,
          ),
          createRow(
            "Avg. Age",
            safeFixed(h.average_player_age),
            safeFixed(a.average_player_age),
            {
              isHigherBetter: false,
            },
          ),
          createRow(
            "Avg. Height",
            h.average_player_height,
            a.average_player_height,
            { suffix: "cm" },
          ),
        ].filter((row): row is StatRow => row !== null),
      },
      {
        title: "Attack",
        icon: <Zap className="h-4 w-4 text-yellow-500" />,
        rows: [
          createRow("Goals For", h.goals_for, a.goals_for),
          createRow(
            "Expected Goals",
            safeFixed(h.expected_goals),
            safeFixed(a.expected_goals),
          ),
          createRow("Shots", h.shots, a.shots),
          createRow(
            "Shots Per Game",
            safePerGame(h.shots, h.games_played),
            safePerGame(a.shots, a.games_played),
          ),
          createRow(
            "Shot Acc.",
            safeFixed(h.shot_on_target_percentage),
            safeFixed(a.shot_on_target_percentage),
            { suffix: "%" },
          ),
          createRow(
            "Conversion Rate",
            safeFixed(h.shot_conversion_rate),
            safeFixed(a.shot_conversion_rate),
            { suffix: "%" },
          ),
          createRow(
            "Scoring Frequency",
            safeFixed(h.scoring_frequency),
            safeFixed(a.scoring_frequency),
          ),
          createRow("Corners", h.corners, a.corners),
          createRow("Penalties", h.penalties, a.penalties),
          createRow(
            "Penalty Conversion",
            safeFixed(h.penalty_conversion_rate),
            safeFixed(a.penalty_conversion_rate),
            { suffix: "%" },
          ),
          createRow("Assists", h.assists, a.assists),
          createRow(
            "Assists Per Match",
            safeFixed(h.assist_stats?.per_match),
            safeFixed(a.assist_stats?.per_match),
          ),
          createRow(
            "Total Assists",
            h.assist_stats?.total,
            a.assist_stats?.total,
          ),
          createRow("Attacks", h.attacks, a.attacks),
          createRow(
            "Dangerous Attacks",
            h.dangerous_attacks,
            a.dangerous_attacks,
          ),
          createRow("Offsides", h.offsides, a.offsides, {
            isHigherBetter: false,
          }),
        ].filter((row): row is StatRow => row !== null),
      },
      {
        title: "Defense",
        icon: <Shield className="h-4 w-4 text-primary-green" />,
        rows: [
          createRow("Goals Against", h.goals_against, a.goals_against, {
            isHigherBetter: false,
          }),
          createRow("Clean Sheets", h.clean_sheets, a.clean_sheets),
          createRow("Failed to Score", h.failed_to_score, a.failed_to_score, {
            isHigherBetter: false,
          }),
          createRow("Rating", safeFixed(h.rating), safeFixed(a.rating)),
          createRow(
            "Interceptions",
            h.interception_stats?.total,
            a.interception_stats?.total,
          ),
          createRow(
            "Interceptions Per Match",
            safeFixed(h.interception_stats?.per_match),
            safeFixed(a.interception_stats?.per_match),
          ),
          createRow("Tackles", h.tackles, a.tackles),
          createRow("Fouls", h.fouls, a.fouls, { isHigherBetter: false }),
        ].filter((row): row is StatRow => row !== null),
      },
      {
        title: "Match Dynamics",
        icon: <TrendingUp className="h-4 w-4 text-orange-500" />,
        rows: [
          createRow(
            "Scored First",
            h.goal_results?.scored_first,
            a.goal_results?.scored_first,
          ),
          createRow(
            "Wins When Scoring First",
            h.goal_results?.wins_when_scoring_first,
            a.goal_results?.wins_when_scoring_first,
          ),
          createRow(
            "Conceded First",
            h.goal_results?.conceded_first,
            a.goal_results?.conceded_first,
            { isHigherBetter: false },
          ),
          createRow(
            "Comebacks",
            h.half_results?.comebacks,
            a.half_results?.comebacks,
          ),
          createRow(
            "Won Both Halves",
            h.half_results?.won_both_halves,
            a.half_results?.won_both_halves,
          ),
          createRow(
            "Scored Both Halves",
            h.half_results?.scored_both_halves,
            a.half_results?.scored_both_halves,
          ),
          createRow(
            "Injury Time Goals",
            h.injury_time_goals?.total,
            a.injury_time_goals?.total,
          ),
          createRow(
            "Avg Injury Time Goals",
            safeFixed(h.injury_time_goals?.average),
            safeFixed(a.injury_time_goals?.average),
          ),
          createRow(
            "Most Frequent Scoring Minute",
            h.most_frequent_scoring_minute?.minute,
            a.most_frequent_scoring_minute?.minute,
          ),
          createRow(
            "Goals at Frequent Minute",
            h.most_frequent_scoring_minute?.goals,
            a.most_frequent_scoring_minute?.goals,
          ),
        ].filter((row): row is StatRow => row !== null),
      },
      {
        title: "Squad Info",
        icon: <Users className="h-4 w-4 text-cyan-500" />,
        rows: [
          createRow(
            "Appearing Players",
            h.appearing_players,
            a.appearing_players,
          ),
          createRow("Foreign Players", h.foreign_players, a.foreign_players),
          createRow(
            "National Team Players",
            h.national_team_players,
            a.national_team_players,
          ),
          createRow(
            "Players Substituted",
            h.most_substituted_players?.length,
            a.most_substituted_players?.length,
            { isHigherBetter: false },
          ),
          createRow(
            "Players Injured",
            h.most_injured_players?.length,
            a.most_injured_players?.length,
            { isHigherBetter: false },
          ),
          createRow(
            "Team of the Week ",
            h.team_of_the_week?.appearances,
            a.team_of_the_week?.appearances,
          ),
          createRow(
            "Left Footed Players",
            h.players_footing?.left,
            a.players_footing?.left,
          ),
          createRow(
            "Right Footed Players",
            h.players_footing?.right,
            a.players_footing?.right,
          ),
          createRow(
            "Both Footed Players",
            h.players_footing?.both,
            a.players_footing?.both,
          ),
          createRow(
            "Highest Rated Player ID",
            h.highest_rated_player,
            a.highest_rated_player,
          ),
        ].filter((row): row is StatRow => row !== null),
      },
    ];

    return sections.filter((section) => section.rows.length > 0);
  }, [home, away]);

  const quickStatCards = useMemo<QuickStatCardConfig[]>(() => {
    if (!home || !away) return [];

    const h = home?.stats;
    const a = away?.stats;

    if (!h || !a) return [];

    const isZeroish = (val: any) => {
      if (val === null || val === undefined) return true;
      const clean = val.toString().replace(/[^0-9.]/g, "");
      return clean === "0" || clean === "0.0" || clean === "";
    };

    const createCard = (
      label: string,
      icon: React.ReactNode,
      homeValue: number | string | null | undefined,
      awayValue: number | string | null | undefined,
    ): QuickStatCardConfig | null => {
      if (isZeroish(homeValue) && isZeroish(awayValue)) return null;

      return {
        label,
        icon,
        homeValue: homeValue ?? 0,
        awayValue: awayValue ?? 0,
      };
    };

    const cards: (QuickStatCardConfig | null)[] = [
      createCard(
        "Win Rate",
        <Trophy className="h-6 w-6 text-yellow-500" />,
        winRate(h.wins, h.games_played) + "%",
        winRate(a.wins, a.games_played) + "%",
      ),
      createCard(
        "Goals For",
        <Target className="h-6 w-6 text-red-500" />,
        h.goals_for,
        a.goals_for,
      ),
      createCard(
        "Clean Sheets",
        <Shield className="h-6 w-6 text-green-500" />,
        h.clean_sheets,
        a.clean_sheets,
      ),
      createCard(
        "Possession",
        <Activity className="h-6 w-6 text-blue-500" />,
        safeFixed(h.possession) + "%",
        safeFixed(a.possession) + "%",
      ),
      createCard(
        "Shot Accuracy",
        <Zap className="h-6 w-6 text-purple-500" />,
        safeFixed(h.shot_on_target_percentage) + "%",
        safeFixed(a.shot_on_target_percentage) + "%",
      ),
      createCard(
        "Team Rating",
        <BarChart3 className="h-6 w-6 text-indigo-500" />,
        safeFixed(h.rating),
        safeFixed(a.rating),
      ),
      createCard(
        "Scored First",
        <TrendingUp className="h-6 w-6 text-orange-500" />,
        h.goal_results?.scored_first,
        a.goal_results?.scored_first,
      ),
      createCard(
        "Pass Accuracy",
        <ArrowRight className="h-6 w-6 text-teal-500" />,
        safeFixed(h.pass_stats?.accuracy_percentage) + "%",
        safeFixed(a.pass_stats?.accuracy_percentage) + "%",
      ),
    ];

    return cards.filter((card): card is QuickStatCardConfig => card !== null);
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
