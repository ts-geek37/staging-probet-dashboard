import React, { useMemo } from "react";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import {
  StatRow as IStatRow,
  StatSectionConfig,
} from "../hooks/useMatchSeasonStat";

const StatRow: React.FC<IStatRow> = ({
  label,
  homeValue,
  awayValue,
  suffix = "",
  isHigherBetter = true,
}) => {
  const h = Number(homeValue) || 0;
  const a = Number(awayValue) || 0;

  const { homePercent, awayPercent } = useMemo(() => {
    const max = Math.max(h, a);
    const isPercentStat = label.includes("%") || suffix.includes("%");

    const roundedMax =
      max === 0 ? 0 : max % 5 === 0 ? max : Math.ceil(max / 5) * 5;

    switch (true) {
      case h === 0 && a === 0:
        return { homePercent: 0, awayPercent: 0 };

      case h === a:
        return { homePercent: 100, awayPercent: 100 };
      case isPercentStat:
        return {
          homePercent: Math.min(h, 100),
          awayPercent: Math.min(a, 100),
        };

      case h === 0:
        return { homePercent: 0, awayPercent: 100 };

      case a === 0:
        return { homePercent: 100, awayPercent: 0 };

      default:
        return {
          homePercent: (h / (roundedMax || 1)) * 100,
          awayPercent: (a / (roundedMax || 1)) * 100,
        };
    }
  }, [h, a]);

  const { hColor, aColor } = useMemo(() => {
    let homeColor = "text-white";
    let awayColor = "text-white";

    if (h !== a) {
      if (isHigherBetter) {
        if (h > a) homeColor = "text-primary-green";
        else awayColor = "text-primary-red";
      } else {
        if (h < a) homeColor = "text-primary-green";
        else awayColor = "text-primary-red";
      }
    }

    return { hColor: homeColor, aColor: awayColor };
  }, [h, a, isHigherBetter]);

  return (
    <div className="flex flex-col gap-2 py-3 border-b border-white/5 last:border-0">
      <div className="flex justify-between items-center px-1">
        <span className={`text-sm font-bold ${hColor}`}>
          {homeValue ?? "-"}
          {suffix}
        </span>
        <span className="text-[11px] font-bold text-white/40 uppercase tracking-widest">
          {label}
        </span>
        <span className={`text-sm font-bold ${aColor}`}>
          {awayValue ?? "-"}
          {suffix}
        </span>
      </div>

      {(h !== 0 || a !== 0) && (
        <div className="flex gap-2 items-center h-2 w-full">
          <div className="flex-1 h-full bg-white/10 rounded-full overflow-hidden border border-primary-green">
            <div
              className="h-full bg-primary-green transition-all duration-500"
              style={{ width: `${homePercent}%` }}
            />
          </div>

          <div className="flex-1 h-full bg-white/10 rounded-full overflow-hidden border border-primary-red">
            <div
              className="h-full bg-primary-red transition-all duration-500"
              style={{ width: `${awayPercent}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const StatSection: React.FC<StatSectionConfig> = ({
  title,
  icon,
  rows,
  className,
}) => (
  <AccordionItem
    value={title}
    className={cn("border-none w-full max-w-5xl mx-auto", className)}
  >
    <Card className="bg-primary-gray/5 border-primary-gray/20 overflow-hidden p-0 gap-0">
      <AccordionTrigger className="px-4 py-3 bg-white/5 border-b border-white/10 hover:no-underline">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-sm font-bold text-white/90 uppercase tracking-wider">
            {title}
          </h3>
        </div>
      </AccordionTrigger>

      <AccordionContent className="p-0">
        <CardContent className="p-4 space-y-1">
          {rows.map((row, index) => (
            <StatRow key={index} {...row} />
          ))}
        </CardContent>
      </AccordionContent>
    </Card>
  </AccordionItem>
);

export default StatSection;
