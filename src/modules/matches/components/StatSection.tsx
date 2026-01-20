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

  let hColor = "text-white";
  let aColor = "text-white";

  if (h !== a) {
    if (isHigherBetter) {
      if (h > a) hColor = "text-primary-green";
      else aColor = "text-primary-green";
    } else {
      if (h < a) hColor = "text-primary-green";
      else aColor = "text-primary-green";
    }
  }

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
      <div className="flex gap-1.5 h-1.5 w-full rounded-full overflow-hidden bg-white/5">
        <div
          className={`h-full transition-all duration-500 ${h > a ? "bg-primary-green" : "bg-white/20"}`}
          style={{ width: `${(h / (h + a || 1)) * 100}%` }}
        />
        <div
          className={`h-full transition-all duration-500 ${a > h ? "bg-primary-green" : "bg-white/20"}`}
          style={{ width: `${(a / (h + a || 1)) * 100}%` }}
        />
      </div>
    </div>
  );
};

const StatSection: React.FC<StatSectionConfig> = ({
  title,
  icon,
  rows,
  className,
}) => (
  <AccordionItem value={title} className={cn("border-none", className)}>
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
