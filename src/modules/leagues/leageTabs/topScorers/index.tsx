"use client";

import Image from "next/image";
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

import TopScorersLoading from "./TopScorersLoading";
import { useLeagueTopScorers } from "../../hooks";

interface Props {
  id: number;
}

const TopScorers: React.FC<Props> = ({ id }) => {
  const { data, tableOrder, hasData, isLoading } = useLeagueTopScorers(id);

  if (isLoading) {
    return <TopScorersLoading />;
  }

  if (!hasData) {
    return <NoData message="No top scorers data available" />;
  }

  return (
    <div className="flex flex-col gap-8">
      {tableOrder.map((tableKey) => {
        const tableData = data?.tables?.[tableKey];
        const tableSchema = data?.schema?.tables[tableKey];

        if (!tableData || !tableData.rows || tableData.rows.length === 0)
          return null;

        return (
          <div
            key={tableKey}
            className="flex flex-col overflow-hidden rounded-2xl border border-primary-gray/20"
          >
            <div className="border-b border-primary-gray/20 px-5 py-4 text-lg font-semibold text-white bg-white/5">
              {tableSchema?.label || tableKey.replace(/_/g, " ")}
            </div>

            <Table>
              <TableHeader>
                <TableRow className="border-b border-primary-gray/20 px-5 hover:bg-transparent">
                  <TableHead className="w-12 text-center text-primary-gray">
                    #
                  </TableHead>
                  <TableHead className="text-primary-gray">Player</TableHead>
                  <TableHead className="text-primary-gray">Team</TableHead>
                  <TableHead className="w-24 text-center text-primary-gray">
                    Total
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.rows.map((row, idx) => (
                  <TableRow
                    key={`${tableKey}-${row.player.id}-${idx}`}
                    className="group border-b border-primary-gray/10 px-5 text-sm text-primary-gray hover:bg-white/5"
                  >
                    <TableCell className="text-center font-medium text-white">
                      {row.position}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Image
                          src={row?.player?.image || "/no-image.png"}
                          alt={row?.player?.name || ""}
                          width={1000}
                          height={1000}
                          className="size-7 shrink-0 rounded-full overflow-hidden bg-white/10"
                        />
                        <span className="font-medium text-white truncate max-w-[120px] transition-colors group-hover:text-primary-green">
                          {row.player.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Image
                          src={row.team.logo || "/no-image.png"}
                          alt={row.team.name}
                          width={1000}
                          height={1000}
                          className="size-7 shrink-0 rounded-full overflow-hidden bg-white/10"
                        />
                        <span className="font-medium truncate max-w-[120px] sm:max-w-full transition-colors group-hover:text-primary-green">
                          {row.team.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center font-bold group-hover:text-primary-green">
                      {row.total}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );
      })}
    </div>
  );
};

export default TopScorers;
