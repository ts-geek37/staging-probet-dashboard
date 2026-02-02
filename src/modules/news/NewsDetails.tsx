"use client";
import { Clock } from "lucide-react";
import Image from "next/image";
import React, { useMemo } from "react";

import { NewsCard, NoData } from "@/components";
import { Badge } from "@/components/ui/badge";
import { NewsDetail as INewsDetail, NewsItem } from "@/types/news";
import { sanitizeAndStyleHTML } from "@/utils";
import { formatTimeAgo } from "@/utils/timeAgo";

interface Props {
  news: INewsDetail;
  relatedNews: NewsItem[];
}

const NewsDetail: React.FC<Props> = ({ news, relatedNews }) => {
  const sanitizedContent = useMemo(
    () => sanitizeAndStyleHTML(news.html_content),
    [news.html_content],
  );

  if (!news) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-10">
        <NoData message="No news data available" />
      </div>
    );
  }

  return (
    <section className="w-full">
      <div className="relative h-[60vh] md:h-[75vh] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={news.image}
            alt={news.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-gray-950/30 to-transparent" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full">
        <div className="z-10 h-full max-w-7xl mx-auto px-6 lg:px-0 flex flex-col justify-end pb-12">
          <Badge
            variant="yellow"
            className=" font-bold text-xs md:text-sm uppercase tracking-[0.2em]"
          >
            News
          </Badge>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight uppercase italic decoration-[#01E1FA]">
            {news.title}
          </h1>
          {news?.published_at && (
            <div className="flex items-center gap-2 text-primary-yellow font-medium text-sm md:text-base">
              <Clock className="w-4 h-4 md:w-5 md:h-5" />
              <span>{formatTimeAgo(news?.published_at)}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
          <article className="text-white">
            <div
              className="news-content"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          </article>

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
                    lang={item.lang}
                    published_at={item.published_at}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsDetail;
