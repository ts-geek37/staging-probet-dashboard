import { LeagueCard } from "./leagues";
import { MatchListItem } from "./matches";
import { NewsItem } from "./news";
import { TeamCard } from "./teams";

export interface HomeResponse {
  featured_match: MatchListItem | null;

  sections: {
    live_now: MatchListItem[];
    starting_soon: MatchListItem[];
    recently_finished: MatchListItem[];
    accuratePredictions: AccuratePredictionItem[];
    news: NewsItem[];
  };

  top_leagues: LeagueCard[];
  popular_teams: TeamCard[];

  meta: {
    updated_at: string;
    live_updated_at: string | null;
  };
}

export interface AccuratePredictionItem {
  id: number;
  name: string;
  result_info: string;
  starting_at: string;
  participants: Array<{
    id: number;
    name: string;
    image_path?: string;
    location: "home" | "away";
  }>;
  predicted_score: string;
  actual_score: string;
  winning: boolean;
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
