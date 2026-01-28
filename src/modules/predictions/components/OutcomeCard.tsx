import { motion } from "framer-motion";
import React from "react";

import { Card, CardContent } from "@/components/ui/card";

interface OutcomeCardProps {
  label: string;
  value: number;
  colorClass: string;
  teamName?: string;
}

const OutcomeCard: React.FC<OutcomeCardProps> = ({
  label,
  value,
  colorClass,
  teamName,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="rounded-2xl text-white w-full h-full flex flex-col justify-center">
        <CardContent>
          <p className="text-xs sm:text-base font-medium text-muted-foreground mb-1">
            {teamName ? `${teamName} Win` : label}
          </p>

          <div
            className={`text-3xl sm:text-5xl font-bold ${colorClass} tracking-tight tabular-nums`}
          >
            {value.toFixed(1)}%
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default OutcomeCard;
