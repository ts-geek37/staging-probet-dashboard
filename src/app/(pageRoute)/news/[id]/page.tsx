import { Metadata } from "next";
import React from "react";

import { getNewsDetails } from "@/api/news";
import { NoData } from "@/components";
import NewsDetail from "@/modules/news/NewsDetails";
import { seo } from "@/utils/seo";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id } = await params;

  try {
    const response = await getNewsDetails(id);
    const news = response?.data?.data;

    if (!news) {
      return seo({
        title: "News",
        description:
          "Read the latest football news and match insights on ProBetPredictions.",
      });
    }

    return seo({
      title: news.title || "News",
      description: `${news.title}. Stay updated with the latest football news, match insights, and predictions on ProBetPredictions.`,
    });
  } catch {
    return seo({
      title: "News",
      description:
        "Read the latest football news and match insights on ProBetPredictions.",
    });
  }
};

const Page: React.FC<Props> = async ({ params }) => {
  const { id } = await params;
  const response = await getNewsDetails(id);
  const news = response?.data?.data;
  const relatedNews = response?.data?.relatedNews;
  if (!news) {
    return <NoData isCenter message="News not found" />;
  }
  news.image = news.image+"1080"

  return <NewsDetail news={news} relatedNews={relatedNews ?? []} />;
};

export default Page;
