"use client";

import { useEffect, useState, useRef } from "react";

import { getNews } from "@/api/news";
import { ApiResponse } from "@/api/types";
import { NewsItem, Pagination, NewsListResponse } from "@/types/news";

type UseNewsResult = {
  news: NewsItem[];
  pagination: Pagination | null;
  loading: boolean;
  error: string | null;
};

const formatDateForApi = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;

export const useNews = (
  date: Date,
  page: number,
  initialNews: NewsItem[] = [],
  limit = 7,
): UseNewsResult => {
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const firstRender = useRef(true);

  useEffect(() => {
    const isToday = formatDateForApi(date) === formatDateForApi(new Date());
    if (
      firstRender.current &&
      isToday &&
      page === 1 &&
      initialNews.length > 0
    ) {
      firstRender.current = false;
      return;
    }

    firstRender.current = false;

    const fetchNews = async () => {
      try {
        setLoading(true);
        const formattedDate = formatDateForApi(date);

        const response = await getNews({
          date: formattedDate,
          page,
          limit,
        });

        if (response.success) {
          setNews(response.data ?? []);
          if (response.pagination) {
            setPagination({
              ...response.pagination,
              appliedFilter: response.pagination.appliedFilter as
                | "category"
                | "date"
                | undefined,
            });
          } else {
            setPagination(null);
          }
        } else {
          setNews([]);
          setPagination(null);
        }
      } catch (err) {
        console.error("Error fetching news:", err);
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [date, page, limit]);

  return { news, pagination, loading, error };
};
