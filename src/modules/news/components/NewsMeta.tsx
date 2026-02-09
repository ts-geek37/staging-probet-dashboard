import { Clock } from "lucide-react";
import { FC } from "react";

import { Badge } from "@/components/ui/badge";
import { NewsDetail as INewsDetail } from "@/types/news";
import { formatTimeAgo } from "@/utils/timeAgo";

interface NewsMetaProps {
  news: INewsDetail;
  className?: string;
}

const NewsMeta: FC<NewsMetaProps> = ({ news, className = "" }) => {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <Badge variant="green" className="font-bold text-sm uppercase">
        {news?.categories?.[0]?.name ?? "News"}
      </Badge>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight uppercase italic">
        {news?.title}
      </h1>

      {news?.published_at && (
        <div className="flex items-center gap-2 text-primary-green font-medium text-base md:text-lg">
          <Clock className="w-4 h-4 md:w-5 md:h-5" />
          <span>{formatTimeAgo(news?.published_at)}</span>
        </div>
      )}
    </div>
  );
};
export default NewsMeta;
