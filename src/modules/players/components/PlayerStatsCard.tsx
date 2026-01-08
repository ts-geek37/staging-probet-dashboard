"use client";

import React from "react";


export interface PlayerStatItem {
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
  columns = "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
}) => (
  <div className="flex flex-col gap-4">
    <h2 className="text-sm font-medium uppercase tracking-wider text-gray-400">
      {title}
    </h2>
    <div className={`grid gap-4 ${columns}`}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-lg bg-zinc-900 border border-gray-800 p-3 sm:p-4 text-center transition-colors hover:border-primary-green/50 group"
        >
          <p className="sm:text-xl lg:text-2xl font-semibold text-white group-hover:text-primary-green">{stat.value}</p>
          <p className="mt-1 text-xs sm:text-sm lg:text-base tracking-wide text-gray-400 group-hover:text-primary-green">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default PlayerStatsCard;
