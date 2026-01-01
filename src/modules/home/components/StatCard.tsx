import React from "react";

interface Props {
  value: string;
  label: string;
  color: "cyan" | "green" | "yellow" | "white";
}

const colorMap: Record<Props["color"], string> = {
  cyan: "text-primary-neon",
  green: "text-primary-lightgreen",
  yellow: "text-primary-yellow",
  white: "text-white",
};

const StatCard: React.FC<Props> = ({ value, label, color }) => {
  return (
    <div className="rounded-xl border border-[#01E1FA]/20 bg-[#0E1320]/60 px-6 py-5 backdrop-blur">
      <div className={`text-4xl font-extrabold ${colorMap[color]}`}>
        {value}
      </div>
      <div className="text-xs sm:text-sm text-primary-gray">{label}</div>
    </div>
  );
};

export default StatCard;
