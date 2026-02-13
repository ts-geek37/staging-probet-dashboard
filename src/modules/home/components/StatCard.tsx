"use client";
import React from "react";
import CountUp from "react-countup";

interface Props {
  value: string;
  label: string;
  color: "cyan" | "green" | "yellow" | "white";
  suffix?: string;
  isAnimated?: boolean;
}

const colorMap: Record<Props["color"], string> = {
  cyan: "text-primary-neon",
  green: "text-primary-lightgreen",
  yellow: "text-primary-yellow",
  white: "text-white",
};

const StatCard: React.FC<Props> = ({
  value,
  label,
  color,
  suffix = "",
  isAnimated = false,
}) => {
  return (
    <div className="rounded-xl border border-[#01E1FA]/20 bg-[#0E1320]/60 px-6 py-5 backdrop-blur">
      <div className={`text-4xl font-extrabold ${colorMap[color]}`}>
        {isAnimated ? (
          <CountUp
            end={Number(value)}
            start={0}
            duration={4}
            suffix={suffix}
            scrollSpyOnce
            enableScrollSpy
          />
        ) : (
          <span>
            {value}
            {suffix}
          </span>
        )}
      </div>
      <div className="text-xs sm:text-sm text-primary-gray">{label}</div>
    </div>
  );
};

export default StatCard;
