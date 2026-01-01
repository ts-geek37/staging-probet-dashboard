import Image from "next/image";
import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LeagueStandings } from "@/types/home";

interface Props {
  standings: LeagueStandings;
}

const LeagueStandingsTable: React.FC<Props> = ({ standings }) => {
  return (
    <div className="rounded-xl border border-[#1D1D1D] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-5 border-b border-white/10">
        <h3 className="text-white font-semibold">
          {standings.league.name} Standings
        </h3>
        <span className="text-sm sm:text-base text-primary-gray cursor-pointer hover:text-white">
          Full Table &gt;
        </span>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="border-b border-white/10 text-base">
            <TableHead className="w-12 px-4  text-primary-gray">#</TableHead>
            <TableHead className="text-primary-gray">Team</TableHead>
            <TableHead className="w-12 text-right  text-primary-gray">
              P
            </TableHead>
            <TableHead className="w-12 pr-6 text-primary-gray">PTS</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {standings.table.map((row) => (
            <TableRow
              key={row.team.id}
              className="border-b border-white/5  text-base sm:text-xl"
            >
              <TableCell className="px-4 py-4 sm:py-8 text-white">
                {row.position}
              </TableCell>

              <TableCell className="py-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-5 h-5 shrink-0">
                    <Image
                      src={row.team.logo}
                      alt={row.team.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-gray-300 text-base sm:text-xl">
                    {row.team.name}
                  </span>
                </div>
              </TableCell>

              <TableCell className="py-4 text-right text-primary-gray">
                {row.played}
              </TableCell>

              <TableCell className="py-4 pr-6 text-right font-medium text-primary-gray">
                {row.points}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeagueStandingsTable;
