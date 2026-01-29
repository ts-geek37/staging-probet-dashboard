"use client";
import { Calendar } from "lucide-react";
import React, { useEffect, useRef } from "react";

import { NoData } from "@/components";
import { NewsDetail as INewsDetail } from "@/types/news";
import Image from "next/image";

interface Props {
  news: INewsDetail;
}

const NewsDetail: React.FC<Props> = ({ news }) => {
  const scriptsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (news.html_content_scripts && scriptsRef.current) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = news.html_content_scripts;

      const scripts = tempDiv.querySelectorAll("script");
      scripts.forEach((script) => {
        const newScript = document.createElement("script");

        if (script.src) {
          newScript.src = script.src;
        }
        if (script.textContent) {
          newScript.textContent = script.textContent;
        }
        if (script.async) {
          newScript.async = true;
        }
        if (script.defer) {
          newScript.defer = true;
        }
        if (script.charset) {
          newScript.charset = script.charset;
        }

        scriptsRef.current?.appendChild(newScript);
      });
    }

    return () => {
      if (scriptsRef.current) {
        scriptsRef.current.innerHTML = "";
      }
    };
  }, [news.html_content_scripts]);

  const formatFullDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
  };

  if (!news) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-10">
        <NoData message="No news data available" />
      </div>
    );
  }

  const fullDate = news.published_at ? formatFullDate(news.published_at) : "";

  return (
    <section className="w-full flex-1 flex flex-col ">
      <div className="relative h-[75vh]">
        <div className="absolute inset-0 z-10">
          <Image
            src={news.image}
            alt={news.title}
            width={1000}
            height={600}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-gray-900 to-transparent" />
        </div>
        <div className="relative z-50 max-w-7xl mx-auto px-4 sm:px-6 overflow-hidden h-full flex-1 flex flex-col justify-end pb-12 sm:pb-16">
          {news.categories.length > 0 && (
            <div className="mb-4">
              <span className="inline-block px-4 py-1.5 bg-blue-600 text-white text-xs sm:text-sm font-semibold rounded-full uppercase tracking-wide">
                News
              </span>
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {news.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm sm:text-base text-gray-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
              <time dateTime={news.published_at}>{fullDate}</time>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <article className="text-white">
          <div
            className="news-content prose prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: news.html_content }}
          />
        </article>

        <div ref={scriptsRef} style={{ display: "none" }} />
      </div>
    </section>
  );
};

export default NewsDetail;
