import Image from "next/image";
import Link from "next/link";
import React from "react";

import { ListCard } from "@/modules/home/components";
import { TeamCard } from "@/types/home";

import NoData from "../../../components/NoData";

interface Props {
  teams?: TeamCard[];
}

const TopTeamsList: React.FC<Props> = ({ teams }) => {
  if (!teams || teams.length === 0) return <NoData />;

  return (
    <ListCard
      title="Popular Teams"
      items={teams}
      renderItem={(team) => (
        <Link
          href={`/teams/${team.id}`}
          key={team.id}
          className="group flex items-center justify-between px-5 py-4 hover:bg-white/5 active:bg-white/5 active:scale-[0.99] transition-all cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="relative size-12 flex items-center justify-center rounded-lg bg-white/95 p-1.5 group-hover:bg-white/80">
              <Image
                src={team.logo || "/no-image.png"}
                alt={team.name}
                width={48}
                height={48}
                className="size-full object-contain"
              />
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-white font-medium text-sm sm:text-base group-hover:text-primary-green">
                {team.name}
              </span>

              {team.country && (
                <div className="flex items-center gap-2 text-primary-gray text-xs sm:text-sm">
                  {team.country.flag && (
                    <Image
                      src={team.country.flag}
                      alt={team.country.name}
                      width={18}
                      height={12}
                      className="object-contain rounded-xs"
                    />
                  )}
                  <span>
                    {team.country.name}
                    {team.country.code && ` (${team.country.code})`}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end gap-1 text-right text-[10px] sm:text-xs text-primary-gray">
            {team.founded && (
              <span className="font-medium tracking-widest">
                Est. {team.founded}
              </span>
            )}
            {team.stadium?.name && (
              <span className="max-w-[200px] truncate">
                {team.stadium.name}
              </span>
            )}
          </div>
        </Link>
      )}
    />
  );
};

export default TopTeamsList;
