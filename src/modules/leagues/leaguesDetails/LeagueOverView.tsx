import Image from "next/image";
import React from "react";

import { ApiResponse } from "@/api/types";
import { Skeleton } from "@/components/ui/skeleton";
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
    return (
      <div className="flex items-center gap-4">
        <Skeleton className="w-16 h-16 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-9 w-48" />
          <div className="flex items-center gap-2">
            <Skeleton className="w-5 h-4 rounded" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
    );
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
        <h1 className="text-3xl text-white font-bold">
          {league?.name ?? "League"}
        </h1>
        <div className="flex items-center gap-2 mt-1">
          <Image
            src={league?.country?.flag || "/no-image.png"}
            alt={league?.country?.name || "League Banner"}
            width={20}
            height={15}
            className="rounded"
          />
          <span className="text-gray-400">{league?.country?.name}</span>
          <span className="text-gray-400">
            • {league?.current_season?.name}
          </span>
        </div>
      </div>
    </div>
  );
};
export default LeagueOverView;
