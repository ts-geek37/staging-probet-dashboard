"use client";

import Image from "next/image";
import React from "react";

interface Props {
  id: number;
  title: string;
  image: string;
  published_at: string;
  original_url?: string;
  isMain?: boolean;
  isBelow?: boolean;
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
}) => {
  // Common below card height
  const belowCardHeight = "h-64"; // 16rem, adjust as needed

  if (isMain) {
    return (
      <a
        href={original_url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block h-full overflow-hidden rounded-2xl border border-primary-gray/20 bg-[#14181F]"
      >
        <div className="relative h-60 w-full overflow-hidden rounded-2xl">
          <Image
            src={image || "/placeholder.png"}
            alt={title}
            fill
            className="object-cover"
          />
        </div>

        <div className={`absolute bottom-0 left-0 p-4 ${containerClass}`}>
          <h3 className="text-xl font-bold text-white md:text-3xl">{title}</h3>
          <p className="text-xs text-primary-yellow">{published_at}</p>
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
        className={`block overflow-hidden rounded-2xl border border-primary-gray/20 bg-[#14181F] p-4 space-y-3 ${belowCardHeight}`}
      >
        <div className="relative w-full h-36 overflow-hidden rounded-2xl">
          <Image
            src={image || "/placeholder.png"}
            alt={title}
            fill
            className="object-cover"
          />
        </div>

        <h4 className="line-clamp-2 text-sm font-semibold text-white">
          {title}
        </h4>
        <p className="text-xs text-primary-yellow">{published_at}</p>
      </a>
    );
  }

  // Default card
  return (
    <a
      href={original_url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex gap-4 rounded-2xl border border-primary-gray/20 bg-[#14181F] p-4 ${belowCardHeight}`}
    >
      <div className="relative h-36 w-36 shrink-0 overflow-hidden sm:h-36 sm:w-36">
        <Image
          src={image || "/placeholder.png"}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-between">
        <h4 className="text-sm font-semibold text-white">{title}</h4>
        <p className="text-xs text-primary-yellow">{published_at}</p>
      </div>
    </a>
  );
};

export default NewsCard;
