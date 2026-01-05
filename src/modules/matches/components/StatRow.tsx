"use client";

import React from "react";

interface Props {
  label: string;
  home: number;
  away: number;
}

const StatRow: React.FC<Props> = ({ label, home, away }) => {
  const total = home + away;
  const homeWidth = total > 0 ? (home / total) * 100 : 0;
  const awayWidth = total > 0 ? (away / total) * 100 : 0;

  return (
    <div className="w-full py-2">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex items-center flex-1 gap-2">
          <span className="text-xs sm:text-sm font-bold w-6 text-left">{home}</span>
          <div className="relative flex-1 h-1.5 bg-[#232529] rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-green transition-all duration-700"
              style={{ width: `${homeWidth}%` }}
            />
          </div>
        </div>

        <span className="text-xs sm:text-sm text-primary-gray text-center sm:w-28">{label}</span>

        <div className="flex items-center flex-1 gap-2">
          <div className="relative flex-1 h-1.5 bg-[#232529] rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-red transition-all duration-700 ml-auto"
              style={{ width: `${awayWidth}%` }}
            />
          </div>
          <span className="text-xs sm:text-sm font-bold w-6 text-right">{away}</span>
        </div>
      </div>
    </div>
  );
};

export default StatRow;
