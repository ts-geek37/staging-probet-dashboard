"use client";
import Image from "next/image";
import React, { useMemo } from "react";

import { NewsCard } from "@/components";
import { cn } from "@/lib/utils";
import { NewsDetail as INewsDetail, NewsItem } from "@/types/news";
import { sanitizeAndStyleHTML } from "@/utils";

import { NewsMeta } from "./components";

interface Props {
  news: INewsDetail;
  relatedNews: NewsItem[];
}

const NewsDetail: React.FC<Props> = ({ news, relatedNews }) => {
  const sanitizedContent = useMemo(
    () => sanitizeAndStyleHTML(news.html_content),
    [news.html_content],
  );
  const haveRelatedNews = relatedNews?.length > 0;

  return (
    <section className="w-full h-full">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 sm:py-12 w-full text-white">
        <div
          className={cn(
            "grid grid-cols-1 gap-5 sm:gap-8 md:gap-12",
            haveRelatedNews ? "lg:grid-cols-[2fr_1fr]" : "max-w-4xl mx-auto",
          )}
        >
          <div className="h-full">
            <NewsMeta news={news} className="pb-4" />

            <div
              className={cn(
                "relative w-full my-4 overflow-hidden rounded-2xl bg-black/20 aspect-3/2",
              )}
            >
              <div className="relative h-full w-full flex justify-center items-center">
                <Image
                  src={news?.image || "/company-og-image.webp"}
                  alt={news?.title}
                  fill
                  className={cn(
                    "object-cover rounded-xl shadow-lg",
                    !haveRelatedNews ? "w-full" : "w-full",
                  )}
                  priority
                  quality={100}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "/company-og-image.webp";
                  }}
                />
              </div>
            </div>

            <article className="text-white mt-8">
              <div
                className="news-content"
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
              />
            </article>
          </div>

          {haveRelatedNews && (
            <div className="lg:sticky lg:top-6 self-start">
              <div className="flex flex-col gap-3 mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-primary-green uppercase italic">
                  Related News
                </h2>
                <div className="h-px bg-primary-green/40 w-full" />
              </div>

              <div className="flex flex-wrap lg:flex-col gap-6 justify-center sm:justify-start">
                {relatedNews.slice(0, 3).map((item, index) => (
                  <div
                    key={item.id}
                    className={`w-full sm:w-[calc(50%-0.75rem)] lg:w-full ${
                      index === 2 && relatedNews.slice(0, 3).length === 3
                        ? "sm:w-full sm:max-w-[calc(50%-0.75rem)] sm:mx-auto lg:mx-0 lg:max-w-none"
                        : ""
                    }`}
                  >
                    <NewsCard
                      id={item.id}
                      title={item.title}
                      image={item.image}
                      categories={item.categories?.[0]}
                      published_at={item.published_at}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsDetail;
