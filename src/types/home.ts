import { LeagueCard } from "./leagues";
import { MatchListItem } from "./matches";
import { TeamCard } from "./teams";

export interface HomeResponse {
  featured_match: MatchListItem | null;
  sections: {
    live_now: MatchListItem[];
    starting_soon: MatchListItem[];
    recently_finished: MatchListItem[];
  };
  top_leagues: LeagueCard[];
  popular_teams: TeamCard[];
  news?: NewsSummary[];
  meta: {
    updated_at: string;
    fixtures_window: {
      from: string;
      to: string;
    };
  };
}

export interface NewsSummary {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  published_at: string;
}

export type { LeagueCard, MatchListItem, TeamCard };
