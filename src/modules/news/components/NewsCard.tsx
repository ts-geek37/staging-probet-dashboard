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
            src={image ?? "/company-og-image.webp"}
            alt={title}
            width={1300}
            height={900}
            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            priority
            onError={(img) =>
              (img.currentTarget.src = "/company-og-image.webp")
            }
          />

          <div className="absolute inset-0 bg-linear-to-t from-[#0B0E14]/95 via-[#0B0E14]/55 via-45% to-transparent to-85%" />
          <div className="absolute bottom-0 left-0 h-1/2 w-full bg-linear-to-t from-[#0B0E14]/90 to-transparent" />
        </div>

        <div
          className={`absolute bottom-0 left-0 w-full p-6 md:p-10 ${containerClass}`}
        >
          <div className="mb-3 inline-flex items-center rounded-full bg-primary-green/20 px-3 py-1 text-sm font-bold uppercase text-primary-green backdrop-blur-md border border-primary-green/20">
            {categoryName ?? "Featured"}
          </div>

          <h3 className="mb-3 text-2xl font-black leading-tight text-white md:text-4xl lg:text-5xl drop-shadow-lg">
            {title}
          </h3>

          <div className="flex items-center gap-2 text-sm text-primary-gray">
            <p className="w-fit rounded-xl bg-primary-green/10 p-2 text-sm font-medium text-primary-green">
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
        className={`flex flex-col overflow-hidden rounded-xl border border-primary-gray/20 bg-card p-4 ${belowCardHeight}`}
      >
        <div className="relative w-full h-50 overflow-hidden rounded-md shrink-0 mb-3">
          <Image
            src={image || "/company-og-image.webp"}
            alt={title}
            fill
            className="object-cover"
            onError={(e) => (e.currentTarget.src = "/company-og-image.webp")}
          />
        </div>

        <h4 className="line-clamp-2 text-base font-semibold text-white">
          {title}
        </h4>
        <div className="grow" />

        <p className="text-base font-medium text-primary-green bg-primary-green/10 p-2 rounded-xl w-fit mt-3">
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
          src={image || "/company-og-image.webp"}
          alt={title}
          fill
          className="object-cover"
          onError={(e) => (e.currentTarget.src = "/company-og-image.webp")}
        />
      </div>

      <div className="flex flex-col justify-between gap-3 sm:gap-0">
        <div className="flex flex-col items-start gap-2">
          <h4 className="text-base font-semibold text-white">{title}</h4>
          <Badge variant="green" className="text-sm">
            {categoryName ?? "News"}
          </Badge>
        </div>
      </div>
    </a>
  );
};

export default NewsCard;
