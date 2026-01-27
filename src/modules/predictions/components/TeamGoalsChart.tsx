import { motion } from "framer-motion";
import React from "react";

import { Card, CardContent } from "@/components/ui/card";

interface GoalProbability {
  line: string;
  over: number;
  under: number;
}

interface TeamGoalsChartProps {
  title: string;
  data: GoalProbability[];
  colorClass: string;
  variant?: "list" | "bar";
}

const TeamGoalsChart: React.FC<TeamGoalsChartProps> = ({
  title,
  data,
  colorClass,
  variant = "bar",
}) => {
  return (
    <Card className="rounded-2xl bg-card border-border/10 text-white w-full h-full flex flex-col">
      <CardContent className="p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-bold text-white tracking-wide">
            {title}
          </h3>
          <span className="text-[10px] font-medium text-muted-foreground uppercase bg-white/5 px-2 py-1 rounded">
            Over %
          </span>
        </div>

        <div className="space-y-4 flex-1">
          {data.map((item, index) => (
            <div key={item.line} className="w-full">
              {variant === "bar" ? (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-muted-foreground/80">
                      Over {item.line}
                    </span>
                    <span className="text-white font-bold tabular-nums">
                      {item.over.toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.over}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className={`h-full rounded-full ${colorClass} opacity-90`}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0">
                  <span className="text-sm text-muted-foreground/70 font-medium">
                    Over {item.line}
                  </span>
                  <span className="text-base text-white font-bold tabular-nums">
                    {item.over.toFixed(1)}%
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamGoalsChart;
