"use client";

import Image from "next/image";
import React from "react";

import { NoData } from "@/components";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
    <div className="w-full flex flex-col gap-8">
      <Accordion
        type="single"
        collapsible
        defaultValue={tableOrder[0]}
        className="grid gap-4"
      >
        {tableOrder.map((tableKey) => {
          const tableData = data?.tables?.[tableKey];
          const tableSchema = data?.schema?.tables[tableKey];

          if (!tableData || !tableData.rows || tableData.rows.length === 0)
            return null;

          return (
            <AccordionItem
              key={tableKey}
              value={tableKey}
              className="overflow-hidden rounded-2xl border border-primary-gray/20 bg-transparent"
            >
              <AccordionTrigger
                iconClass="size-4 sm:size-5"
                className="border-b border-primary-gray/20 px-5 py-4 sm:text-lg font-semibold text-white bg-white/5 hover:bg-white/10 hover:no-underline transition-colors"
              >
                {tableSchema?.label || tableKey.replace(/_/g, " ")}
              </AccordionTrigger>

              <AccordionContent className="pb-0">
                <Table>
                  <TableHeader>
                    <TableRow className="grid grid-cols-[1fr_6fr_6fr_1fr] items-center border-b border-primary-gray/20 hover:bg-transparent px-5 ">
                      <TableHead className="flex items-center text-primary-gray">
                        #
                      </TableHead>
                      <TableHead className="flex items-center text-primary-gray">
                        Player
                      </TableHead>
                      <TableHead className="flex items-center text-primary-gray">
                        Team
                      </TableHead>
                      <TableHead className="flex items-center justify-center text-primary-gray">
                        Total
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="w-full max-h-100 overflow-y-auto custom-scrollbar-style block">
                    {tableData.rows.map((row, idx) => (
                      <TableRow
                        key={`${tableKey}-${row.player.id}-${idx}`}
                        className="group grid grid-cols-[1fr_6fr_6fr_1fr] gap-0.5 items-center border-b border-primary-gray/10 px-5 text-sm text-primary-gray hover:bg-white/5"
                      >
                        <TableCell className="font-medium text-white">
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
                            <span className="font-medium text-white transition-colors group-hover:text-primary-green">
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
                            <span className="font-medium transition-colors group-hover:text-primary-green">
                              {row.team.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="font-bold group-hover:text-primary-green text-center">
                          {row.total}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default TopScorers;
