import { getNews } from "@/api/news";
import { NoData } from "@/components";
import News from "@/modules/news/News";
import { seo } from "@/utils/seo";

export const metadata = seo({
  title: "Football News – ProBetPredictions",
  description: "Latest football news from around the world",
});

const NewsPage = async () => {
  const response = await getNews({});

  const newsList = response?.data?.data; // ✅ THIS IS THE ARRAY

  if (!Array.isArray(newsList) || newsList.length === 0) {
    return <NoData isCenter message="No news available" />;
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
      <News initialNews={newsList} />
    </div>
  );
};

export default NewsPage;

