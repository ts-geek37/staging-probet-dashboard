"use client";

import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const PlayerStatsLoading: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      <Card className="rounded-xl border py-0 border-primary-gray/20">
        <CardContent className="py-4 flex max-mobile:flex-col gap-4 sm:items-center justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-lg bg-zinc-800" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-32 bg-zinc-800" />
              <Skeleton className="h-4 w-24 bg-zinc-800" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="hidden sm:block h-12 w-20 rounded-lg bg-zinc-800" />
            <Skeleton className="h-10 w-32 rounded-md bg-zinc-800" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-2xl py-0 bg-transparent">
        <CardContent className="space-y-8 py-6 sm:p-6">
          {[1, 2, 3].map((section) => (
            <div key={section} className="flex flex-col gap-4">
              <Skeleton className="h-4 w-40 bg-zinc-800" />
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="rounded-lg bg-zinc-900 border border-gray-800 p-3 sm:p-4 text-center space-y-2 flex flex-col items-center justify-center h-[100px]"
                  >
                    <Skeleton className="h-7 w-12 bg-zinc-800" />
                    <Skeleton className="h-4 w-20 bg-zinc-800" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default PlayerStatsLoading;
