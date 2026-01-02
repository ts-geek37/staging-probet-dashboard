import React from "react";

interface MatchTimerProps {
  hours: string;
  minutes: string;
  seconds: string;
}

const MatchTimer: React.FC<MatchTimerProps> = ({ hours, minutes, seconds }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold text-white">{hours}</span>
        <span className="text-xs text-gray-500">HH</span>
      </div>
      <span className="text-2xl font-bold text-white">:</span>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold text-white">{minutes}</span>
        <span className="text-xs text-gray-500">MM</span>
      </div>
      <span className="text-2xl font-bold text-white">:</span>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold text-white">{seconds}</span>
        <span className="text-xs text-gray-500">SS</span>
      </div>
    </div>
  );
};

export default MatchTimer;
