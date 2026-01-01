import Image from "next/image";
import React from "react";
import LeagueBanner from "../LeagueBanner";
import { useLeague } from "../provider";

interface Props {}

const Standings: React.FC<Props> = () => {
  const { data } = useLeague();
  return (
    <div className="flex-1 text-white flex flex-col gap-12">
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold">Premier League Standings</h2>

        <div className="w-full overflow-y-scroll border border-gray-800 rounded-lg">
          <table className="w-full">
            <thead className="border-b border-gray-800">
              <tr>
                <th className="text-left text-xs font-medium text-gray-400 px-4 py-3 w-12">
                  #
                </th>
                <th className="text-left text-xs font-medium text-gray-400 px-4 py-3">
                  Team
                </th>
                <th className="text-center text-xs font-medium text-gray-400 px-4 py-3 w-16">
                  P
                </th>
                <th className="text-center text-xs font-medium text-gray-400 px-4 py-3 w-16">
                  W
                </th>
                <th className="text-center text-xs font-medium text-gray-400 px-4 py-3 w-16">
                  D
                </th>
                <th className="text-center text-xs font-medium text-gray-400 px-4 py-3 w-16">
                  L
                </th>
                <th className="text-center text-xs font-medium text-gray-400 px-4 py-3 w-16">
                  GD
                </th>
                <th className="text-center text-xs font-medium text-gray-400 px-4 py-3 w-20">
                  PTS
                </th>
                <th className="text-center text-xs font-medium text-gray-400 px-4 py-3">
                  Form
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.standings?.table.map((row) => (
                <tr
                  key={row.team.id}
                  className="border-b border-gray-800 hover:bg-[#1a1f2e]/50 transition-colors"
                >
                  <td className="px-4 py-4 text-sm font-medium">
                    {row.position}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={row.team.logo}
                        alt={row.team.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <span className="text-sm font-medium">
                        {row.team.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center text-sm text-gray-400">
                    {row.played}
                  </td>
                  <td className="px-4 py-4 text-center text-sm text-gray-400">
                    {row.wins}
                  </td>
                  <td className="px-4 py-4 text-center text-sm text-gray-400">
                    {row.draws}
                  </td>
                  <td className="px-4 py-4 text-center text-sm text-gray-400">
                    {row.losses}
                  </td>
                  <td className="px-4 py-4 text-center text-sm text-gray-400">
                    {row.goal_difference}
                  </td>
                  <td className="px-4 py-4 text-center text-sm font-semibold">
                    {row.points}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-1">
                      {row.form.map((result, index) => {
                        const color = result === "W" ? "bg-green-500" : result === "L" ? "bg-red-500" : "bg-yellow-500";
                        return (
                          <div
                            key={index}
                            className={`w-6 h-6 rounded flex items-center justify-center text-xs font-medium ${color}`}
                          >
                            {result}
                          </div>
                        );
                      })}
                    </div>
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
