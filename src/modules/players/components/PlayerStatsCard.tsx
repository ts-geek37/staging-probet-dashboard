"use client";

import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PlayerStatItem {
  label: string;
  value: number | string;
  color?: string;
}

interface PlayerStatsCardProps {
  title?: string;
  stats: PlayerStatItem[];
  columns?: string;
  hoverBorderColor?: string;
}

const PlayerStatsCard: React.FC<PlayerStatsCardProps> = ({
  title,
  stats,
  columns = "grid-cols-2 md:grid-cols-4",
  hoverBorderColor = "hover:border-primary-green",
}) => (
  <Card className="rounded-xl border border-primary-gray/20 bg-[#14181F]">
    {title && (
      <CardHeader>
        <CardTitle className="text-base font-semibold text-white">
          {title}
        </CardTitle>
      </CardHeader>
    )}

    <CardContent className={cn("grid gap-4", columns)}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={cn(
            "group rounded-xl border border-transparent bg-[#181d25] px-6 py-4 text-center",
            hoverBorderColor,
          )}
        >
          <p
            className={cn(
              "text-2xl font-semibold",
              stat.color ?? "text-white group-hover:text-primary-green",
            )}
          >
            {stat.value}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </CardContent>
  </Card>
);

export default PlayerStatsCard;
