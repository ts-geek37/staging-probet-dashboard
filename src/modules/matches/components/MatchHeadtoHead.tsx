"use client";

import { Calendar, MapPin } from "lucide-react";

import { Badge } from "@/components/ui/badge";

const MatchHeadToHead = () => {
  const headToHead = [
    {
      season: "2023/24",
      competition: "Premier League",
      home: "Manchester United",
      homeLogo: "MU",
      away: "Liverpool",
      awayLogo: "LIV",
      score: "2 - 1",
      date: "Sep 10, 2023",
      venue: "Old Trafford",
      status: "Finished",
    },
    {
      season: "2023/24",
      competition: "FA Cup",
      home: "Liverpool",
      homeLogo: "LIV",
      away: "Manchester United",
      awayLogo: "MU",
      score: "1 - 1",
      date: "Jan 15, 2023",
      venue: "Anfield",
      status: "Finished",
    },
    {
      season: "2022/23",
      competition: "Premier League",
      home: "Manchester United",
      homeLogo: "MU",
      away: "Liverpool",
      awayLogo: "LIV",
      score: "0 - 3",
      date: "Mar 05, 2022",
      venue: "Old Trafford",
      status: "Finished",
    },
  ];

  return (
    <>
      {headToHead.map((match, idx) => (
        <div
          key={idx}
          className="bg-[#12151C] text-white border border-primary-gray/20 rounded-xl overflow-hidden mb-4 max-w-5xl mx-auto w-full"
        >
          <div className="flex flex-wrap justify-between items-center gap-2 px-3 sm:px-4 py-2 bg-gray-950 text-[10px] sm:text-xs text-primary-gray">
            <span>
              {match.competition} • {match.season}
            </span>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {match.date}
            </div>
          </div>
          <div className="p-3 sm:p-4 flex flex-row items-center justify-between gap-4">
            <div className="flex-1 flex flex-col items-center text-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-900/30 rounded-full flex items-center justify-center mb-1 sm:mb-2 border border-red-500/20 text-xs font-bold">
                {match.homeLogo}
              </div>
              <span className="text-xs sm:text-sm md:text-base font-semibold">
                {match.home}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-base sm:text-xl md:text-2xl font-black bg-primary-gray/10 px-3 sm:px-4 py-1 rounded-lg border border-primary-gray/20">
                {match.score}
              </div>
              <Badge
                variant="finished"
                className="mt-1 sm:mt-2 sm:text-[12px] sm:py-1 "
              >
                {match.status}
              </Badge>
            </div>

            <div className="flex-1 flex flex-col items-center text-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-1 sm:mb-2 border border- text-xs font-bold">
                {match.awayLogo}
              </div>
              <span className="text-xs sm:text-sm md:text-base font-semibold">
                {match.away}
              </span>
            </div>
          </div>
          <div className="px-3 sm:px-4 py-2 border-t border-primary-gray/20 flex items-center gap-1 text-[10px] sm:text-xs text-primary-gray">
            <MapPin className="w-3 h-3" />
            {match.venue}
          </div>
        </div>
      ))}
    </>
  );
};

export default MatchHeadToHead;
