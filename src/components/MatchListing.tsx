"use client";

import {
  MatchMode,
  MatchWithOptionalLeague,
  transformLeagueMatch,
} from "@/utils/transformLeagueMatch";

import RecentMatchCard, { RecentMatchProps } from "./RecentMatchCard";
import UpcomingMatchCard, { UpcomingMatchProps } from "./UpcomingMatchCard";

interface MatchListingProps {
  title: string;
  description?: string;
  matches: MatchWithOptionalLeague[];
  mode: MatchMode;
  BadgeText?: string;
}

const MatchListing: React.FC<MatchListingProps> = ({
  title,
  description,
  matches,
  mode,
  BadgeText,
}) => {
  return (
    <div className="w-full">
      <h2 className="text-lg text-white font-semibold mb-4">{title}</h2>
      {description && <p className="text-sm sm:text-base">{description}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 items-center lg:grid-cols-3 gap-4">
        {matches.map((match, index) => {
          const transformedMatch = transformLeagueMatch(match, mode);

          if (mode === "recent") {
            (transformedMatch as RecentMatchProps).BadgeText = BadgeText;
            return (
              <RecentMatchCard
                key={index}
                {...(transformedMatch as RecentMatchProps)}
              />
            );
          }
          return (
            <UpcomingMatchCard
              key={index}
              className="!w-full"
              {...(transformedMatch as UpcomingMatchProps)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MatchListing;
