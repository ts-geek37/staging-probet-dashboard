"use client";

import Link from "next/link";
import React, { useState } from "react";

import { NewsCard } from "@/components";
import { NewsItem } from "@/types/news";

import NewsHeader from "./components/NewsHeader"; // Import the new component

interface NewsProps {
  initialNews: NewsItem[];
}

const News: React.FC<NewsProps> = ({ initialNews }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  if (!initialNews || initialNews.length === 0) return null;
  const [mainNews, ...sideNews] = initialNews;

  return (
    <section className="max-w-7xl mx-auto px-4 space-y-8 py-10">
      <NewsHeader selectedDate={selectedDate} onDateChange={setSelectedDate} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main News Feature */}
        <div className="lg:col-span-3 group">
          <Link
            href={`/news/${mainNews.id}`}
            className="block overflow-hidden rounded-2xl"
          >
            <NewsCard {...mainNews} isMain />
          </Link>
        </div>

        {/* Side News Secondary Grid */}
        {sideNews.map((news) => (
          <Link key={news.id} href={`/news/${news.id}`} className="block group">
            <NewsCard {...news} isBelow />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default News;
