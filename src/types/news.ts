export interface NewsItem {
  id: number;
  title: string;
  image: string;
  alias: string;
  original_url: string;
  lang: string;
  published_at: string;
  categories: number[];
  leagues: number[];
  teams: number[];
}

export interface NewsDetail extends NewsItem {
  html_content: string;
  html_content_scripts: string;
}

export interface NewsListResponse {
  page: number;
  limit: number;
  total: number;
  appliedFilter: "category" | "date";
  data: NewsItem[];
}

export type NewsDetailResponse = {
  data: NewsDetail | null;
  relatedNews: NewsItem[];
} | null;
