"use client";

import { Trophy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { TeamBase } from "@/types/teams";

import { useTeamHeader } from "./hooks";

interface Props {
  team: TeamBase | null;
}

const TeamHeader = ({ team }: Props) => {
  const headerData = useTeamHeader(team);
  if (!headerData) return null;

  return (
    <div className="w-full border-b border-gray-800">
      <div className="flex items-start sm:items-center gap-3 md:gap-5 w-full max-w-7xl mx-auto py-4 lg:py-8 px-5 xl:px-0">
        <div className="border border-gray-600 p-2 rounded-lg">
          <Image
            src={headerData?.logo || "/no-image.png"}
            alt={headerData?.name || ""}
            width={48}
            height={48}
            className="h-10 w-10 md:h-12 md:w-12 object-contain"
            onError={(e) => {
              e.currentTarget.src = "/no-image.png";
            }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-3xl font-semibold">
              {headerData?.name}
            </h1>
            <span className="rounded bg-primary-green/20 px-2 py-1 text-xs sm:text-sm font-medium text-primary-green">
              {headerData?.shortName}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 items-center text-gray-400">
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <Image
                src={headerData?.country_flag || "/no-image.png"}
                alt={headerData?.country || ""}
                width={20}
                height={14}
                className="h-3.5 w-5 object-contain"
              />
              <span>{headerData?.country}</span>
            </div>

            <Link
              href={`/leagues/${headerData?.league?.id}`}
              className="flex items-center gap-2 text-sm sm:text-base"
            >
              <Trophy className="size-4 md:size-5 text-primary-green" />
              <span>{headerData?.league?.name}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamHeader;
