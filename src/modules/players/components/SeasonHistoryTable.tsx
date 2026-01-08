"use client";

import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { PlayerStatsResponse } from "@/types/players";

interface SeasonHistoryTableProps {
  seasons: PlayerStatsResponse["seasons"];
}

const SeasonHistoryTable: React.FC<SeasonHistoryTableProps> = ({ seasons }) => {
  return (
    <Card className="rounded-xl border border-primary-gray/20 bg-[#14181F]">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-white">
          Season History
        </CardTitle>
      </CardHeader>

      <CardContent className="text-primary-gray">
        <div className="space-y-3 sm:hidden">
          {seasons.map((season) => (
            <div
              key={season.season}
              className="rounded-lg border border-primary-gray/20 bg-[#181d25] p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-white">Season</span>
                <span className="text-sm font-semibold text-white">
                  {season.season}
                </span>
              </div>

              <div className="mt-1 text-sm text-white">
                {season.competition}
              </div>

              <div className="mt-3 grid grid-cols-3 gap-3 ">
                <div>
                  <div className="text-xs text-primary-gray">Apps</div>
                  <div className="font-semibold text-white">
                    {season.appearances}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-primary-gray">Goals</div>
                  <div className="font-semibold text-primary-green">
                    {season.goals}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-primary-gray">Assists</div>
                  <div className="font-semibold text-white">
                    {season.assists}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden overflow-x-auto sm:block">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="text-primary-gray">Season</TableHead>
                <TableHead className="text-primary-gray">Competition</TableHead>
                <TableHead className="text-primary-gray">Apps</TableHead>
                <TableHead className="text-primary-gray">Goals</TableHead>
                <TableHead className="text-primary-gray">Assists</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {seasons.map((season) => (
                <TableRow
                  key={season.season}
                  className="border-t border-primary-gray/20"
                >
                  <TableCell className="text-white">{season.season}</TableCell>
                  <TableCell>{season.competition}</TableCell>
                  <TableCell className="font-medium text-white">
                    {season.appearances}
                  </TableCell>
                  <TableCell className="font-medium text-primary-green">
                    {season.goals}
                  </TableCell>
                  <TableCell className="font-medium text-white">
                    {season.assists}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default SeasonHistoryTable;
