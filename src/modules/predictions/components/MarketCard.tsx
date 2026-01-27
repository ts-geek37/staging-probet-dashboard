import { motion } from "framer-motion";
import React from "react";

import { Card, CardContent } from "@/components/ui/card";

import MarketPieChart from "./MarketPieChart";
import { MARKET_COLORS, MARKET_PRIORITY_ORDER } from "../constants/predictions";

interface MarketData {
  [key: string]: number | unknown[];
}

interface MarketProps {
  type: string;
  data: MarketData;
}

const MarketCard: React.FC<MarketProps> = ({ type, data }) => {
  const entries = Object.entries(data)
    .filter(([, value]) => typeof value === "number" && value > 0)
    .sort(([a], [b]) => {
      const keyA = a.toLowerCase().trim();
      const keyB = b.toLowerCase().trim();

      const indexA = MARKET_PRIORITY_ORDER.indexOf(keyA);
      const indexB = MARKET_PRIORITY_ORDER.indexOf(keyB);

      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return 0;
    }) as [string, number][];

  if (!entries.length) return null;

  const marketName = type.toLowerCase();
  const shouldUsePieChart =
    entries.length > 1 && entries.length <= 3 && !marketName.includes("score");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full h-full"
    >
      <Card className="rounded-2xl text-white shadow-xl w-full h-full overflow-hidden flex flex-col">
        <CardContent className="flex-1 flex flex-col">
          <div className="mb-4">
            <p className="text-base font-bold border-l-2 border-primary-green pl-2">
              {type.replace(" Probability", "").replace(/_/g, " ")}
            </p>
          </div>

          <div className="flex-1 flex items-center">
            {shouldUsePieChart ? (
              <MarketPieChart data={entries} />
            ) : (
              <div className="grid grid-cols-1 gap-4 w-full">
                {entries.map(([label, value], index) => {
                  const key = label.toLowerCase().trim();
                  const barColor = MARKET_COLORS[key] ?? "bg-zinc-600";

                  return (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-1.5"
                    >
                      <div className="flex justify-between text-xs font-medium">
                        <span className="capitalize text-muted-foreground truncate">
                          {label.replace(/_/g, " ")}
                        </span>
                        <span className="font-semibold text-white">
                          {value.toFixed(1)}%
                        </span>
                      </div>

                      <div className="h-2 w-full rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${value}%` }}
                          transition={{
                            duration: 0.8,
                            ease: "easeOut",
                            delay: index * 0.1 + 0.2,
                          }}
                          className={`h-full rounded-full ${barColor}`}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MarketCard;
