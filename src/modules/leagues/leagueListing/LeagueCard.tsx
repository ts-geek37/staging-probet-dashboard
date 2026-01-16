import { ChevronRight, Crown, Trophy } from "lucide-react";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { LeagueCard as ILeagueCard } from "@/types/leagues";

const COMPETITION_TYPE_ICON = {
  league: Crown,
  cup: Trophy,
};
interface LeagueCardProps {
  league: ILeagueCard;
  onClick: () => void;
}

const LeagueCard: React.FC<LeagueCardProps> = ({ league, onClick }) => {
  const Icon = COMPETITION_TYPE_ICON[league?.competition_type];
  return (
    <Card
      className="group rounded-none gap-0 hover:border-primary-green active:border-primary-green transition-colors cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="flex-1 flex flex-col justify-between gap-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-sm bg-white flex items-center justify-center">
              <Image
                src={league?.logo || "/no-image.png"}
                alt={league?.name || ""}
                width={1000}
                height={1000}
                className="size-10 object-contain"
              />
            </div>
            <div>
              <h3 className="text-white group-hover:text-primary-green group-active:text-primary-green font-semibold text-base">
                {league?.name}
              </h3>
              <div className="flex items-center gap-1.5 mt-1">
                <Image
                  src={league?.country.flag || "/no-image.png"}
                  alt={league?.country?.name || ""}
                  width={1000}
                  height={1000}
                  className="h-4 w-6 object-cover"
                />
                <span className="text-gray-400 text-sm">
                  {league?.country?.name}
                </span>
              </div>
            </div>
          </div>
          <ChevronRight className="size-5 text-gray-400 group-hover:text-primary-green group-active:text-primary-green" />
        </div>
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-primary-gray/20">
          <p className="text-primary-gray text-sm font-medium group-hover:text-primary-green group-active:text-primary-green transition-colors flex items-center gap-1">
            <Icon className="size-4" />
            <span className="capitalize">{league?.competition_type}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
export default LeagueCard;
