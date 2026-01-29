// /types/news.ts

/**
 * Basic news item used for lists
 */
export interface NewsItem {
  id: number;
  title: string;
  image: string;
  alias: string;
  original_url: string;
  lang: string;
  published_at: string; // could convert to Date if needed
  categories: number[];
  leagues: number[];
  teams: number[];
}

/**
 * Detailed news article content
 */
export interface NewsDetail extends NewsItem {
  html_content: string;          // HTML of the full article
  html_content_scripts: string;  // Scripts to render widgets (Twitter, etc.)
}

/**
 * Responses from the API
 */
export interface NewsListResponse {
  page: number;
  limit: number;
  total: number;
  appliedFilter: "category" | "date";
  data: NewsItem[];
}

export type NewsDetailResponse = NewsDetail | null;
