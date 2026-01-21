"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import { NoData } from "@/components";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { MapStandingsTableRow } from "@/types/leagues";

import StandingsTableSkeleton from "./StandingsTableSkeleton";

type Column = {
  key: string;
  label: string;
  align: "left" | "center";
};

interface Props {
  standings?: MapStandingsTableRow[];
  isLoading?: boolean;
}

export const COLUMNS: Column[] = [
  { key: "rank", label: "#", align: "center" },
  { key: "team", label: "Team", align: "left" },
  { key: "played", label: "P", align: "center" },
  { key: "wins", label: "W", align: "center" },
  { key: "draws", label: "D", align: "center" },
  { key: "losses", label: "L", align: "center" },
  { key: "goalDiff", label: "GD", align: "center" },
  { key: "points", label: "PTS", align: "center" },
  { key: "form", label: "Form", align: "center" },
];

export const TABLE_GRID =
  "grid grid-cols-[0.5fr_3fr_repeat(6,1fr)_minmax(150px,2fr)] sm:grid-cols-[0.5fr_6fr_repeat(6,1fr)_minmax(150px,2fr)] items-center px-5";

const StandingsTable: React.FC<Props> = ({ standings, isLoading }) => {
  const router = useRouter();

  const formColor = (v: "W" | "D" | "L") =>
    v === "W" ? "bg-green-500" : v === "D" ? "bg-yellow-400" : "bg-red-600";

  if (isLoading) {
    return <StandingsTableSkeleton />;
  }

  if (!standings?.length) {
    return <NoData message="No standings available" />;
  }
  const data = standings.map((row) => {
    const overall = row.stats.overall;

    return {
      ...row,
      played: overall.played ?? 0,
      win: overall.win ?? 0,
      draw: overall.draw ?? 0,
      lose: overall.loss ?? 0,
      goalDiff: overall.goal_difference ?? 0,
    };
  });

  return (
    <div className="rounded-2xl border border-primary-gray/20 overflow-hidden flex flex-col">
      <div className="px-5 py-4 text-lg font-semibold text-white border-b border-primary-gray/20">
        Premier League Standings
      </div>

      <div className="w-full overflow-x-auto">
        <Table className="min-w-225">
          <TableHeader>
            <TableRow
              className={cn(
                TABLE_GRID,
                "text-sm border-b border-primary-gray/20",
              )}
            >
              {COLUMNS.map(({ key, label, align }) => (
                <TableHead
                  key={key}
                  className={cn(
                    "flex items-center text-primary-gray",
                    align === "center" ? "justify-center" : "justify-start",
                  )}
                >
                  {label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="max-h-100 overflow-y-auto custom-scrollbar-style block">
            {data.map((row) => (
              <TableRow
                key={row.team.id}
                className={cn(
                  TABLE_GRID,
                  "text-primary-gray text-sm hover:bg-white/5 border-b border-primary-gray/20",
                  "group group-hover:text-primary-green active:bg-white/10 active:text-primary-green",
                )}
              >
                <TableCell className="font-semibold text-left group-hover:text-primary-green active:text-primary-green">
                  {row.position}
                </TableCell>

                <TableCell
                  className="flex items-center gap-3 cursor-pointer group-hover:text-primary-green active:text-primary-green"
                  onClick={() => router.push(`/teams/${row.team.id}`)}
                >
                  <Image
                    src={row.team.logo || "/no-image.png"}
                    alt={row.team.name}
                    width={22}
                    height={22}
                  />
                  <span>{row.team.name}</span>
                </TableCell>

                <TableCell className="text-center group-hover:text-primary-green active:text-primary-green">
                  {row.played}
                </TableCell>
                <TableCell className="text-center group-hover:text-primary-green active:text-primary-green">
                  {row.win}
                </TableCell>
                <TableCell className="text-center group-hover:text-primary-green active:text-primary-green">
                  {row.draw}
                </TableCell>
                <TableCell className="text-center group-hover:text-primary-green active:text-primary-green">
                  {row.lose}
                </TableCell>
                <TableCell className="text-center group-hover:text-primary-green active:text-primary-green">
                  {row.goalDiff}
                </TableCell>
                <TableCell className="text-center group-hover:text-primary-green active:text-primary-green">
                  {row.points}
                </TableCell>

                <TableCell className="flex justify-center">
                  <div className="flex gap-2">
                    {row.form
                      .slice(0, 5)
                      .map((f: "W" | "D" | "L", i: number) => (
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
