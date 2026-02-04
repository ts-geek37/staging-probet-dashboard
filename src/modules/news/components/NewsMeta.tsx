import { Clock } from "lucide-react";
import { FC } from "react";

import { Badge } from "@/components/ui/badge";
import { NewsDetail as INewsDetail, NewsItem } from "@/types/news";
import { formatTimeAgo } from "@/utils/timeAgo";

interface NewsMetaProps {
  news: INewsDetail;
  className?: string;
}

const NewsMeta: FC<NewsMetaProps> = ({ news, className = "" }) => {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <Badge
        variant="yellow"
        className="font-bold text-xs md:text-sm uppercase tracking-[0.2em] w-fit"
      >
        {news?.categories?.[0] ?? "News"}
      </Badge>

      <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight uppercase italic">
        {news?.title}
      </h1>

      {news?.published_at && (
        <div className="flex items-center gap-2 text-primary-yellow font-medium text-sm md:text-base">
          <Clock className="w-4 h-4 md:w-5 md:h-5" />
          <span>{formatTimeAgo(news?.published_at)}</span>
        </div>
      )}
    </div>
  );
};
export default NewsMeta;
