import { PaginationMeta } from "./leagues";

export enum MatchListStatus {
  LIVE = "live",
  UPCOMING = "upcoming",
  FINISHED = "finished",
}

export interface MatchListFilters {
  tab: MatchStatus;
  page: number;
  limit: number;
  q?: string;
}

export type MatchStatus =
  | "UPCOMING"
  | "LIVE"
  | "FINISHED"
  | "PROBLEM"
  | "HALF_TIME";

export interface MatchTeam {
  id: number;
  name: string;
  logo: string | null;
}

export interface MatchTeams {
  home: MatchTeam;
  away: MatchTeam;
}

export interface MatchScore {
  home: number | null;
  away: number | null;
}

export interface LivePeriod {
  id: number;
  typeId: number;
  description: string | null;

  ticking: boolean;

  minutes: number | null;
  seconds: number | null;

  timeAdded: number | null;
  hasTimer: boolean;
}

export interface MatchListItem {
  id: number;
  kickoff_time: string;
  status: MatchStatus;
  league: {
    id: number;
    name: string;
    logo: string | null;
  };
  result_info?: string | null;
  live_period?: LivePeriod | null;
  season?: {
    id: number;
    name: string;
  };
  venue?: {
    id?: number;
    name?: string;
    capacity?: number;
    city?: string;
    country?: string;
    surface?: string;
    image?: string;
  };
  teams: MatchTeams;
  score?: MatchScore;
  referee?: string;
  prediction?: {
    home: number;
    draw: number;
    away: number;
  } | null;
}

export interface MatchesListResponse {
  tab: MatchStatus;
  data: MatchListItem[];
  pagination: PaginationMeta;
}

export interface MatchStatsResponse {
  match_id: number;
  teams: MatchStatsTeam[];
}

export interface MatchStatsTeam {
  team: MatchTeam;
  statistics: Record<string, number | null>;
}

export enum MatchDetailView {
  OVERVIEW = "overview",
  STATS = "stats",
  LINEUPS = "lineups",
  EVENTS = "events",
  HEAD_TO_HEAD = "head-to-head",
  COMMENTS = "comments",
  SEASON_STATS = "season-stats",
  PREDICTION = "Predictions",
}

export interface MatchLineupsResponse {
  match_id: number;
  teams: MatchLineupTeam[];
}

export interface MatchLineupTeam {
  team: {
    id: number;
    name: string;
    logo: string | null;
  };
  formation: string | null;
  starting_xi: LineupPlayer[];
  substitutes: LineupPlayer[];
}

export interface LineupPlayer {
  id: number;
  name: string;
  number: number | null;
  position_id: number | null;
  formation_field: string | null;
  formation_position: number | null;
}
export type MatchEventType =
  | "GOAL"
  | "OWN_GOAL"
  | "PENALTY_GOAL"
  | "CARD"
  | "SUBSTITUTION"
  | "PERIOD_START"
  | "PERIOD_END"
  | "VAR"
  | "SYSTEM"
  | "OTHER";

export interface MatchEventItem {
  id: number;
  minute: number | null;
  extra_minute: number | null;
  type: MatchEventType;
  team: {
    id: number;
    name: string;
    logo: string | null;
  } | null;
  player?: {
    id: number;
    name: string;
  };
  related_player?: {
    id: number;
    name: string;
  };
  detail: string | null;
}

export interface MatchEventsResponse {
  match_id: number;
  events: MatchEventItem[];
}

export interface SportMonksFixtureComment {
  id: number;
  fixture_id: number;
  comment: string;
  minute: number;
  extra_minute: number | null;
  is_goal: boolean;
  is_important: boolean;
  order: number;
}

export interface MinuteBucket {
  count: number;
  percentage: number;
}

export type MinuteDistribution = Record<
  "0-15" | "15-30" | "30-45" | "45-60" | "60-75" | "75-90",
  MinuteBucket
>;
export interface MostScoredHalfStats {
  most_scored_half: "1st-half" | "2nd-half";
  most_scored_half_goals: number;
  details: {
    "1st-half": {
      period: "1st-half";
      total: number;
    };
    "2nd-half": {
      period: "2nd-half";
      total: number;
    };
  };
}

export interface TeamStatistics {
  games_played?: number;
  minutes_played?: number;

  wins?: number;
  draws?: number;
  losses?: number;
  points_per_game?: number;

  goals_for?: number;
  goals_against?: number;
  expected_goals?: number;
  clean_sheets?: number;
  failed_to_score?: number;

  shots?: number;
  corners?: number;
  attacks?: number;
  dangerous_attacks?: number;
  possession?: number;
  penalties?: number;
  offsides?: number;
  assists?: number;

  tackles?: number;
  fouls?: number;

  yellow_cards?: number;
  red_cards?: number;
  yellow_red_cards?: number;
  fouls_per_card?: number;

  rating?: number;
  highest_rated_player?: number | null;

  average_player_height?: number | null;
  average_player_age?: number;
  foreign_players?: number;
  appearing_players?: number;
  national_team_players?: number;

  penalty_conversion_rate?: number;
  shot_conversion_rate?: number;
  shot_on_target_percentage?: number;
  scoring_frequency?: number;

  scoring_minutes?: MinuteDistribution;
  conceded_scoring_minutes?: MinuteDistribution;
  most_scored_half?: MostScoredHalfStats;
  most_frequent_scoring_minute?: {
    minute: number;
    goals: number;
  };
  half_results?: {
    won_both_halves: number;
    scored_both_halves: number;
    comebacks: number;
  };
  goal_results?: {
    scored_first: number;
    conceded_first: number;
    wins_when_scoring_first: number;
  };
  interception_stats?: {
    total: number;
    per_match: number;
  };
  pass_stats?: {
    total: number;
    accurate: number;
    accuracy_percentage: number;
  };
  assist_stats?: {
    total: number;
    per_match: number;
  };
  players_footing?: {
    left: number;
    right: number;
    both: number;
  };
  most_substituted_players?: {
    player_id: number;
    name: string;
    substitutions: number;
  }[];
  most_injured_players?: {
    player_id: number;
    name: string;
    injuries: number;
  }[];
  team_of_the_week?: {
    appearances: number;
    players: {
      id: number;
      name: string;
      position: string | null;
    }[];
  };
  injury_time_goals?: {
    total: number;
    average: number;
  };
}

export interface MatchesTeamStats {
  away: {
    id: number;
    name: string;
    logo: string | null;
    stats: TeamStatistics;
  };
  home: {
    id: number;
    name: string;
    logo: string | null;
    stats: TeamStatistics;
  };
}

export interface MatchDetailViewResponseMap {
  [MatchDetailView.OVERVIEW]: MatchListItem;
  [MatchDetailView.STATS]: MatchStatsResponse;
  [MatchDetailView.LINEUPS]: MatchLineupsResponse;
  [MatchDetailView.EVENTS]: MatchEventsResponse;
  [MatchDetailView.HEAD_TO_HEAD]: { matches: MatchListItem[] };
  [MatchDetailView.COMMENTS]: SportMonksFixtureComment[];
  [MatchDetailView.SEASON_STATS]: MatchesTeamStats;
}
