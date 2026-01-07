import React from "react";

import { Card } from "@/components/ui/card";

import { Skeleton } from "./ui/skeleton";

interface Props {
  label: string;
  value: number | string;
  valueClassName?: string;
  suffix?: string;
}

export const StatCard: React.FC<Props> = ({
  label,
  value,
  valueClassName = "text-primary-green",
  suffix,
}) => {
  return (
    <Card className="flex flex-col items-center justify-center gap-2 rounded-lg border-none bg-slate-800 px-6 py-4">
      <span className={`text-3xl font-bold ${valueClassName}`}>
        {value}
        {suffix}
      </span>
      <span className="text-sm text-gray-400">{label}</span>
    </Card>
  );
};

export const StatCardSkeleton: React.FC = () => {
  return (
    <Card className="flex flex-col items-center justify-center gap-2 rounded-lg border-none bg-slate-800 px-6 py-4">
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-4 w-24" />
    </Card>
  );
};

export default StatCard;
