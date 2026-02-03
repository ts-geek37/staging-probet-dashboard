import { getNews } from "@/api/news";
import News from "@/modules/news/News";
import { NewsItem, Pagination } from "@/types/news";
import { seo } from "@/utils/seo";

export const metadata = seo({
  title: "Football News",
  description: "Latest football news from around the world",
});

interface Props {
  searchParams: Promise<{ page?: string; date?: string }>;
}

const NewsPage = async (props: Props) => {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;

  const dateParam = searchParams?.date;
  const today = new Date();
  const formattedDate =
    dateParam ||
    `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const response = await getNews({
    page: currentPage,
    limit: 7,
    date: formattedDate,
  });

  const newsList: NewsItem[] = response.data || [];
  const paginationInfo: Pagination | undefined = response.pagination
    ? {
        ...response.pagination,
        appliedFilter: response.pagination.appliedFilter as
          | "category"
          | "date"
          | undefined,
      }
    : undefined;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-10">
      <News
        key={currentPage}
        initialNews={newsList}
        pagination={paginationInfo}
      />
    </div>
  );
};

export default NewsPage;
