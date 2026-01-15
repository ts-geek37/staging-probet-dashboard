export enum PlayerDetailView {
  Profile = "profile",
  STATS = "stats",
  MATCHES = "matches",
}

import { PaginationMeta } from "./leagues";

export interface PlayerListResponse {
  data: PlayerCard[];
  pagination: PaginationMeta;
}

export interface PlayerCard {
  id: number;
  full_name: string;
  nationality: string;
  position: string | null;
  photo: string | null;
  team: {
    id: number;
    name: string;
    logo: string;
  };
}

export interface PlayerProfileResponse {
  id: number;
  name: string;
  photo: string | null;

  date_of_birth: string | null;
  age: number | null;
  height: number | null;
  weight: number | null;
  preferred_foot: string | null;

  nationality: {
    id: number;
    name: string;
    flag: string | null;
  } | null;

  position: {
    id: number | null;
    name: string | null;
    detailed: string | null;
  };

  current_team: {
    id: number;
    name: string;
    logo: string | null;
  } | null;

  teams: {
    id: number;
    name: string;
    logo: string | null;
  }[];

  birthplace: {
    country: string | null;
    city: string | null;
  };
  trophies?: {
    id: number;
    name: string;
    position: number;
    team: {
      id: number;
      name: string;
      logo: string | null;
    };
  }[];

  shirt_number: number | null;

  is_active: boolean;

  market_value: number | null;

  contract: {
    until: string | null;
  };

  is_captain: boolean;
}

export interface PlayerSeasonStatsResponse {
  season: {
    id: number;
    name: string;
  };

  team: {
    id: number;
    name: string;
    logo: string | null;
  } | null;

  jersey_number: number | null;

  position: {
    id: number | null;
    name: string | null;
  };

  stats: {
    appearances?: number | null;
    lineups?: number | null;
    bench?: number | null;
    minutes_played?: number | null;

    goals?: number | null;
    own_goals?: number | null;
    assists?: number | null;
    expected_goals?: number | null;
    hattricks?: number | null;

    shots_total?: number | null;
    shots_on_target?: number | null;
    shots_off_target?: number | null;
    shots_blocked?: number | null;
    hit_woodwork?: number | null;

    passes?: number | null;
    accurate_passes?: number | null;
    pass_accuracy?: number | null;
    key_passes?: number | null;
    long_balls?: number | null;
    long_balls_won?: number | null;
    through_balls?: number | null;
    through_balls_won?: number | null;
    crosses?: number | null;
    accurate_crosses?: number | null;
    crosses_blocked?: number | null;

    dribbles_attempted?: number | null;
    dribbles_successful?: number | null;
    dribbled_past?: number | null;
    dispossessed?: number | null;

    tackles?: number | null;
    interceptions?: number | null;
    clearances?: number | null;
    blocked_shots_defensive?: number | null;
    errors_leading_to_goal?: number | null;

    duels_total?: number | null;
    duels_won?: number | null;
    aerials_won?: number | null;

    fouls?: number | null;
    fouls_drawn?: number | null;
    yellow_cards?: number | null;
    red_cards?: number | null;
    yellow_red_cards?: number | null;

    saves?: number | null;
    saves_inside_box?: number | null;
    goals_conceded?: number | null;
    clean_sheets?: number | null;

    wins?: number | null;
    draws?: number | null;
    losses?: number | null;

    big_chances_created?: number | null;
    big_chances_missed?: number | null;
    points_per_game?: number | null;

    rating?: number | null;
  };
}

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

export type MatchStatus = "UPCOMING" | "LIVE" | "FT";

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

export interface PlayerStatItem {
  label: string;
  value: string | number;
  color?: string;
}

export interface PlayerMatchesResponse {
  matches: MatchListItem[];
  pagination: PaginationMeta;
}

export type PlayerDetailResponse =
  | PlayerProfileResponse
  | PlayerSeasonStatsResponse
  | PlayerMatchesResponse;
