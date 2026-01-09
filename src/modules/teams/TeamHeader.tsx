"use client";

import Image from "next/image";

import { TeamHeaderApi } from "@/types/teams";

import useTeamHeader from "./hooks/useTeamHeader";

interface Props {
  team: TeamHeaderApi | null;
}

const TeamHeader: React.FC<Props> = ({ team }) => {
  const headerData = useTeamHeader(team);
  if (!headerData) return null;

  return (
    <div className="w-full border-b border-primary-gray/20">
      <div className="mx-auto w-full max-w-7xl px-4 py-4 md:py-7 md:px-6">
        <div className="flex items-start gap-4 sm:items-center">
          <div>
            <Image
              src={headerData.logo || "/no-image.png"}
              alt={headerData.name}
              width={48}
              height={48}
              className="h-15 w-15 object-contain sm:h-20 md:w-20"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h1 className="text-base font-semibold sm:text-3xl">
                {headerData.name}
              </h1>
              <span className="rounded bg-primary-green/20 px-2 py-1 text-xs font-medium text-primary-green sm:text-sm">
                {headerData.shortName}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-gray-400">
              {headerData.countryName && (
                <div className="flex items-center gap-2 text-sm sm:text-base">
                  {headerData.countryFlag && (
                    <Image
                      src={headerData.countryFlag}
                      alt={headerData.countryName}
                      width={20}
                      height={14}
                      className="h-3.5 w-5 object-contain"
                    />
                  )}
                  <span>{headerData.countryName}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamHeader;
