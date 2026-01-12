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

export type MatchStatus = "UPCOMING" | "LIVE" | "FT" | "LATEST";

export interface MatchTeam {
  id: number;
  name: string;
  logo?: string | null;
}

export interface MatchTeams {
  home: MatchTeam;
  away: MatchTeam;
}

export interface MatchScore {
  home: number | null;
  away: number | null;
}

export interface MatchListItem {
  id: number;
  kickoff_time: string;
  status: MatchStatus;
  league: {
    id: number;
    name: string;
    logo?: string | null;
  };
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

export interface HeadToHeadMatch {
  season: string;
  competition: string;
  home: string;
  homeLogo?: string | null;
  away: string;
  awayLogo?: string | null;
  score: string; 
  date: string;
  venue?: string | null;
  status: "Finished" | "LIVE" | "Upcoming" | string;
}

export type HeadToHeadMatches = HeadToHeadMatch[];

export interface MatchDetailViewResponseMap {
  [MatchDetailView.OVERVIEW]: MatchListItem;
  [MatchDetailView.STATS]: MatchStatsResponse;
  [MatchDetailView.LINEUPS]: MatchLineupsResponse;
  [MatchDetailView.EVENTS]: MatchEventsResponse;
  [MatchDetailView.HEAD_TO_HEAD]: MatchEventsResponse;
}
