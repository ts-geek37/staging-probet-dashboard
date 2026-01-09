import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { LeagueCard } from "@/types/home";

interface Props {
  leagues: LeagueCard[];
}

const TopLeaguesList: React.FC<Props> = ({ leagues }) => {
  if (!leagues.length) return null;

  return (
    <div className="space-y-3">
      {leagues.map((league) => {
        return (
          <Card
            key={league.id}
            className="border-primary-gray/20 overflow-hidden rounded-md py-7 mb-2"
          >
            <CardContent className="flex items-center justify-between px-5 ">
              <div className="flex items-center gap-4">
                <div className="relative w-7 h-7">
                  <Image
                    src={league.logo || "/no-image.png"}
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="space-y-1">
                  <p className="font-medium text-white text-lg">
                    {league.name}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-primary-gray">
                    {league.country.flag && (
                      <div className="relative w-4 h-4">
                        <Image
                          src={league.country.flag}
                          alt={league.country.name}
                          fill
                          className="object-contain rounded-sm"
                        />
                      </div>
                    )}
                    <span>{league.country.name}</span>
                  </div>
                </div>
              </div>

              <Link href={`/leagues/${league.id}`}>
                <div className="flex items-center gap-3 ">
                  <span className="text-white">{league.competition_type}</span>
                  <span className="text-white text-lg">›</span>
                </div>
              </Link>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default TopLeaguesList;
