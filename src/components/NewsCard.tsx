import React from "react";
import Image from "next/image";
import { Clock } from "lucide-react";

import { formatTimeAgo } from "@/utils/timeAgo";

interface Props {
  title: string;
  excerpt?: string;
  image: string;
  category: string;
  published_at: string;
  isMain?: boolean;
}

const NewsCard: React.FC<Props> = ({
  title,
  excerpt,
  image,
  category,
  published_at,
  isMain = false,
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-[#01E1FA]/20 bg-[#0E1320]
      ${isMain ? "h-full" : "flex gap-4 p-4"}`}
    >
      {isMain ? (
        <>
          <div className="relative h-full w-full opacity-20">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0" />
          </div>

          <div className="absolute bottom-0 left-0 p-6 space-y-3 max-w-xl">
            <p className="text-xs font-semibold uppercase text-white">
              {category}
            </p>

            <h3 className="text-xl md:text-3xl font-bold leading-tight">
              {title}
            </h3>

            {excerpt && <p className="text-xs sm:text-base text-white">{excerpt}</p>}

            <p className="text-primary-yellow text-xs flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {formatTimeAgo(published_at)}
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="relative h-20 w-20 sm:h-24 sm:w-28 shrink-0 overflow-hidden">
            <Image src={image} alt={title} fill className="object-cover" />
          </div>

          <div className="flex flex-col justify-between">
            <div className="space-y-1">
              <p className="text-xs uppercase text-white">{category}</p>
              <h4 className="text-sm font-semibold">{title}</h4>
            </div>

            <p className="text-primary-yellow text-xs flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {formatTimeAgo(published_at)}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default NewsCard;
