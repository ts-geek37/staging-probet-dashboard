"use client";

import React from "react";
import Link from "next/link";

import { NewsCard } from "@/components";
import { NewsItem } from "@/types/news";

interface NewsProps {
  initialNews: NewsItem[];
}

const News: React.FC<NewsProps> = ({ initialNews }) => {
  if (!initialNews || initialNews.length === 0) return null;

  const [mainNews, ...sideNews] = initialNews;

  return (
    <section className="space-y-6 py-10">
      <div className="space-y-1">
        <h2 className="mb-1 text-2xl font-bold text-white sm:text-5xl">
          Football News
        </h2>
        <p className="text-sm text-white">
          Latest stories from around the world
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {/* Main News */}
        <div className="sm:col-span-3 h-105">
          <Link href={`/news/${mainNews.id}`} className="block h-full">
            <NewsCard
              id={mainNews.id}
              title={mainNews.title}
              image={mainNews.image}
              alias={mainNews.alias}
              original_url={mainNews.original_url}
              lang={mainNews.lang}
              published_at={mainNews.published_at}
              isMain
            />
          </Link>
        </div>

        {/* Side News */}
        {sideNews.map((news) => (
          <Link key={news.id} href={`/news/${news.id}`} className="block">
            <NewsCard
              id={news.id}
              title={news.title}
              image={news.image}
              alias={news.alias}
              original_url={news.original_url}
              lang={news.lang}
              published_at={news.published_at}
              isBelow
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default News;
