"use client";

import { MatchListItem } from "@/types/matches";

import MatchCardSkeleton from "./MatchCardSkeleton";
import MatchCard from "./MatchesCard";

interface MatchListingProps {
  title: string;
  description?: string;
  matches: MatchListItem[];
  isLoading?: boolean;
}

const MatchListing: React.FC<MatchListingProps> = ({
  title,
  description,
  matches,
  isLoading = false,
}) => {
  return (
    <div className="w-full">
      <h2 className="text-lg text-white font-semibold mb-4">{title}</h2>
      {description && <p className="text-sm sm:text-base">{description}</p>}

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
