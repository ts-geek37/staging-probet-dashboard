"use client";

import React from "react";
import { PieChart, Pie, Cell, Label } from "recharts";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface DoubleChanceMarket {
  type: string;
  data: Record<string, number>;
}

interface Props {
  data: DoubleChanceMarket[];
}

const COLORS = [
  "var(--primary-green)",
  "var(--primary-yellow)",
  "var(--primary-red)",
];

const DoubleChanceCards: React.FC<Props> = ({ data }) => {
  if (!data.length) return null;

  return (
    <div className="flex flex-col gap-4">
      {data.map((market, i) => {
        const chartData = Object.entries(market.data).map(
          ([label, value], idx) => ({
            key: label,
            label: label.replace(/_/g, " "),
            value,
            fill: COLORS[idx % COLORS.length],
          }),
        );

        const dominantItem = chartData.reduce((a, b) =>
          b.value > a.value ? b : a,
        );

        return (
          <Card key={i} className="w-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-white truncate">
                {market.type.replace(/Probability/gi, "").trim()}
              </CardTitle>
            </CardHeader>

            <CardContent className="pt-0 flex flex-col items-center gap-4">
              <PieChart width={300} height={270}>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="label"
                  innerRadius={60}
                  outerRadius={90}
                  stroke="none"
                >
                  {chartData.map((entry) => (
                    <Cell key={entry.key} fill={entry.fill} />
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
                          <tspan x={cx} y={cy} fontSize="20" fontWeight="700">
                            {Math.round(dominantItem.value)}%
                          </tspan>
                          <tspan
                            x={cx}
                            y={cy + 16}
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

              <div className="flex w-full gap-3 justify-center items-center">
                {chartData.map((item) => (
                  <div
                    key={item.key}
                    className="flex flex-col items-center justify-center"
                  >
                    <span
                      className="w-2 h-2 rounded-full mb-1"
                      style={{ backgroundColor: item.fill }}
                    />
                    <span className="text-xs text-white font-medium capitalize">
                      {item.label}
                    </span>
                    <span className="text-xs text-white">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DoubleChanceCards;
