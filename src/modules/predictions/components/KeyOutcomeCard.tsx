import { motion } from "framer-motion";
import React from "react";

import { Card, CardContent } from "@/components/ui/card";

interface OutcomeBarProps {
  label: string;
  homeValue: number;
  awayValue: number;
  drawValue?: number;
  homeLabel: string;
  awayLabel: string;
  type: "binary" | "ternary";
}

const KeyOutcomeCard: React.FC<OutcomeBarProps> = ({
  label,
  homeValue,
  awayValue,
  drawValue,
  homeLabel,
  awayLabel,
  type,
}) => {
  const isTernary = type === "ternary" && drawValue !== undefined;

  return (
    <Card className="rounded-xl text-white w-auto lg:w-full overflow-hidden shadow-sm ">
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-white text-xs sm:text-base">
            {label}
          </h3>
        </div>

        <div className="relative w-full bg-primary-gray/20 rounded-lg flex overflow-hidden h-2 ">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${homeValue}%` }}
            transition={{ duration: 0.8 }}
            className="h-full bg-primary-green"
          />

          {isTernary && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${drawValue}%` }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="h-full bg-primary-yellow"
              style={{ position: "absolute", left: `${homeValue}%` }}
            />
          )}

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${awayValue}%` }}
            transition={{ duration: 0.8, delay: isTernary ? 0.2 : 0.1 }}
            className="h-full bg-primary-red"
            style={{
              position: "absolute",
              left: isTernary
                ? `${homeValue + (drawValue || 0)}%`
                : `${homeValue}%`,
            }}
          />
        </div>

        <div className="flex justify-between mt-2 text-xs font-bold">
          <span className="text-primary-green">
            {homeValue.toFixed(0)}% {type === "ternary" ? homeLabel : "Yes"}
          </span>

          {isTernary && (
            <span className="text-primary-yellow">
              {drawValue?.toFixed(0)}% Draw
            </span>
          )}

          <span className="text-primary-red">
            {awayValue.toFixed(0)}% {type === "ternary" ? awayLabel : "No"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default KeyOutcomeCard;
