import { motion } from "framer-motion";
import React from "react";

import { Card, CardContent } from "@/components/ui/card";

interface GoalLineCardProps {
  line: string;
  matchValue?: number | null;
  homeValue?: number | null;
  awayValue?: number | null;
}

const GoalLineCard: React.FC<GoalLineCardProps> = ({
  line,
  matchValue = 0,
  homeValue = 0,
  awayValue = 0,
}) => {
  const items = [
    {
      label: "Overall",
      value: matchValue ?? 0,
      color: "bg-primary-red",
      textColor: "text-primary-red",
    },
    {
      label: "Home Team",
      value: homeValue ?? 0,
      color: "bg-primary-green",
      textColor: "text-primary-green",
    },
    {
      label: "Away Team",
      value: awayValue ?? 0,
      color: "bg-primary-yellow",
      textColor: "text-primary-yellow",
    },
  ];

  return (
    <Card className="rounded-2xl text-white w-full overflow-hidden">
      <CardContent className="px-4">
        <div className="flex items-center justify-between mb-4 border-b border-primary-gray/20 pb-2">
          <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
            Over {line} Goals
          </h3>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={item.label} className="w-full">
              <div className="flex justify-between items-center mb-1 gap-2">
                <span className="text-[11px] sm:text-xs font-medium text-muted-foreground truncate uppercase tracking-wider">
                  {item.label}
                </span>
                <span
                  className={`text-xs sm:text-sm font-bold ${item.textColor}`}
                >
                  {(item.value ?? 0).toFixed(1)}%
                </span>
              </div>
              <div className="h-1.5 sm:h-2 w-full bg-primary-gray/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.value ?? 0}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`h-full rounded-full ${item.color}`}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GoalLineCard;
