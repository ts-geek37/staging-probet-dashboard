import { motion } from "framer-motion";
import React from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface ChartDataPoint {
  label: string;
  homeValue: number;
  awayValue: number;
}

interface PredictionChartProps {
  data: ChartDataPoint[];
}

const PredictionChart: React.FC<PredictionChartProps> = ({ data }) => {
  const ticks = [100, 80, 60, 40, 20, 0];

  return (
    <Card className="rounded-2xl bg-card border-border/10 text-white w-full flex flex-col min-h-112.5">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Prediction Distribution
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Comparative analysis of key outcomes
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-end pb-8 pt-4 px-6 relative">
        <div
          className="relative w-full flex-1 min-h-62.5"
          style={{ minHeight: "250px" }}
        >
          <div className="absolute inset-0 w-full h-full pointer-events-none flex flex-col justify-between">
            {ticks.map((tick) => (
              <div key={tick} className="w-full flex items-center relative h-0">
                <span className="absolute -left-8 text-[10px] text-muted-foreground font-medium -translate-y-1/2 w-6 text-right">
                  {tick}
                </span>
                <div className="w-full border-b border-dashed border-white/10" />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 w-full h-full flex justify-around items-end pt-4 pb-0 z-10 pl-2">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-end h-full w-1/3 group relative"
              >
                <div className="flex items-end justify-center gap-2 sm:gap-6 w-full h-full px-2">
                  <div className="relative w-8 sm:w-16 h-full flex items-end justify-center group/bar">
                    <div
                      className="absolute -top-6 text-[10px] sm:text-xs font-bold text-primary-green opacity-90 mb-1 transition-all"
                      style={{ bottom: `${item.homeValue}%`, top: "auto" }}
                    >
                      {item.homeValue.toFixed(1)}%
                    </div>

                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${item.homeValue}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className="w-full bg-primary-green/90 hover:bg-primary-green rounded-t-sm transition-colors relative"
                    />
                  </div>

                  <div className="relative w-8 sm:w-16 h-full flex items-end justify-center group/bar">
                    <div
                      className="absolute -top-6 text-[10px] sm:text-xs font-bold text-primary-red opacity-90 mb-1 transition-all"
                      style={{ bottom: `${item.awayValue}%`, top: "auto" }}
                    >
                      {item.awayValue.toFixed(1)}%
                    </div>

                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${item.awayValue}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 + 0.1 }}
                      className="w-full bg-primary-red/90 hover:bg-primary-red rounded-t-sm transition-colors relative"
                    />
                  </div>
                </div>

                <div className="absolute -bottom-8 w-full text-center">
                  <span className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-8 w-full" />
      </CardContent>
      <div className="p-4 border-t border-white/5 flex justify-center gap-8 bg-black/20">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary-green rounded-sm" />
          <span className="text-xs font-medium text-primary-green">
            Home / Yes
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary-red rounded-sm" />
          <span className="text-xs font-medium text-primary-red">
            Away / No
          </span>
        </div>
      </div>
    </Card>
  );
};

export default PredictionChart;
