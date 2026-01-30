import React from "react";

import { Card, CardContent } from "@/components/ui/card";

interface PredictionSentenceCardProps {
  text: string;
  homeLabel: string;
  awayLabel: string;
}

const PredictionSentenceCard: React.FC<PredictionSentenceCardProps> = ({
  text,
  homeLabel,
  awayLabel,
}) => {
  const formattedText = text
    .replace(/\bHome team\b/g, homeLabel)
    .replace(/\bAway team\b/g, awayLabel);

  return (
    <Card className="text-white/90 rounded-2xl shadow-md w-full">
      <CardContent className="text-xs sm:text-base">
        {formattedText}
      </CardContent>
    </Card>
  );
};

export default PredictionSentenceCard;
