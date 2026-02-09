import { ChevronLeft, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";

import { Badge } from "@/components/ui/badge";
import { NewsDetail as INewsDetail } from "@/types/news";
import { formatTimeAgo } from "@/utils/timeAgo";

interface NewsMetaProps {
  news: INewsDetail;
  className?: string;
}

const NewsMeta: FC<NewsMetaProps> = ({ news, className = "" }) => {
  const router = useRouter();

  const publishedAt = news?.published_at;
  const category = news?.categories?.[0]?.name ?? "News";

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <button
        onClick={() => router.back()}
        className="flex items-center cursor-pointer gap-2 text-primary-gray hover:text-primary-green transition-colors group"
      >
        <div className="rounded-full">
          <ChevronLeft size={20} />
        </div>
        <span className="font-semibold uppercase tracking-wider text-sm">
          Back
        </span>
      </button>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight uppercase italic">
        {news?.title}
      </h1>

      <div className="flex items-center gap-2 flex-wrap">
        {publishedAt && (
          <div className="flex items-center gap-2 text-primary-green font-medium text-base md:text-lg">
            <Clock className="w-4 h-4 md:w-5 md:h-5" />
            <span>{formatTimeAgo(publishedAt)}</span>
          </div>
        )}

        {publishedAt && category && (
          <span className="text-primary-gray text-lg leading-none">•</span>
        )}

        {category && (
          <Badge variant="green" className="font-bold text-sm uppercase">
            {category}
          </Badge>
        )}
      </div>
    </div>
  );
};
export default NewsMeta;
