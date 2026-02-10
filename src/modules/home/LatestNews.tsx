"use client";

import Link from "next/link";
import React from "react";

import { VIPBanner } from "@/components";
import NewsCard from "@/modules/news/components/NewsCard";
import { NewsItem } from "@/types/news";

interface Props {
  news: NewsItem[];
}

const LatestNews: React.FC<Props> = ({ news }) => {
  if (!news?.length) return null;

  const [mainNews, ...sideNews] = news;

  return (
    <section className="py-5 sm:py-10 text-white">
      <div className="space-y-10">
        <div className="flex items-end justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-5xl font-bold">Latest News</h2>
            <p className="text-xs sm:text-base text-white">
              Stay updated with football stories
            </p>
          </div>

          <Link
            href="/news"
            className="text-xs sm:text-base text-primary-gray hover:text-white"
          >
            View all
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-64 sm:h-96">
            <Link href={`/news/${mainNews.id}`}>
              <NewsCard
                id={Number(mainNews.id)}
                title={mainNews.title}
                image={mainNews.image}
                published_at={mainNews.published_at}
                isMain
              />
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {sideNews.slice(0, 3).map((item) => (
              <Link key={item.id} href={`/news/${item.id}`}>
                <NewsCard
                  id={Number(item.id)}
                  title={item.title}
                  image={item.image}
                  published_at={item.published_at}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-15">
        <VIPBanner />
      </div>
    </section>
  );
};

export default LatestNews;
