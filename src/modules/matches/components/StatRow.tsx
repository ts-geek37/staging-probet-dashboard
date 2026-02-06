"use client";

import React from "react";

interface Props {
  label: string;
  home: number;
  away: number;
}

const StatRow: React.FC<Props> = ({ label, home, away }) => {
  const isPercentage =
    label.toLowerCase().includes("percentage") ||
    label.toLowerCase().includes("possession") ||
    label.toLowerCase().includes("accuracy");

  const total = home + away;
  const awayWidth = isPercentage ? away : total > 0 ? (away / total) * 100 : 0;
  const homeWidth = isPercentage ? home : total > 0 ? (home / total) * 100 : 0;

  const displayAway = isPercentage ? `${away}%` : away;
  const displayHome = isPercentage ? `${home}%` : home;

  // Clean label: replace "percentage" with "%" for a cleaner look
  const cleanLabel = label.replace(/percentage/gi, "%").trim();

  return (
    <div className="w-full py-2">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
        <span className="md:hidden text-sm text-primary-gray mb-1 capitalize">
          {cleanLabel}
        </span>
        <div className="flex items-center flex-1 gap-2">
          <span className="text-xs md:text-sm font-bold w-12 shrink-0">
            {displayHome}
          </span>
          <div className="relative flex-1 h-1.5 bg-[#232529] rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-green transition-all duration-700"
              style={{ width: `${homeWidth}%` }}
            />
          </div>
        </div>
        <span className="hidden md:block text-sm text-primary-gray text-center capitalize w-60 shrink-0">
          {cleanLabel}
        </span>
        <div className="flex items-center flex-1 gap-2">
          <div className="relative flex-1 h-1.5 bg-[#232529] rounded-full overflow-hidden">
            <div
              className="absolute right-0 h-full bg-primary-red transition-all duration-700"
              style={{ width: `${awayWidth}%` }}
            />
          </div>
          <span className="text-xs md:text-sm font-bold w-12 text-right shrink-0">
            {displayAway}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatRow;
