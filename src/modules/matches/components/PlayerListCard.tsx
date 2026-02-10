import { ArrowRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Player {
  id: number;
  name: string;
  number: number | null;
  formation_field: string | null;
}

interface PlayerListCardProps {
  title: string;
  icon: React.ElementType;
  players: Player[];
  onPlayerClick: (id: number) => void;
  headerClassName?: string;
  itemClassName?: string;
  numberClassName?: string;
  maxHeightClassName?: string;
}

const PlayerListCard: React.FC<PlayerListCardProps> = ({
  title,
  icon: Icon,
  players,
  onPlayerClick,
  headerClassName,
  itemClassName,
  numberClassName,
  maxHeightClassName = "max-h-[280px]",
}) => {
  if (players.length === 0) return null;

  return (
    <Card className="overflow-hidden border border-primary-gray/20 gap-0 p-0">
      <CardHeader
        className={cn(
          "px-5 py-4 border-b border-primary-gray/20",
          headerClassName,
        )}
      >
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wide text-white">
            <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
            {title}
          </CardTitle>
          <span className="text-[10px] sm:text-xs text-white/50">
            {players.length} Players
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div
          className={cn("custom-scrollbar overflow-y-auto", maxHeightClassName)}
        >
          <div className="divide-y divide-white/5">
            {players.map((player) => (
              <div
                key={player.id}
                onClick={() => onPlayerClick(player.id)}
                className={cn(
                  "group flex cursor-pointer items-center gap-4 px-5 py-3 transition-all",
                  "active:scale-[0.98]",
                  itemClassName,
                )}
              >
                <div
                  className={cn(
                    "flex size-9 items-center justify-center rounded-lg transition-colors",
                    numberClassName,
                  )}
                >
                  {player.number ?? "-"}
                </div>

                <p className="flex-1 truncate text-sm font-medium text-white">
                  {player.name}
                </p>

                {player.formation_field && (
                  <span className="text-xs sm:text-sm text-white/50 font-medium">
                    {player.formation_field}
                  </span>
                )}

                <ArrowRight
                  className={cn(
                    "h-4 w-4 transition-transform transition-colors",
                    "text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5",
                    "group-active:text-white/80 group-active:translate-x-0.5",
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default PlayerListCard;
