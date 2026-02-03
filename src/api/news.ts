import { NewsDetailResponse, NewsItem } from "@/types/news";

import { serverFetch } from "./http";
import { ApiResponse, PaginatedApiResponse } from "./types";

export const getNews = (params?: {
  categoryId?: number;
  date?: string;
  page?: number;
  limit?: number;
}): Promise<PaginatedApiResponse<NewsItem[]>> => {
  const query = new URLSearchParams({
    ...(params?.categoryId && { category: String(params.categoryId) }),
    ...(params?.date && { date: params.date }),
    ...(params?.page && { page: String(params.page) }),
    ...(params?.limit && { limit: String(params.limit) }),
  });

  return serverFetch<NewsItem[]>(`/api/v2/news?${query.toString()}`) as Promise<
    PaginatedApiResponse<NewsItem[]>
  >;
};

export const getNewsDetails = (
  id: number | string,
): Promise<ApiResponse<NewsDetailResponse>> => {
  return serverFetch<NewsDetailResponse>(`/api/v2/news/${id}`);
};
