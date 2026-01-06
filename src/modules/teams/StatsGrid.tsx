"use client";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatItem {
  label: string;
  value: string | number;
  color?: string;
}

interface StatsGridProps {
  title?: string;
  stats: StatItem[];
  columns?: string;
  variant?: "default" | "nested";
  isLastCentered?: boolean;
}

const StatsGrid: React.FC<StatsGridProps> = ({
  title,
  stats,
  columns = "grid-cols-2 lg:grid-cols-4",
  variant = "default",
  isLastCentered = false,
}) => {
  
  const child = () => (
    <div className={cn("grid gap-4", columns)}>
      {stats.map((stat, index) => {
        const isLast = index === stats.length - 1;
        const isCentered = isLastCentered && isLast && stats.length % 2 !== 0;
        return (
          <Card
            key={stat.label}
            className={cn(
              "group gap-1 py-4 items-center justify-center border border-transparent",
              variant === "nested"
                ? "hover:border-primary-green"
                : "hover:border-gray-700",
              isCentered && "col-span-1 sm:col-span-2 lg:col-span-1",
            )}
          >
            <p
              className={cn(
                "text-2xl font-semibold",
                stat.color ?? "text-white group-hover:text-primary-green",
              )}
            >
              {stat.value}
            </p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </Card>
        );
      })}
    </div>
  );

  if (variant === "nested") {
    return (
      <Card
        className={cn(
          "gap-3 sm:gap-5 border max-sm:py-3 border-gray-800 bg-transparent",
          title && "px-3 sm:px-6",
        )}
      >
        {title && (
          <h3 className="font-semibold text-xl text-primary-green">{title}</h3>
        )}
        {child()}
      </Card>
    );
  }

  return child();
};

export default StatsGrid;
