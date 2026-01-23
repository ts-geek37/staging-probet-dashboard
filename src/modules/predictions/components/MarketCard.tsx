import { motion } from "framer-motion";
import React from "react";

import { Card, CardContent } from "@/components/ui/card";

import MarketPieChart from "./MarketPieChart";

interface MarketData {
  [key: string]: number | unknown[];
}

interface MarketProps {
  type: string;
  data: MarketData;
}

const COLORS: Record<string, string> = {
  yes: "bg-primary-green",
  over: "bg-primary-green",
  home: "bg-primary-green",
  home_home: "bg-primary-green",
  draw_home: "bg-primary-green",
  equal: "bg-primary-yellow",
  draw: "bg-primary-yellow",
  draw_draw: "bg-primary-yellow",
  home_draw: "bg-primary-yellow",
  away_draw: "bg-primary-yellow",
  no: "bg-primary-red",
  under: "bg-primary-red",
  away: "bg-primary-red",
  away_away: "bg-primary-red",
  away_home: "bg-primary-red",
  home_away: "bg-primary-red",
  draw_away: "bg-primary-red",
};

const PRIORITY_ORDER = ["yes", "no", "equal"];

const MarketCard: React.FC<MarketProps> = ({ type, data }) => {
  const entries = Object.entries(data)
    .filter(([_, value]) => typeof value === "number" && value > 0)
    .sort(([labelA], [labelB]) => {
      const keyA = labelA.toLowerCase().trim();
      const keyB = labelB.toLowerCase().trim();
      const indexA = PRIORITY_ORDER.indexOf(keyA);
      const indexB = PRIORITY_ORDER.indexOf(keyB);

      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return 0;
    }) as [string, number][]; // Assert type since filter ensures values are numbers

  if (entries.length === 0) return null;

  // Decide visualization mode
  const marketName = type.toLowerCase();
  // Use Pie for markets with few options, but exclude "correct score" if it ever comes here (though it's usually empty or array).
  // Also "HT/FT" has 9 options, so list is better.
  const usePie = entries.length > 1 && entries.length <= 3 && !marketName.includes("score");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full h-full"
    >
      <Card className="rounded-2xl text-white shadow-xl w-full h-full overflow-hidden flex flex-col">
        <CardContent className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <p className="text-base font-bold text-white  border-l-2 border-primary-green pl-2">
              {type.replace(" Probability", "").replace(/_/g, " ")}
            </p>
          </div>

          <div className="flex-1 flex flex-col justify-center">
             {usePie ? (
               <MarketPieChart data={entries} />
             ) : (
               <div className="grid grid-cols-1 gap-4">
                {entries.map(([label, value], index) => {
                  const key = label.toLowerCase().trim();
                  const barColor = COLORS[key] || "bg-zinc-600";

                  return (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="w-full space-y-1.5"
                    >
                      <div className="flex justify-between items-center text-xs font-medium">
                        <span className="capitalize text-muted-foreground truncate mr-2">
                          {label.replace(/_/g, " ")}
                        </span>
                        <span className="text-white font-semibold">
                          {Number(value).toFixed(1)}%
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
                          className={`h-full rounded-full transition-all ${barColor}`}
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
