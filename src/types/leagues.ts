export interface LeagueMatch {
  id: number;
  kickoff_time: string;
  status: "UPCOMING" | "LIVE" | "FT";
  home_team: MatchTeam;
  away_team: MatchTeam;
}

export interface LeagueStats {
  total_goals: number;
  clean_sheets: number;
  yellow_cards: number;
  goals_per_match: number;
  top_scorers: Array<{
    player_id: number;
    name: string;
    team: string;
    team_logo_url: string;
    goals: number;
  }>;
}

export interface LeagueTeams {
  teams: Array<{
    id: number;
    name: string;
    logo: string;
  }>;
}

export interface TopScorerTableSchema {
  typeId: number;
  code: string;
  label: string;
  entity: TopScorerEntity;
  metric: TopScorerMetric;
  unit: string | null;
  sortable: boolean;
  defaultSort: "position";
}

export type TopScorerEntity = "player";
export type TopScorerMetric = "count";

export interface TopScorerRow {
  position: number;
  total: number;
  player: {
    id: number;
    name: string;
    image: string | null;
  };
  team: {
    id: number;
    name: string;
    logo: string | null;
  };
}

export interface TopScorerTable {
  typeId: number;
  code: string;
  label: string;
  rows: TopScorerRow[];
}

export interface TopScorersResponse {
  league: {
    id: number;
    name: string;
  };
  season: CurrentSeason;

  schema: {
    tables: Record<string, TopScorerTableSchema>;
    order: string[];
  };

  tables: Record<string, TopScorerTable>;
}

export enum LeagueView {
  OVERVIEW = "profile",
  STANDINGS = "standings",
  STATISTICS = "stats",
  MATCHES = "matches",
  TOP_SCORERS = "top-scorers",
}
export interface LeagueViewResponseMap {
  [LeagueView.OVERVIEW]: LeagueProfileResponse;
  [LeagueView.STANDINGS]: LeagueStandingsResponse;
  [LeagueView.STATISTICS]: LeagueStatisticsResponse;
  [LeagueView.MATCHES]: LeagueMatchesResponse;
  [LeagueView.TOP_SCORERS]: TopScorersResponse;
}
export enum MatchListStatus {
  LIVE = "live",
  UPCOMING = "upcoming",
  TOMORROW = "tomorrow",
  FINISHED = "finished",
}

export interface LeagueCard {
  id: number;
  name: string;
  logo: string | null;
  competition_type: "league" | "cup";
  country: {
    name: string;
    code: string | null;
    flag: string | null;
  };
}

export interface LeaguesListResponse {
  data: LeagueCard[];
  pagination: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total_item: number;
  total_pages: number;
  has_next: boolean;
}

export interface Country {
  name: string;
  code: string | null;
  flag: string | null;
}

export interface StageInfo {
  id: number;
  name: string;
  starting_at: string | null;
  ending_at: string | null;
}
export interface LeagueSeasonInfo {
  id: number;
  name: string;
  starting_at: string | null;
  ending_at: string | null;
  stages?: StageInfo[];
  stage: StageInfo | null;
}

export interface LeagueProfileResponse {
  id: number;
  name: string;
  logo: string | null;
  competition_type: "league" | "cup";
  country: Country;
  current_season: LeagueSeasonInfo | null;
}
export interface LeagueStanding {
  position: number;
  team: {
    id: number;
    name: string;
    logo: string | null;
  };
  points: number;
}
export interface LeagueStandingsResponse {
  league: {
    id: number;
    name: string;
    country: string;
  };
  season: LeagueSeasonInfo;
  table: {
    position: number;
    team: {
      id: number;
      name: string;
      logo: string | null;
    };
    points: number;
  }[];
}
export type CurrentSeason = LeagueSeasonInfo;

export interface LeagueSeasonStatistics {
  season: CurrentSeason;
  overview: {
    matches_played: number | null;
    total_goals: number | null;
    average_goals_per_match: number | null;
  };
  scoring: {
    home_goals_percentage: number | null;
    away_goals_percentage: number | null;
    over_25_percentage: number | null;
    under_25_percentage: number | null;
  };
  discipline: {
    yellow_cards: number | null;
    red_cards: number | null;
    average_yellow_cards: number | null;
    average_red_cards: number | null;
  };
}

export interface LeagueStatisticsResponse {
  league: {
    id: number;
    name: string;
  };
  seasons: LeagueSeasonStatistics[];
}
export interface MatchTeam {
  id: number;
  name: string;
  logo: string | null;
}

export interface MatchScore {
  home: number | null;
  away: number | null;
}

export interface MatchTeams {
  home: MatchTeam;
  away: MatchTeam;
}
export type MatchStatus = "UPCOMING" | "LIVE" | "FINISHED";

export interface MatchListItem {
  id: number;
  kickoff_time: string;
  status: MatchStatus;
  league: {
    id: number;
    name: string;
    logo: string | null;
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

export interface LeagueMatchesResponse {
  league: {
    id: number;
    name: string;
  };
  season: CurrentSeason;
  matches: MatchListItem[];
}
