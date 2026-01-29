import { NewsListResponse, NewsDetail } from "@/types/news";
import { serverFetch } from "./http";
import { ApiResponse } from "./types";

export const getNews = (
  params?: {
    categoryId?: number;
    date?: string;
    page?: number;
    limit?: number;
  }
): Promise<ApiResponse<NewsListResponse>> => {
  const query = new URLSearchParams({
    ...(params?.categoryId && { categoryId: String(params.categoryId) }),
    ...(params?.date && { date: params.date }),
    ...(params?.page && { page: String(params.page) }),
    ...(params?.limit && { limit: String(params.limit) }),
  });

  return serverFetch<NewsListResponse>(`/api/v2/news?${query.toString()}`);
};
