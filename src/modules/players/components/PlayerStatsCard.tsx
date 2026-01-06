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
}) => {
  return (
    <Card className="rounded-xl border border-primary-gray/20 bg-[#14181F]">
      {title && (
        <CardHeader>
          <CardTitle className="text-base font-semibold text-white">
            {title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className={cn("grid gap-4", columns)}>
        {stats.map((stat, index) => {
          const value = (stat as any).value ?? Object.values(stat)[0];
          const label = (stat as any).label ?? Object.keys(stat)[0];
          const color = (stat as any).color;
          return (
            <div
              key={label}
              className={cn(
                "rounded-xl bg-[#181d25] px-6 py-4 text-center border border-transparent group",
                hoverBorderColor,
              )}
            >
              <p
                className={cn(
                  "text-2xl font-semibold",
                  color ?? "text-white group-hover:text-primary-green",
                )}
              >
                {value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{label}</p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default PlayerStatsCard;
