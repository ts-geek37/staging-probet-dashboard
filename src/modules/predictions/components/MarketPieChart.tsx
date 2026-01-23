import React, { useMemo } from "react";

interface Props {
  data: [string, number][];
  size?: number;
  strokeWidth?: number;
}

const COLORS: Record<string, string> = {
  yes: "var(--primary-green)",
  equal: "var(--primary-yellow)",
  no: "var(--primary-red)",
};

const MarketPieChart: React.FC<Props> = ({ data, size = 160, strokeWidth = 16 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const { processedData, dominantItem } = useMemo(() => {
    let currentRotation = 0;
    const sorted = [...data].sort((a, b) => b[1] - a[1]);

    const items = data.map(([label, value]) => {
      const percent = value / 100;
      const rotation = currentRotation;
      currentRotation += percent * 360;

      return {
        label,
        displayLabel: label.replace(/_/g, " "),
        value,
        rotation,
        color: COLORS[label.toLowerCase()] || "gray",
        dashOffset: circumference * (1 - percent),
      };
    });

    return { processedData: items, dominantItem: sorted[0] };
  }, [data, circumference]);

  return (
    <div className="flex flex-col items-center justify-center p-2 sm:p-4 w-full h-full">
      <div className="relative w-full max-w-35 sm:max-w-40 aspect-square">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full -rotate-90">
          {processedData.map((item) => (
            <circle
              key={item.label}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={item.color}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={item.dashOffset}
              style={{
                transformOrigin: "center",
                rotate: `${item.rotation}deg`,
                transition: "stroke-dashoffset 1s ease-out", // Smooth entry
              }}
            />
          ))}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl sm:text-2xl font-bold text-white">
            {dominantItem ? Math.round(dominantItem[1]) : 0}%
          </span>
          <span className="text-[9px] sm:text-[10px] text-muted-foreground uppercase max-w-[70%] text-center truncate px-1">
            {dominantItem?.[0].replace(/_/g, " ")}
          </span>
        </div>
      </div>

      <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-x-2 sm:gap-x-4 gap-y-1 sm:gap-y-2 w-full">
        {processedData.map((item) => (
          <div key={item.label} className="flex items-center justify-between text-[10px] sm:text-xs">
            <div className="flex items-center gap-1.5 overflow-hidden">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
              <span className="capitalize text-primary-gray text-sm truncate">{item.displayLabel}</span>
            </div>
            <span className="font-semibold text-white ml-1 mr-3">{item.value.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketPieChart;
