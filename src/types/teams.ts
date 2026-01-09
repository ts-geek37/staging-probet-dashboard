// src/types/team.ts
export interface TeamCountryApi {
  name: string;
  code?: string;
  flag?: string;
}

export interface TeamStadiumApi {
  name?: string;
  capacity?: number;
}

export interface TeamSeasonApi {
  id: number;
  name: string;
}

export interface TeamOverviewResponse {
  id: number;
  name: string;
  short_code?: string;
  logo?: string;
  founded?: number;
  country?: TeamCountryApi;
  stadium?: TeamStadiumApi;
  current_season?: TeamSeasonApi;
}

import { PaginationMeta } from "./leagues";

export interface TeamListResponse {
  data: TeamOverviewResponse[];
  pagination: PaginationMeta;
}

export interface TeamHeaderApi {
  id: number;
  name: string;
  short_code?: string;
  logo?: string;
  founded?: number;
  country?: TeamCountryApi;
  stadium?: TeamStadiumApi;
  current_season?: TeamSeasonApi;
}

export interface OverviewSection {
  key: string;
  title: string;
  columns: string;
  colSpan?: string;
  items: {
    label: string;
    value: string | number;
    variant: "default" | "stat";
  }[];
}

export interface PlayerPosition {
  id: number;
  label: string;
}

export interface PlayerContract {
  start: string;
  end: string;
}

export interface PlayerApi {
  id: number;
  name: string;
  photo: string | null;
  position: PlayerPosition;
  jersey_number: number | null;
  nationality: string;
  contract: {
    start: string;
    end: string;
  };
}

export interface TeamPlayersResponse {
  team_id: number;
  players: PlayerApi[];
}

export interface PlayerWithFlag extends PlayerApi {
  flagUrl: string;
}

export interface SquadSection {
  key: string;
  label: string;
  players: PlayerWithFlag[];
}

export interface TeamMatchLeagueApi {
  id: number;
  name: string;
  logo: string;
}

export interface TeamMatchSideApi {
  id: number;
  name: string;
  logo: string | null;
}

export interface TeamMatchTeamsApi {
  home: TeamMatchSideApi;
  away: TeamMatchSideApi;
}

export interface TeamMatchScoreApi {
  home: number;
  away: number;
}

export interface TeamMatchApi {
  id: number;
  kickoff_time: string;
  status: string;
  league: TeamMatchLeagueApi;
  teams: TeamMatchTeamsApi;
  score?: TeamMatchScoreApi;
}

export interface TeamMatchesResponse {
  latest: TeamMatchApi[];
  upcoming: TeamMatchApi[];
}

export interface SeasonStatsApi {
  season: {
    id: number;
    name: string;
  };
  stats: {
    goals_for: number;
    goals_against: number;
    shots: number;
    yellow_cards: number;
    red_cards: number;
    minutes_played: number;
    clean_sheets: number;
    wins: number;
    draws: number;
    losses: number;
  };
}

export interface TeamStatsApi {
  team: {
    id: number;
    name: string;
    logo: string;
  };
  seasons: SeasonStatsApi[];
}

export interface StatItem {
  label: string;
  value: string | number;
  color?: string;
}

export enum TeamDetailView {
  OVERVIEW = "overview",
  MATCHES = "matches",
  SQUAD = "squad",
  STATS = "stats",
}
