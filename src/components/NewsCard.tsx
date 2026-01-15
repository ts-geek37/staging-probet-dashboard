"use client";

import { Clock } from "lucide-react";
import Image from "next/image";
import React from "react";

import { formatTimeAgo } from "@/utils/timeAgo";

interface Props {
  title: string;
  excerpt?: string;
  image: string;
  category: string;
  published_at: string;
  isMain?: boolean;
  isBelow?: boolean;
  containerClass?: string;
}

const NewsCard: React.FC<Props> = ({
  title,
  excerpt,
  image,
  category,
  published_at,
  isMain = false,
  isBelow = false,
  containerClass = "",
}) => {
  if (isMain) {
    return (
      <div className="relative h-full overflow-hidden rounded-2xl border border-[#01E1FA]/20 bg-[#14181F]">
        <div className="relative h-full w-full opacity-20">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div
          className={`absolute bottom-0 left-0 p-4 space-y-3 ${containerClass}`}
        >
          <p className="text-xs font-semibold uppercase text-white">
            {category}
          </p>

          <h3 className="text-xl font-bold text-white md:text-3xl">{title}</h3>

          {excerpt && (
            <p className="text-xs text-white sm:text-base">{excerpt}</p>
          )}

          <p className="flex items-center gap-1 text-xs text-primary-yellow">
            <Clock className="h-3.5 w-3.5" />
            {formatTimeAgo(published_at)}
          </p>
        </div>
      </div>
    );
  }

  if (isBelow) {
    return (
      <div className="overflow-hidden rounded-2xl border border-[#01E1FA]/20 bg-[#14181F] p-4 space-y-3">
        <div className="relative h-44 w-full">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>

        <p className="text-xs uppercase text-white">{category}</p>

        <h4 className="line-clamp-2 text-sm font-semibold text-white">
          {title}
        </h4>

        {excerpt && (
          <p className="line-clamp-2 text-sm text-white">{excerpt}</p>
        )}

        <p className="flex items-center gap-1 text-xs text-primary-yellow">
          <Clock className="h-3.5 w-3.5" />
          {formatTimeAgo(published_at)}
        </p>
      </div>
    );
  }

  return (
    <div className="flex gap-4 rounded-2xl border border-[#01E1FA]/20 bg-[#14181F] p-4">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden sm:h-24 sm:w-28">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      <div className="flex flex-col justify-between">
        <div className="space-y-1">
          <p className="text-xs uppercase text-white">{category}</p>
          <h4 className="text-sm font-semibold text-white">{title}</h4>
        </div>

        <p className="flex items-center gap-1 text-xs text-primary-yellow">
          <Clock className="h-3.5 w-3.5" />
          {formatTimeAgo(published_at)}
        </p>
      </div>
    </div>
  );
};

export default NewsCard;
