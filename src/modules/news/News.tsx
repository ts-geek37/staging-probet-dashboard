"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import {
  NewsCard,
  NoData,
  Pagination as PaginationComponent,
} from "@/components";
import { NewsItem, Pagination as PaginationType } from "@/types/news";

import NewsHeader from "./components/NewsHeader";
import NewsSkeleton from "./components/NewsSkeleton";
import { useNews } from "./hooks/useNews";

interface NewsProps {
  initialNews: NewsItem[];
  pagination?: PaginationType;
}

const News: React.FC<NewsProps> = ({
  initialNews,
  pagination: initialPagination,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const dateParam = searchParams.get("date");
  const currentPage = Number(searchParams.get("page")) || 1;

  const [selectedDate, setSelectedDate] = useState<Date>(
    dateParam ? new Date(dateParam) : new Date(),
  );

  const [hasLoaded, setHasLoaded] = useState(false);

  const {
    news,
    pagination,
    loading,
  }: {
    news: NewsItem[];
    pagination: PaginationType | null;
    loading: boolean;
  } = useNews(selectedDate, currentPage, initialNews);

  useEffect(() => {
    if (!loading) {
      queueMicrotask(() => setHasLoaded(true));
    }
  }, [loading]);

  const updateURL = (page: number, date: Date) => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    params.set("date", date.toISOString().split("T")[0]);

    router.push(`/news?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    updateURL(newPage, selectedDate);
  };

  const handleDateChange = (date: Date) => {
    setHasLoaded(false);
    setSelectedDate(date);
    updateURL(1, date);
  };

  const currentPagination = pagination || initialPagination;
  const [mainNews, ...sideNews] = news ?? [];

  return (
    <section className="relative space-y-8">
      <NewsHeader selectedDate={selectedDate} onDateChange={handleDateChange} />

      {loading || !hasLoaded ? (
        <NewsSkeleton />
      ) : news && news.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 md:gap-8">
          {mainNews && (
            <>
              <div className="hidden sm:col-span-3 sm:block group">
                <Link
                  href={`/news/${mainNews.id}`}
                  className="block overflow-hidden rounded-2xl"
                >
                  <NewsCard {...mainNews} isMain />
                </Link>
              </div>

              <div className="block sm:hidden group">
                <Link href={`/news/${mainNews.id}`} className="block">
                  <NewsCard {...mainNews} isBelow />
                </Link>
              </div>
            </>
          )}

          {sideNews.map((n: NewsItem) => (
            <Link key={n.id} href={`/news/${n.id}`} className="block group">
              <NewsCard {...n} isBelow />
            </Link>
          ))}
        </div>
      ) : (
        <NoData message="No news articles found for this date. Try selecting a different day from the calendar to stay updated." />
      )}

      {!loading &&
        hasLoaded &&
        currentPagination &&
        currentPagination.totalPages > 1 && (
          <PaginationComponent
            mode="total"
            currentPage={currentPagination.page}
            totalPages={currentPagination.totalPages}
            onPageChange={handlePageChange}
          />
        )}
    </section>
  );
};

export default News;
