import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

  const summary = text[0];
  const stripes = text.slice(1, 3);
  const sentences = text.slice(3);

  const formatText = (t: string) =>
    t.replace(/\bHome team\b/g, homeLabel).replace(/\bAway team\b/g, awayLabel);

  return (
    <Card className="text-white bg-white/5 border-white/10 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-4">
          {summary && (
            <CardTitle className="text-xl sm:text-2xl font-bold text-primary-green tracking-tight">
              {formatText(summary)}
            </CardTitle>
          )}

          {stripes.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {stripes.map((stripe, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className={`
                    ${index === 0 ? "px-4 py-1.5 text-sm sm:text-base font-bold" : "px-3 py-1 text-xs font-semibold opacity-80"}
                    bg-primary-green/20 text-primary-green border-primary-green/30 hover:bg-primary-green/30 transition-all rounded-full
                  `}
                >
                  {formatText(stripe)}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardHeader>
      {sentences.length > 0 && (
        <CardContent className="pt-0">
          <div className="space-y-2">
            {sentences.map((sentence, index) => (
              <p
                key={index}
                className="text-sm sm:text-base text-white/80 leading-relaxed"
              >
                {formatText(sentence)}
              </p>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default PredictionSentenceCard;
