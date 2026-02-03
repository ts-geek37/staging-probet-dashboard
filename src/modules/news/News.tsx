"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

import {
  NewsCard,
  NoData,
  Pagination as PaginationComponent,
  SkeletonCardLoader,
} from "@/components";
import { NewsItem, Pagination as PaginationType } from "@/types/news";

import NewsHeader from "./components/NewsHeader";
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

  const {
    news,
    pagination,
    loading,
  }: {
    news: NewsItem[];
    pagination: PaginationType | null;
    loading: boolean;
  } = useNews(selectedDate, currentPage, initialNews);

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
    setSelectedDate(date);
    updateURL(1, date);
  };

  const currentPagination = pagination || initialPagination;
  const [mainNews, ...sideNews] = news ?? [];

  return (
    <section className="space-y-8 relative">
      <NewsHeader selectedDate={selectedDate} onDateChange={handleDateChange} />

      {loading && <SkeletonCardLoader />}

      {news && news.length > 0 ? (
        <div
          className={`grid grid-cols-1 gap-5 md:gap-8 sm:grid-cols-3 ${
            loading ? "opacity-50" : ""
          }`}
        >
          {mainNews && (
            <>
              <div className="hidden sm:block sm:col-span-3 group">
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
        !loading && (
          <NoData message="No news articles found for this date. Try selecting a different day from the calendar to stay updated." />
        )
      )}

      {currentPagination && currentPagination.totalPages > 1 && (
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
