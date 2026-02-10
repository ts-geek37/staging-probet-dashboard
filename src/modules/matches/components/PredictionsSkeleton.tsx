import React from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const PredictionsSkeleton: React.FC = () => {
  return (
    <div className="space-y-8 animate-pulse">
      <Skeleton className="h-8 w-64 bg-zinc-800" />

      <Card className="bg-zinc-900/50 border-zinc-800">
        <CardContent className="p-6">
          <Skeleton className="h-4 w-full bg-zinc-800 mb-2" />
          <Skeleton className="h-4 w-3/4 bg-zinc-800" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2 space-y-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-zinc-900/50 border-zinc-800">
              <CardHeader className="pb-2">
                <Skeleton className="h-6 w-48 bg-zinc-800" />
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center gap-4">
                  <Skeleton className="h-10 flex-1 bg-zinc-800 rounded-lg" />
                  <Skeleton className="h-10 flex-1 bg-zinc-800 rounded-lg" />
                  <Skeleton className="h-10 flex-1 bg-zinc-800 rounded-lg" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-wrap lg:flex-col gap-6 h-full">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="flex-1 bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-6 flex flex-col items-center justify-center gap-2">
                <Skeleton className="h-4 w-20 bg-zinc-800" />
                <Skeleton className="h-8 w-12 bg-zinc-800" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Skeleton className="h-6 w-40 bg-zinc-800 mt-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="bg-zinc-900/50 border-zinc-800">
            <CardContent className="p-6 space-y-4">
              <Skeleton className="h-4 w-24 bg-zinc-800 mx-auto" />
              <div className="flex justify-between items-end h-20 gap-2">
                <Skeleton className="h-full w-4 bg-zinc-800 rounded-t" />
                <Skeleton className="h-2/3 w-4 bg-zinc-800 rounded-t" />
                <Skeleton className="h-3/4 w-4 bg-zinc-800 rounded-t" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PredictionsSkeleton;
