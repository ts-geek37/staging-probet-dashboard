"use client";

import Image from "next/image";
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
                    {transfer.player.image && (
                      <Image
                        src={transfer.player.image}
                        alt={transfer.player.name}
                        width={28}
                        height={28}
                        className="rounded-full"
                      />
                    )}
                    <div className="flex flex-col">
                      <span className="font-medium text-white">
                        {transfer.player.name}
                      </span>
                      <span className="text-xs">ID: {transfer.player.id}</span>
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
                  <div className="flex items-center gap-2">
                    {transfer.from_team?.logo && (
                      <Image
                        src={transfer.from_team.logo}
                        alt={transfer.from_team.name}
                        width={20}
                        height={20}
                      />
                    )}
                    <span>{transfer.from_team?.name ?? "-"}</span>
                  </div>
                </TableCell>

                <TableCell className="text-primary-gray">
                  <div className="flex items-center gap-2">
                    {transfer.to_team?.logo && (
                      <Image
                        src={transfer.to_team.logo}
                        alt={transfer.to_team.name}
                        width={20}
                        height={20}
                      />
                    )}
                    <span>{transfer.to_team?.name ?? "-"}</span>
                  </div>
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
