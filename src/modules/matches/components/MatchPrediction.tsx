"use client";

import React from "react";

interface MatchPredictionProps {
  home: number;
  draw: number;
  away: number;
}

const MatchPrediction: React.FC<MatchPredictionProps> = ({
  home,
  draw,
  away,
}) => {
  const total = home + draw + away;

  const homeWidth = total > 0 ? (home / total) * 100 : 0;
  const drawWidth = total > 0 ? (draw / total) * 100 : 0;
  const awayWidth = total > 0 ? (away / total) * 100 : 0;

  return (
    <div className="bg-[#14181F] border border-primary-gray/20 p-4 rounded-xl w-full h-45 flex flex-col justify-between text-white">
      <p className="text-sm font-medium mb-4">Prediction</p>

      <div className="flex flex-col justify-center h-full">
        <div className="flex w-full h-2 rounded-lg overflow-hidden mb-4">
          <div className="bg-green-500" style={{ width: `${homeWidth}%`}} />
          <div className="bg-yellow-400" style={{ width: `${drawWidth}%` }} />
          <div className="bg-red-500" style={{ width: `${awayWidth}%` }} />
        </div>

        <div className="flex justify-between text-xs font-medium">
          <span className="text-green-500">Home {home * 100}%</span>
          <span className="text-yellow-400">Draw {draw * 100}%</span>
          <span className="text-red-500">Away {away * 100}%</span>
        </div>
      </div>
    </div>
  );
};

export default MatchPrediction;
