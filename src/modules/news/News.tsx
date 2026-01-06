"use client";

import Link from "next/link";
import React from "react";

import { NewsCard } from "@/components";
import { footballNewsMock } from "@/mock-data/NewsMockData";

const News: React.FC = () => {
  const [mainNews, ...sideNews] = footballNewsMock;

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
        <div className="sm:col-span-3 h-105">
          <NewsCard
            title={mainNews.title}
            excerpt={mainNews.subtitle}
            image={mainNews.image}
            category={mainNews.category}
            published_at={mainNews.publishedAt}
            isMain
          />
        </div>

        {sideNews.map((news) => (
          <Link key={news.id} href={`/news/${news.id}`} className="block">
            <NewsCard
              title={news.title}
              excerpt={news.subtitle}
              image={news.image}
              category={news.category}
              published_at={news.publishedAt}
              isBelow
            />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default News;
