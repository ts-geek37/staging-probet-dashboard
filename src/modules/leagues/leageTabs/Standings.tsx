import Image from "next/image";
import React from "react";

import { useLeagueStandings } from "../hooks";
import LeagueBanner from "../LeagueBanner";

interface Props {
  id: number;
}

const Standings: React.FC<Props> = ({ id }) => {
  const { standings } = useLeagueStandings(id);

  const data = { standings };
  return (
    <div className="flex-1 text-white flex flex-col gap-12">
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold">Premier League Standings</h2>

        <div className="w-full border border-gray-800 rounded-lg">
          <table className="w-full">
            <thead className="border-b border-gray-800">
              <tr>
                <th className="text-left text-xs font-medium text-gray-400 px-4 py-3 w-12">
                  #
                </th>
                <th className="text-left text-xs font-medium text-gray-400 px-4 py-3">
                  Team
                </th>
                <th className="text-center text-xs font-medium text-gray-400 px-4 py-3 w-20">
                  PTS
                </th>
              </tr>
            </thead>
            <tbody>
              {standings.map((row) => (
                <tr
                  key={row.team.id}
                  className="border-b border-gray-800 hover:bg-[#1a1f2e]/50 transition-colors"
                >
                  <td className="px-4 py-4 text-sm font-medium">
                    {row.position}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      {row.team.logo && (
                        <Image
                          src={row.team.logo}
                          alt={row.team.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                      )}
                      <span className="text-sm font-medium">
                        {row.team.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center text-sm font-semibold">
                    {row.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <LeagueBanner banner="champions" />
    </div>
  );
};

export default Standings;
