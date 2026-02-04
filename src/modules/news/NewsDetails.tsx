"use client";
import Image from "next/image";
import React, { useMemo, useState } from "react";

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
  const [imageError, setImageError] = useState(false);

  return (
    <section className="w-full">
      <div className="relative h-[60vh] md:h-[75vh] w-full overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {!imageError ? (
          <>
            <Image
              src={news?.image}
              alt={news?.title}
              fill
              className="object-cover"
              priority
              onError={() => setImageError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(1,225,250,0.15),transparent_50%)]" />
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,rgba(255,193,7,0.1),transparent_50%)]" />
              </div>

              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `linear-gradient(rgba(1,225,250,0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(1,225,250,0.3) 1px, transparent 1px)`,
                  backgroundSize: "50px 50px",
                }}
              />
            </div>

            <div className="absolute inset-0 z-10 flex items-end">
              <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-12 w-full">
                <NewsMeta news={news} />
              </div>
            </div>
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full">
        {!imageError && (
          <div className="py-8 md:py-12 border-b border-gray-800">
            <NewsMeta news={news} />
          </div>
        )}

        <div
          className={cn(
            "grid grid-cols-1 gap-12",
            haveRelatedNews ? "lg:grid-cols-[2fr_1fr]" : "",
          )}
        >
          <article className="text-white">
            <div
              className="news-content text-justify"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          </article>

          {haveRelatedNews && (
            <div className="lg:sticky lg:top-6 self-start">
              <div className="flex flex-col gap-3 mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-primary-yellow uppercase italic">
                  Related News
                </h2>
                <div className="h-px bg-primary-yellow/40 w-full" />
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
                      // alias={item.alias}
                      // original_url={item.original_url}

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
