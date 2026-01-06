import Image from "next/image";
import React from "react";

import { LeagueProfileResponse } from "@/types/leagues";

interface Props {
  league: LeagueProfileResponse;
}
const LeagueOverView: React.FC<Props> = ({ league }) => {
  const { logo, name, country, current_season } = league ?? {};
  return (
    <div className="flex items-center gap-4">
      <Image
        src={logo || "/league/banner.png"}
        alt={name || "League Banner"}
        width={64}
        height={64}
        className="rounded-lg"
      />
      <div>
        <h1 className="text-3xl text-white font-bold">{name}</h1>
        <div className="flex items-center gap-2 mt-1">
          <Image
            src={country?.flag || "/league/banner.png"}
            alt={country?.name || "League Banner"}
            width={20}
            height={15}
            className="rounded"
          />
          <span className="text-gray-400">{country?.name}</span>
          <span className="text-gray-400">• {current_season?.name}</span>
        </div>
      </div>
    </div>
  );
};
export default LeagueOverView;
