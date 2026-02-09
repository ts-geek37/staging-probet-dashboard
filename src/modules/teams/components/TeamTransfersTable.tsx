"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import { NoData } from "@/components";
import Pagination from "@/components/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TeamTransferRow } from "@/types/teams";

interface PaginationMeta {
  page: number;
  limit: number;
  count?: number;
  total_pages: number;
}

interface Props {
  transfers: TeamTransferRow[];
  pagination: PaginationMeta | null;
  page: number;
  setPage: (page: number) => void;
}

const TeamTransfersTable: React.FC<Props> = ({
  transfers,
  pagination,
  page,
  setPage,
}) => {
  if (!transfers.length) {
    return <NoData message="No transfer records available" />;
  }

  const totalPages = pagination?.total_pages ?? 1;

  return (
    <div className="space-y-4">
      <div className="w-full overflow-x-auto rounded-xl border border-primary-gray/20">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-primary-gray/20">
              <TableHead className="min-w-60 text-white">Player</TableHead>
              <TableHead className="min-w-40 text-white">
                Transfer Type
              </TableHead>
              <TableHead className="min-w-40 text-white">From Team</TableHead>
              <TableHead className="min-w-40 text-white">To Team</TableHead>
              <TableHead className="min-w-32 text-white">Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {transfers.map((transfer) => (
              <TableRow
                key={transfer.id}
                className="border-b border-primary-gray/20"
              >
                <TableCell className="text-primary-gray">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center overflow-hidden shrink-0">
                      <Image
                        src={transfer?.player?.image || "/player-avatar.jpeg"}
                        alt={transfer?.player?.name || "Player"}
                        width={44}
                        height={44}
                        onError={(e) =>
                          (e.currentTarget.src = "/player-avatar.jpeg")
                        }
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <Link
                        href={`/players/${transfer.player.id}`}
                        className="font-medium text-white hover:text-primary-green"
                      >
                        {transfer.player.name}
                      </Link>
                      {/* <span className="text-xs">ID: {transfer.player.id}</span> */}
                      {transfer.amount !== null && (
                        <span className="text-xs">
                          Amount: {transfer.amount}
                        </span>
                      )}
                    </div>
                  </div>
                </TableCell>

                <TableCell className="text-primary-gray">
                  {transfer.type?.label ?? "-"}
                </TableCell>

                <TableCell className="text-primary-gray">
                  {transfer.from_team ? (
                    <Link
                      href={`/teams/${transfer.from_team.id}`}
                      className="flex items-center gap-2 hover:text-white transition"
                    >
                      {transfer.from_team.logo && (
                        <Image
                          src={transfer.from_team.logo}
                          alt={transfer.from_team.name}
                          width={20}
                          height={20}
                        />
                      )}
                      <span>{transfer.from_team.name}</span>
                    </Link>
                  ) : (
                    "-"
                  )}
                </TableCell>

                <TableCell className="text-primary-gray">
                  {transfer.to_team ? (
                    <Link
                      href={`/teams/${transfer.to_team.id}`}
                      className="flex items-center gap-2 hover:text-white transition"
                    >
                      {transfer.to_team.logo && (
                        <Image
                          src={transfer.to_team.logo}
                          alt={transfer.to_team.name}
                          width={20}
                          height={20}
                        />
                      )}
                      <span>{transfer.to_team.name}</span>
                    </Link>
                  ) : (
                    "-"
                  )}
                </TableCell>

                <TableCell className="text-primary-gray">
                  {transfer.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {pagination && totalPages > 1 && (
        <Pagination
          mode="total"
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default TeamTransfersTable;
