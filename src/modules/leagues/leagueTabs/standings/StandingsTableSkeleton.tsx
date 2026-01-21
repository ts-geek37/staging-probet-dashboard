import React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { COLUMNS, TABLE_GRID } from "./StandingsTable";

const StandingsTableSkeleton: React.FC = () => {
  return (
    <div className="rounded-2xl border border-primary-gray/20 overflow-hidden">
      <div className="px-5 py-4 border-b border-primary-gray/20">
        <Skeleton className="h-6 w-48" />
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
              {COLUMNS.map(({ key, align }) => (
                <TableHead
                  key={key}
                  className={cn(
                    "flex items-center",
                    align === "center" ? "justify-center" : "justify-start",
                  )}
                >
                  <Skeleton className="h-4 w-6" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="block">
            {Array.from({ length: 6 }).map((_, i) => (
              <TableRow
                key={i}
                className={cn(TABLE_GRID, "border-b border-primary-gray/20")}
              >
                <TableCell>
                  <Skeleton className="h-4 w-6" />
                </TableCell>

                <TableCell className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </TableCell>

                {Array.from({ length: 6 }).map((__, j) => (
                  <TableCell key={j} className="flex justify-center">
                    <Skeleton className="h-4 w-6" />
                  </TableCell>
                ))}

                <TableCell className="flex justify-center gap-2">
                  {Array.from({ length: 5 }).map((__, k) => (
                    <Skeleton key={k} className="h-6 w-6 rounded" />
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default StandingsTableSkeleton;
