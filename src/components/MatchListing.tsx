"use client";

import Link from "next/link";

import { MatchListItem } from "@/types/matches";

import MatchCardSkeleton from "./MatchCardSkeleton";
import MatchCard from "./MatchesCard";

interface MatchListingProps {
  title: string;
  description?: string;
  matches: MatchListItem[];
  isLoading?: boolean;
  href?: string;
}

const MatchListing: React.FC<MatchListingProps> = ({
  title,
  description,
  matches,
  isLoading = false,
  href,
}) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 mb-4 flex-col">
          <h2 className="text-lg sm:text-xl text-white font-semibold">
            {title}
          </h2>
          {description && <p className="text-sm sm:text-base">{description}</p>}
        </div>
        {href && (
          <Link
            href={href}
            className="text-primary-gray hover:text-white transition-colors text-sm sm:text-base"
          >
            View all
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 items-center lg:grid-cols-3 gap-4">
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <MatchCardSkeleton key={index} />
            ))
          : matches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                href={`/matches/${match.id}`}
              />
            ))}
      </div>
    </div>
  );
};

export default MatchListing;
