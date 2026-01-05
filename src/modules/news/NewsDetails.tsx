import React from "react";

import NewsCard from "@/components/NewsCard";
import { footballNewsMock } from "@/mock-data/NewsMockData";
import { NoData } from "@/components";

interface Props {
  id: number;
}

const NewsDetail: React.FC<Props> = ({ id }) => {
  const news = footballNewsMock.find((item) => item.id === id);

  if (!news) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-10">
        <NoData message="No news data available" />
      </div>
    );
  }

  return (
    <section className="w-full space-y-10">
      <div className="h-110 w-full">
        <NewsCard
          title={news.title}
          excerpt={news.subtitle}
          image={news.image}
          category={news.category}
          published_at={news.publishedAt}
          isMain
          containerClass="w-full max-w-7xl mx-auto left-0 right-0 px-4 sm:px-6 pb-10"
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6 text-sm sm:text-base text-white pb-10">
        {news.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
};

export default NewsDetail;
