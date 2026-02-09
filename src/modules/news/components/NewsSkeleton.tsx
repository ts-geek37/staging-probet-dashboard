"use client";

import { Skeleton } from "@/components/ui/skeleton";

const NewsSkeleton = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 md:gap-8">
        <div className="sm:col-span-3">
          <div className="relative h-100 w-full md:h-125 overflow-hidden rounded-3xl border border-primary-gray/20 bg-card/50 p-6 md:p-10 flex flex-col justify-end gap-4">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-10 w-3/4 md:h-14" />
            <Skeleton className="h-12 w-20 rounded-xl" />
          </div>
        </div>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-3 rounded-xl border border-primary-gray/20 bg-card/50 p-4"
          >
            <Skeleton className="aspect-video w-full rounded-md" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-8 w-16 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsSkeleton;
