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
import { PlayerTransfer } from "@/types/players";

interface PaginationMeta {
  page: number;
  limit: number;
  count?: number;
  total_pages: number;
}

interface Props {
  transfers: PlayerTransfer[];
  pagination: PaginationMeta | null;
  page: number;
  setPage: (page: number) => void;
}

const PlayerTransfersTable: React.FC<Props> = ({
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
              <TableHead className="min-w-40 text-white p-4">
                Transfer Type
              </TableHead>
              <TableHead className="min-w-40 text-white p-4">
                From Team
              </TableHead>
              <TableHead className="min-w-40 text-white p-4">To Team</TableHead>
              <TableHead className="min-w-32 text-white p-4">Date</TableHead>
              <TableHead className="min-w-32 text-white p-4">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {transfers.map((transfer) => (
              <TableRow
                key={transfer.id}
                className="border-b border-primary-gray/20"
              >
                <TableCell className="text-primary-gray p-4">
                  {transfer.type?.label ?? "-"}
                </TableCell>

                <TableCell className="text-primary-gray p-4">
                  {transfer.fromTeam ? (
                    <Link
                      href={`/teams/${transfer.fromTeam.id}`}
                      className="flex items-center gap-2"
                    >
                      {transfer.fromTeam.image && (
                        <Image
                          src={transfer.fromTeam.image}
                          alt={transfer.fromTeam.name}
                          width={20}
                          height={20}
                        />
                      )}
                      <span>{transfer.fromTeam.name}</span>
                    </Link>
                  ) : (
                    "-"
                  )}
                </TableCell>

                <TableCell className="text-primary-gray p-4">
                  {transfer.toTeam ? (
                    <Link
                      href={`/teams/${transfer.toTeam.id}`}
                      className="flex items-center gap-2"
                    >
                      {transfer.toTeam.image && (
                        <Image
                          src={transfer.toTeam.image}
                          alt={transfer.toTeam.name}
                          width={20}
                          height={20}
                        />
                      )}
                      <span>{transfer.toTeam.name}</span>
                    </Link>
                  ) : (
                    "-"
                  )}
                </TableCell>

                <TableCell className="text-primary-gray p-4">
                  {transfer.date}
                </TableCell>

                <TableCell className="text-primary-gray p-4">
                  <span
                    className={`rounded-md px-2 py-1 text-xs font-medium ${
                      transfer.completed
                        ? "bg-primary-green/10 text-primary-green"
                        : "bg-primary-yellow/10 text-primary-yellow"
                    }`}
                  >
                    {transfer.completed ? "Completed" : "Pending"}
                  </span>
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

export default PlayerTransfersTable;
