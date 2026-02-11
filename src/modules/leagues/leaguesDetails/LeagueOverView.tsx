import Image from "next/image";
import React from "react";

import { ApiResponse } from "@/api/types";
import { SkeletonCardLoader } from "@/components";
import { LeagueProfileResponse } from "@/types/leagues";

import { useLeagueOverview } from "../hooks";

interface Props {
  initialLeagues: ApiResponse<LeagueProfileResponse>;
}
const LeagueOverView: React.FC<Props> = ({ initialLeagues }) => {
  const { league, isLoading } = useLeagueOverview(
    initialLeagues?.data?.id ?? 0,
    initialLeagues,
  );

  if (isLoading) {
    return <SkeletonCardLoader />;
  }
  return (
  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
    <Image
      src={league?.logo || "/no-image.png"}
      alt={league?.name || "League Banner"}
      width={64}
      height={64}
      className="rounded-lg w-14 h-14 sm:w-16 sm:h-16 object-contain shrink-0"
    />

    <div className="min-w-0 flex-1">
      <h1 className="text-lg sm:text-2xl md:text-3xl text-white font-bold break-words">
        {league?.name ?? "League"}
      </h1>

      <div className="flex flex-wrap max-sm:flex-col items-start sm:items-center gap-2 mt-1">
        <div className="flex gap-2 flex-wrap min-w-0">
          <Image
            src={league?.country?.flag || "/no-image.png"}
            alt={league?.country?.name || "League Banner"}
            width={18}
            height={15}
            className="rounded shrink-0"
          />

          <span className="text-primary-gray break-words">
            {league?.country?.name}
          </span>

          <span className="text-primary-gray break-words">
            • {league?.current_season?.name}
          </span>
        </div>

        <div className="flex gap-2 flex-wrap">
          {league?.current_season?.stage && (
            <>
              <span className="text-primary-gray sm:block hidden">•</span>
              <span className="text-primary-gray break-words">
                {league.current_season.stage.name}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  </div>
);

};
export default LeagueOverView;
