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
    <div className="flex items-center gap-4">
      <Image
        src={league?.logo || "/no-image.png"}
        alt={league?.name || "League Banner"}
        width={64}
        height={64}
        className="rounded-lg"
      />
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl text-white font-bold">
          {league?.name ?? "League"}
        </h1>
        <div className="flex max-sm:flex-col item-start sm:items-center gap-2 mt-1">
          <div className="flex gap-2">
            <Image
              src={league?.country?.flag || "/no-image.png"}
              alt={league?.country?.name || "League Banner"}
              width={20}
              height={15}
              className="rounded"
            />
            <span className="text-primary-gray">{league?.country?.name}</span>
            <span className="text-primary-gray">
              • {league?.current_season?.name}
            </span>
          </div>
          <div className="flex gap-2">
            {league?.current_season?.stage && (
              <>
                <span className="text-primary-gray sm:block hidden">•</span>
                <span className="text-primary-gray">
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
