import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import { cn } from "@/lib/utils";

import { useLeagueStandings } from "../hooks";
import LeagueBanner from "../LeagueBanner";

interface Props {
  id: number;
}

const Standings: React.FC<Props> = ({ id }) => {
  const { standings } = useLeagueStandings(id);
  const router = useRouter();

  return (
    <div className="flex-1 text-white flex flex-col gap-12">
      <div className="w-full border border-gray-800 rounded-lg">
        <table className="w-full">
          <thead className="border-b border-gray-800">
            <tr className="[&>th]:px-4 [&>th]:py-3">
              <th className="text-left text-sm sm:text-base font-medium text-gray-400 w-12">
                #
              </th>
              <th className="text-left text-sm sm:text-base font-medium text-gray-400">
                Team
              </th>
              <th className="text-center text-sm sm:text-base font-medium text-gray-400 w-20">
                PTS
              </th>
            </tr>
          </thead>

          <tbody>
            {standings?.map((row, index) => (
              <tr
                key={row?.team?.id}
                onClick={() => router.push(`/teams/${row?.team?.id}`)}
                className={cn(
                  "group border-b border-gray-800 cursor-pointer transition-colors",
                  "[&>td]:px-4 [&>td]:py-4",
                  index % 2 === 0 ? "bg-slate-900/20" : "bg-transparent",
                )}
              >
                <td className="text-sm sm:text-base font-medium group-hover:text-primary-green transition-colors">
                  {row?.position?.toString()}
                </td>

                <td>
                  <div className="flex items-center gap-3">
                    <Image
                      src={row?.team?.logo || "/no-image.png"}
                      alt={row?.team?.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <span className="text-sm sm:text-base font-medium group-hover:text-primary-green transition-colors">
                      {row?.team?.name}
                    </span>
                  </div>
                </td>

                <td className="text-center text-sm sm:text-base font-semibold group-hover:text-primary-green transition-colors">
                  {row?.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <LeagueBanner banner="champions" />
    </div>
  );
};

export default Standings;
