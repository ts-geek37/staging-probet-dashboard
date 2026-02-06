"use client";

import Image from "next/image";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Category } from "@/types/news";
import { formatTimeAgo } from "@/utils/timeAgo";

interface Props {
  id: number;
  title: string;
  image: string;
  published_at: string;
  original_url?: string;
  isMain?: boolean;
  isBelow?: boolean;
  categories?: Category | Category[];
  containerClass?: string;
}

const NewsCard: React.FC<Props> = ({
  title,
  image,
  published_at,
  original_url,
  isMain = false,
  isBelow = false,
  containerClass = "",
  categories,
  id,
}) => {
  const belowCardHeight = "h-85";
  const categoryName = Array.isArray(categories)
    ? categories[0]?.name
    : categories?.name;

  if (isMain) {
    return (
      <a
        href={original_url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block w-full overflow-hidden rounded-3xl border border-primary-gray/20 bg-card shadow-2xl transition-shadow hover:shadow-primary-green/10"
      >
        <div className="relative h-100 w-full md:h-125">
          <Image
            src={image ?? "/no-image.png"}
            alt={title}
            width={1300}
            height={900}
            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            priority
            onError={(img) => (img.currentTarget.src = "/no-image.png")}
          />
          <div className="absolute inset-0 bg-linear-to-b from-[#0B0E14]/60 to-85% to-[#0B0E14]/60" />
        </div>

        <div
          className={`absolute bottom-0 left-0 w-full p-6 md:p-10 ${containerClass}`}
        >
          <div className="mb-3 inline-flex uppercase items-center rounded-full bg-primary-green/20 px-3 py-1 text-xs font-bold text-primary-green backdrop-blur-md border border-primary-green/20">
            {categoryName ?? "Featured"}
          </div>
          <h3 className="mb-3 text-2xl font-black leading-tight text-white md:text-4xl lg:text-5xl drop-shadow-lg">
            {title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-primary-gray">
            <p className="text-sm font-medium text-primary-green bg-primary-green/10 p-2 rounded-xl w-fit ">
              {formatTimeAgo(published_at)}
            </p>
          </div>
        </div>
      </a>
    );
  }

  if (isBelow) {
    return (
      <a
        href={original_url}
        target="_blank"
        rel="noopener noreferrer"
        className={`block overflow-hidden rounded-xl border border-primary-gray/20 bg-card p-4 space-y-3 ${belowCardHeight}`}
      >
        <div className="relative w-full h-50 overflow-hidden rounded-md">
          <Image
            src={image || "/placeholder.png"}
            alt={title}
            fill
            className="object-cover"
          />
        </div>

        <h4 className="line-clamp-2 text-sm font-semibold text-white pb-1">
          {title}
        </h4>
        <p className="text-sm font-medium text-primary-green bg-primary-green/10 p-2 rounded-xl w-fit ">
          {formatTimeAgo(published_at)}
        </p>
      </a>
    );
  }

  return (
    <a
      href={`/news/${id}`}
      rel="noopener noreferrer"
      className={`flex gap-4 rounded-2xl border border-primary-gray/20 bg- p-4`}
    >
      <div className="relative aspect-square w-24 sm:w-31 shrink-0 overflow-hidden">
        <Image
          src={image || "/placeholder.png"}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-between gap-3 sm:gap-0">
        <div className="flex flex-col items-start gap-2">
          <h4 className="text-sm font-semibold text-white">{title}</h4>
          <Badge variant="green" className="text-xs">
            {categoryName ?? "News"}
          </Badge>
        </div>
      </div>
    </a>
  );
};

export default NewsCard;
