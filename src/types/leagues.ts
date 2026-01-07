export interface LeagueResponse {
  league: LeagueHeader;
  overview?: LeagueOverview;
  recent: LeagueMatch[];
  standings?: LeagueStandings;
  matches?: LeagueMatches;
  stats?: LeagueStats;
  teams?: LeagueTeams;
}

export interface LeagueHeader {
  id: number;
  name: string;
  country: string;
  season: string;
  country_flag: string;
  logo: string;
}

export interface LeagueOverview {
  description: string;
  total_teams: number;
  matches_played: number;
  goals_scored: number;
  goals_per_match: number;
  top_teams: Array<{
    id: number;
    name: string;
    logo: string;
    points: number;
  }>;
}

export interface LeagueStandings {
  table: Array<{
    position: number;
    team: {
      id: number;
      name: string;
      logo: string;
    };
    played: number;
    wins: number;
    draws: number;
    losses: number;
    goal_difference: number;
    points: number;
    form: Array<"W" | "D" | "L">;
  }>;
}

export interface LeagueMatches {
  upcoming: LeagueMatch[];
  recent: LeagueMatch[];
}

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

export enum LeagueView {
  OVERVIEW = "profile",
  STANDINGS = "standings",
  STATISTICS = "stats",
  MATCHES = "matches",
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
  total: number;
  has_next: boolean;
}

export interface Season {
  id: number;
  name: string;
  starting_at: string | null;
  ending_at: string | null;
}
export interface Country {
  name: string;
  code: string | null;
  flag: string | null;
}

export interface MatchTeam {
  id: number;
  name: string;
  logo: string | null;
  score: {
    goals: number;
  };
}
export interface LeagueViewResponseMap {
  [LeagueView.OVERVIEW]: LeagueProfileResponse;
  [LeagueView.STANDINGS]: LeagueStandingsResponse;
  [LeagueView.STATISTICS]: LeagueStatisticsResponse;
  [LeagueView.MATCHES]: LeagueMatchesResponse;
}
export interface LeagueProfileResponse {
  id: number;
  name: string;
  logo: string | null;
  competition_type: "league" | "cup";
  country: Country;
  current_season: Season | null;
}

export interface LeagueStandingsResponse {
  league: {
    id: number;
    name: string;
    country: string;
  };
  season: {
    id: number;
    name: string;
  };
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
export interface LeagueSeasonStatistics {
  season: {
    id: number;
    name: string;
  };
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
export interface LeagueMatchesResponse {
  league: {
    id: number;
    name: string;
  };
  season: {
    id: number;
    name: string;
  };
  matches: LeagueMatch[];
}
