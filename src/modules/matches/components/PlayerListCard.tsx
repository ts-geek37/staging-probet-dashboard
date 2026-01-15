import { ArrowRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Player {
  id: number;
  name: string;
  number: number | null;
}

interface PlayerListCardProps {
  title: string;
  icon: React.ElementType;
  players: Player[];
  onPlayerClick: (id: number) => void;
  headerClassName?: string;
  itemClassName?: string;
  numberClassName?: string;
  maxHeightClassName: string;
}

const PlayerListCard: React.FC<PlayerListCardProps> = ({
  title,
  icon: Icon,
  players,
  onPlayerClick,
  headerClassName,
  itemClassName,
  numberClassName,
  maxHeightClassName,
}) => {
  if (players.length === 0) return null;

  return (
    <Card className="overflow-hidden border border-primary-gray/20 p-0">
      <CardHeader className={headerClassName}>
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
          className={`custom-scrollbar overflow-y-auto ${maxHeightClassName}`}
        >
          <div className="divide-y divide-white/5">
            {players.map((player) => (
              <div
                key={player.id}
                onClick={() => onPlayerClick(player.id)}
                className={itemClassName}
              >
                <div className={numberClassName}>{player.number ?? "-"}</div>

                <p className="flex-1 truncate text-sm font-medium text-white">
                  {player.name}
                </p>

                <ArrowRight className="h-4 w-4 text-white/20" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default PlayerListCard;
