export interface NewsItem {
  id: number;
  title: string;
  image: string;
  alias: string;
  original_url: string;
  lang: string;
  published_at: string;
  categories: Category[];
  leagues: number[];
  teams: number[];
}
export interface Category {
  id: number;
  name: string | null;
}
export interface NewsDetail extends NewsItem {
  html_content: string;
  html_content_scripts: string;
}
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  appliedFilter?: "category" | "date";
}

export interface NewsListResponse {
  data: NewsItem[];
  pagination: Pagination;
}

export type NewsDetailResponse = {
  data: NewsDetail | null;
  relatedNews: NewsItem[];
} | null;
