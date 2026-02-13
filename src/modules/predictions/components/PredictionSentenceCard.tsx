import { Card, CardContent } from "@/components/ui/card";

interface PredictionSentenceCardProps {
  text: string[];
  homeLabel: string;
  awayLabel: string;
}

const PredictionSentenceCard: React.FC<PredictionSentenceCardProps> = ({
  text,
  homeLabel,
  awayLabel,
}) => {
  if (!text || text.length === 0) return null;

  const sentences = text.slice(0, 2);

  const formatText = (t: string) =>
    t
      .replace(/\bHome team\b/gi, homeLabel)
      .replace(/\bAway team\b/gi, awayLabel)
      .replace(/\bhome side\b/gi, homeLabel)
      .replace(/\baway side\b/gi, awayLabel);

  return (
    <Card className="text-white py-0 bg-white/5 border-white/10 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
      <CardContent className="p-4 sm:p-5">
        <div className="flex flex-col gap-3">
          {sentences.map((sentence, index) => (
            <p
              key={index}
              className={
                index === 0
                  ? "text-lg sm:text-xl font-bold text-white leading-tight"
                  : "text-sm sm:text-base font-medium text-white/80 leading-relaxed"
              }
            >
              {formatText(sentence)}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionSentenceCard;
