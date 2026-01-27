import React from "react";

import { Card, CardContent } from "@/components/ui/card";

interface PredictionSentenceCardProps {
  text: string;
}

const PredictionSentenceCard: React.FC<PredictionSentenceCardProps> = ({
  text,
}) => {
  return (
    <Card className="text-white/90 rounded-2xl shadow-md w-full">
      <CardContent className="text-xs sm:text-base">{text}</CardContent>
    </Card>
  );
};

export default PredictionSentenceCard;
