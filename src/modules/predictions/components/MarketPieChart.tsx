"use client";

import * as React from "react";
import { Pie, PieChart, Label, Cell } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

interface Props {
  data: [string, number][];
  size?: number;
  strokeWidth?: number;
}

const COLORS: Record<string, string> = {
  yes: "var(--primary-green)",
  equal: "var(--primary-yellow)",
  no: "var(--primary-red)",
  draw_home: "var(--primary-green)",
  draw_away: "var(--primary-red)",
  home_away: "var(--primary-yellow)",
};

const MarketPieChart: React.FC<Props> = ({
  data,
  size = 200,
  strokeWidth = 23,
}) => {
  const chartData = React.useMemo(
    () =>
      data.map(([label, value]) => ({
        key: label,
        label: label.replace(/_/g, " "),
        value,
        fill: COLORS[label.toLowerCase()] ?? "#6b7280",
      })),
    [data],
  );

  const dominantItem = React.useMemo(
    () => chartData.reduce((a, b) => (b.value > a.value ? b : a), chartData[0]),
    [chartData],
  );

  const chartConfig = React.useMemo(() => {
    const config: ChartConfig = {
      value: { label: "Probability" },
    };

    chartData.forEach((item) => {
      config[item.key] = {
        label: item.label,
        color: item.fill,
      };
    });

    return config;
  }, [chartData]);

  return (
    <div className="flex flex-col items-center justify-center p-2 w-full h-full">
      <ChartContainer
        config={chartConfig}
        className="mx-auto"
        style={{ width: size, height: size }}
      >
        <PieChart width={size} height={size}>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />

          <Pie
            data={chartData}
            dataKey="value"
            nameKey="label"
            innerRadius={size / 2 - strokeWidth}
            outerRadius={size / 2}
            stroke="none"
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={entry.fill} />
            ))}

            <Label
              content={({ viewBox }) => {
                if (!viewBox) return null;

                const { cx, cy } = viewBox as {
                  cx: number;
                  cy: number;
                };

                return (
                  <text
                    x={cx}
                    y={cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#ffffff"
                  >
                    <tspan x={cx} y={cy} fontSize="22" fontWeight="700">
                      {Math.round(dominantItem.value)}%
                    </tspan>
                    <tspan
                      x={cx}
                      y={cy + 18}
                      fontSize="10"
                      letterSpacing="0.08em"
                    >
                      {dominantItem.label}
                    </tspan>
                  </text>
                );
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>

      <div className="mt-3 grid grid-cols-2 gap-x-2 gap-y-1 w-full">
        {chartData.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between text-xs"
          >
            <div className="flex items-center gap-1.5 overflow-hidden">
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: item.fill }}
              />
              <span className="capitalize text-primary-gray truncate">
                {item.label}
              </span>
            </div>
            <span className="font-semibold text-white ml-1 mr-3">
              {item.value.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketPieChart;
