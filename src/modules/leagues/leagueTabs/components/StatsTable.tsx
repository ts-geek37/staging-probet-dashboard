"use client";

import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";

import { NoData } from "@/components";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TopScorersResponse } from "@/types/leagues";

import StatsLoading from "./StatsLoading";

interface Props {
  data?: TopScorersResponse | null;
  tableOrder: string[];
  hasData: boolean;
  isLoading: boolean;
  noDataMessage?: string;
  /** New prop: title and icon for each table */
  tableTitles?: Record<
    string,
    { title: string; icon?: ReactNode } // icon can be a Lucide icon or any JSX
  >;
}

const FallbackImage: React.FC<
  Omit<React.ComponentProps<typeof Image>, "src"> & {
    src?: string | null;
    fallback?: string;
    alt?: string;
  }
> = ({ src, fallback = "/no-image.png", alt, ...props }) => {
  const [error, setError] = React.useState(false);

  return (
    <Image
      alt={alt || ""}
      {...props}
      src={error || !src ? fallback : src}
      unoptimized
      onError={() => setError(true)}
    />
  );
};

const StatsTable: React.FC<Props> = ({
  data,
  tableOrder,
  hasData,
  isLoading,
  noDataMessage = "No data available",
  tableTitles = {},
}) => {
  if (isLoading) {
    return <StatsLoading />;
  }

  if (!hasData) {
    return <NoData message={noDataMessage} />;
  }

  return (
    <div className="w-full flex flex-col gap-8">
      {tableOrder.map((tableKey) => {
        const tableData = data?.tables?.[tableKey];

        if (!tableData || !tableData.rows || tableData.rows.length === 0)
          return null;

        const { title, icon } = tableTitles[tableKey] || {
          title: tableKey.replace(/_/g, " "),
        };

        return (
          <div
            key={tableKey}
            className="overflow-hidden rounded-2xl border border-primary-gray/20 bg-transparent"
          >
            <p className="border-b border-primary-gray/20 px-5 py-4 sm:text-lg font-semibold text-white bg-white/5 flex items-center gap-2">
              {title}
              {icon && icon}
            </p>

            <Table>
              <TableHeader>
                <TableRow className="grid grid-cols-[1fr_6fr_6fr_1fr] items-center border-b border-primary-gray/20 hover:bg-transparent px-5">
                  <TableHead className="flex items-center text-primary-gray">#</TableHead>
                  <TableHead className="flex items-center text-primary-gray">Player</TableHead>
                  <TableHead className="flex items-center text-primary-gray">Team</TableHead>
                  <TableHead className="flex items-center justify-center text-primary-gray">Total</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody className="w-full max-h-100 overflow-y-auto custom-scrollbar-style block">
                {tableData.rows.map((row, idx) => (
                  <TableRow
                    key={`${tableKey}-${row.player.id}-${idx}`}
                    className="group grid grid-cols-[1fr_6fr_6fr_1fr] gap-0.5 items-center border-b border-primary-gray/10 px-5 text-sm text-primary-gray hover:bg-white/5"
                  >
                    <TableCell className="font-medium text-white">{row.position}</TableCell>
                    <TableCell>
                      <Link
                        href={`/players/${row.player.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-3 min-w-0 flex-1"
                      >
                        <FallbackImage
                          src={row?.player?.image}
                          fallback="/player-avatar.jpeg"
                          alt={row?.player?.name || "Player"}
                          width={40}
                          height={40}
                          className="size-7 shrink-0 rounded-full overflow-hidden bg-white/10"
                        />
                        <span className="font-medium text-white transition-colors group-hover:text-primary-green group-active:text-primary-green">
                          {row.player.name}
                        </span>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/teams/${row.team.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2"
                      >
                        <FallbackImage
                          src={row?.team?.logo || "/no-image.png"}
                          alt={row?.team?.name || "Team"}
                          width={40}
                          height={40}
                          className="size-7 shrink-0 rounded-full overflow-hidden bg-white/10"
                        />
                        <span className="font-medium transition-colors group-hover:text-primary-green group-active:text-primary-green">
                          {row.team.name}
                        </span>
                      </Link>
                    </TableCell>
                    <TableCell className="font-bold group-hover:text-primary-green group-active:text-primary-green text-center">{row.total}</TableCell>
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

export default StatsTable;
