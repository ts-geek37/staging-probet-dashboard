import { ChevronRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { League } from "@/types";

interface LeagueCardProps {
  league: League;
  onClick: () => void;
}

const LeagueCard: React.FC<LeagueCardProps> = ({ league, onClick }) => {
  return (
    <Card
      className="group bg-slate-900 border-gray-800 rounded-none hover:border-primary-green transition-colors cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-transparent flex items-center justify-center text-2xl">
              {league.logo_path}
            </div>
            <div>
              <h3 className="text-white group-hover:text-primary-green font-medium text-base">
                {league.name}
              </h3>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-sm">{league.country.image_path}</span>
                <span className="text-gray-400 text-sm">
                  {league.country.name}
                </span>
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary-green" />
        </div>
        <p className="text-gray-500 group-hover:text-primary-green text-sm self-end">
          {league.current_season.name}
        </p>
      </CardContent>
    </Card>
  );
};
export default LeagueCard;
