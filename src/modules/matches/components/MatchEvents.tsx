"use client";

import { Repeat, Square, Volleyball } from "lucide-react";
import React from "react";

import { MatchEventsResponse } from "@/types/matches";

interface Props {
  event: MatchEventsResponse["events"][number];
  homeTeamId: number;
  homeTeamName: string;
  awayTeamName: string;
}

const EVENT_LABELS: Record<
  MatchEventsResponse["events"][number]["type"],
  string
> = {
  goal: "Goal",
  substitution: "Substitution",
  card: "Card",
};

const MatchEvents: React.FC<Props> = ({
  event,
  homeTeamId,
  homeTeamName,
  awayTeamName,
}) => {
  const isHome = Number(event.team_id) === homeTeamId;
  const teamName = isHome ? homeTeamName : awayTeamName;

  let IconComponent: React.FC<React.SVGProps<SVGSVGElement>> = Square;
  let iconClass = "text-yellow-400 fill-yellow-400";

  if (event.type === "goal") {
    IconComponent = Volleyball;
    iconClass = "text-white";
  }

  if (event.type === "substitution") {
    IconComponent = Repeat;
    iconClass = "text-primary-red";
  }

  const label = EVENT_LABELS[event.type];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 px-4 py-2 rounded-md bg-[#232529]">
      <div className="hidden sm:flex items-center gap-3">
        <span className="text-primary-green font-medium">
          {event.minute}&apos;
        </span>

        <span className="text-white font-medium">{teamName}</span>
        <IconComponent className={`w-4 h-4 ${iconClass}`} />
        <span className="text-gray-300">{label}</span>
        <span className="text-primary-gray">{event.player_name}</span>
      </div>

      <div className="flex flex-col sm:hidden gap-1">
        <div className="flex items-center gap-2">
          <span className="text-primary-green font-medium">
            {event.minute}&apos;
          </span>
          <span className="text-white font-medium">{teamName}</span>
        </div>
        <div className="flex items-center gap-2">
          <IconComponent className={`w-4 h-4 ${iconClass}`} />
          <span className="text-gray-300">{label}</span>
          <span className="text-primary-gray wrap-break-word">
            {event.player_name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MatchEvents;
