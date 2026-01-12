"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LeagueStanding } from "@/types/leagues";

type StandingUI = LeagueStanding & {
  played: number;
  win: number;
  draw: number;
  lose: number;
  goalDiff: number;
  form: ("W" | "D" | "L")[];
};

const STATIC_STANDINGS: StandingUI[] = [
  {
    position: 1,
    points: 38,
    played: 15,
    win: 12,
    draw: 2,
    lose: 1,
    goalDiff: 38,
    form: ["W", "W", "W", "D", "W"],
    team: {
      id: 1,
      name: "Arsenal",
      logo: "https://media.api-sports.io/football/teams/42.png",
    },
  },
  {
    position: 2,
    points: 28,
    played: 15,
    win: 9,
    draw: 1,
    lose: 5,
    goalDiff: 28,
    form: ["W", "W", "W", "D", "W"],
    team: {
      id: 2,
      name: "Chelsea",
      logo: "https://media.api-sports.io/football/teams/49.png",
    },
  },
];

interface Props {
  standings?: LeagueStanding[];
}

const StandingsTable: React.FC<Props> = ({ standings }) => {
  const router = useRouter();

  const data: StandingUI[] = standings?.length
    ? standings.map((s) => ({
        ...s,
        played: 15,
        win: 0,
        draw: 0,
        lose: 0,
        goalDiff: 0,
        form: ["W", "D", "L", "W", "W"],
      }))
    : STATIC_STANDINGS;

  const formColor = (v: "W" | "D" | "L") =>
    v === "W" ? "bg-green-500" : v === "D" ? "bg-yellow-400" : "bg-red-600";

  return (
    <div className="rounded-2xl border border-primary-gray/20 overflow-hidden flex flex-col">
      <div className="px-5 py-4 text-lg font-semibold text-white border-b border-primary-gray/20">
        Premier League Standings
      </div>

      <div className="w-full overflow-x-auto">
        <Table className="min-w-225">
          <TableHeader>
            <TableRow className="grid grid-cols-[40px_1fr_repeat(6,100px)_140px] h-12 border-b border-primary-gray/20 px-5 ">
              <TableHead className="flex items-center justify-center text-primary-gray">
                #
              </TableHead>
              <TableHead className="flex items-center text-primary-gray">
                Team
              </TableHead>
              <TableHead className="flex items-center justify-center text-primary-gray">
                P
              </TableHead>
              <TableHead className="flex items-center justify-center text-primary-gray">
                W
              </TableHead>
              <TableHead className="flex items-center justify-center text-primary-gray">
                D
              </TableHead>
              <TableHead className="flex items-center justify-center text-primary-gray">
                L
              </TableHead>
              <TableHead className="flex items-center justify-center text-primary-gray">
                GD
              </TableHead>
              <TableHead className="flex items-center justify-center text-primary-gray">
                PTS
              </TableHead>
              <TableHead className="flex items-center justify-center text-primary-gray">
                Form
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="max-h-100 overflow-y-auto custom-scrollbar-style block">
            {data.map((row) => (
              <TableRow
                key={row.team.id}
                onClick={() => router.push(`/teams/${row.team.id}`)}
                className="grid grid-cols-[40px_1fr_repeat(6,100px)_140px] px-5 py-3 text-sm text-primary-gray hover:bg-white/5 cursor-pointer border-b border-primary-gray/20"
              >
                <TableCell className="font-semibold text-white">
                  {row.position}
                </TableCell>

                <TableCell className="flex items-center gap-3">
                  <Image
                    src={row.team.logo || "/no-image.png"}
                    alt={row.team.name}
                    width={22}
                    height={22}
                  />
                  <span>{row.team.name}</span>
                </TableCell>

                <TableCell className="text-center">{row.played}</TableCell>
                <TableCell className="text-center">{row.win}</TableCell>
                <TableCell className="text-center">{row.draw}</TableCell>
                <TableCell className="text-center">{row.lose}</TableCell>
                <TableCell className="text-center">{row.goalDiff}</TableCell>
                <TableCell className="text-center">{row.points}</TableCell>

                <TableCell className="flex justify-center">
                  <div className="flex gap-2">
                    {row.form.map((f, i) => (
                      <span
                        key={i}
                        className={`w-6 h-6 flex items-center justify-center text-xs rounded ${formColor(
                          f,
                        )} text-white`}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StandingsTable;
