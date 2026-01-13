import { PaginationMeta } from "./leagues";
import { MatchListItem, MatchStatus } from "./matches";

export interface TeamCard {
  id: number;
  name: string;
  short_code: string | null;
  logo: string | null;

  country: {
    name: string;
    code: string | null;
    flag: string | null;
  };

  founded: number | null;

  stadium: {
    name: string | null;
    capacity: number | null;
  };
}

export interface TeamOverviewResponse {
  id: number;
  name: string;
  short_code: string | null;
  logo: string | null;
  founded: number | null;

  country: {
    name: string;
    code: string | null;
    flag: string | null;
  };

  stadium: {
    name: string | null;
    capacity: number | null;
  };

  current_season: {
    id: number;
    name: string;
  } | null;
}

export interface TeamListResponse {
  data: TeamOverviewResponse[];
  pagination: PaginationMeta;
}

export interface TeamHeaderApi {
  id: number;
  name: string;
  short_code?: string;
  logo?: string;
  country: {
    name: string;
    flag: string;
  };
}

export interface TeamPlayer {
  id: number;
  name: string;
  photo: string | null;

  position: {
    id: number | null;
    label: string | null;
  };

  jersey_number: number | null;
  nationality: string | null;

  contract: {
    start: string | null;
    end: string | null;
  };
}

export interface TeamPlayersResponse {
  team_id: number;
  label: string;
  players: TeamPlayer[];
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

export interface TeamMatchesResponse {
  latest: MatchListItem[];
  upcoming: MatchListItem[];
}

export interface TeamSeasonStatsItem {
  season: {
    id: number;
    name: string;
  };
  stats?: {
    games_played?: number | null;

    goals_for?: number | null;
    goals_against?: number | null;

    wins?: number | null;
    draws?: number | null;
    losses?: number | null;

    shots?: number | null;
    corners?: number | null;
    attacks?: number | null;
    dangerous_attacks?: number | null;

    possession?: number | null;
    rating?: number | null;

    yellow_cards?: number | null;
    red_cards?: number | null;

    minutes_played?: number | null;
    expected_goals?: number | null;

    clean_sheets?: number | null;
    failed_to_score?: number | null;

    average_player_age?: number | null;
    average_player_height?: number | null;
    foreign_players?: number | null;

    points_per_game?: number | null;
  };
}

export interface TeamSeasonStatsResponse {
  team: {
    id: number;
    name: string;
    logo: string | null;
  };
  seasons: TeamSeasonStatsItem[];
}

export enum TeamDetailView {
  OVERVIEW = "overview",
  MATCHES = "matches",
  SQUAD = "squad",
  STATS = "stats",
  TRANSFERS = "Transfers",
}

export type { MatchListItem, MatchStatus };

export interface TeamTransferRow {
  id: number;
  date: string;
  amount: number | null;
  completed: boolean;
  type?: {
    id: number;
    code: string;
    label: string;
  };

  player: {
    id: number;
    name: string;
    image: string | null;
  };

  from_team: {
    id: number;
    name: string;
    logo: string | null;
  } | null;

  to_team: {
    id: number;
    name: string;
    logo: string | null;
  } | null;
}

export interface TeamTransferResponse {
  transfers: TeamTransferRow[];
  pagination: PaginationMeta;
}
