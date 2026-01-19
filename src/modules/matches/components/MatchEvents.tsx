"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

import { cn } from "@/lib/utils";
import { MatchEventItem } from "@/types/matches";

import { EVENT_CONFIG } from "../constants";
import EventDescription from "./EventDespcription";

interface Props {
  event: MatchEventItem;
  index: number;
}
const MatchEvents: React.FC<Props> = ({ event, index }) => {
  const config = EVENT_CONFIG[event.type] || EVENT_CONFIG.DEFAULT;
  const isRedCard =
    event.type === "CARD" && event.detail?.toLowerCase().includes("red");

  const iconColor = isRedCard ? "text-red-500" : config.color;
  const bgColor = isRedCard ? "bg-red-500/20" : config.bgColor;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
      className="group relative flex items-start gap-2 sm:gap-4 py-3 px-2 sm:px-4 hover:bg-white/5 transition-colors overflow-hidden"
    >
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-white/10 to-transparent group-hover:via-primary-green/50 transition-all" />

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <div className="min-w-9 sm:w-12 text-right">
          <motion.span
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-sm sm:text-xl font-black text-primary-green block"
          >
            {event.minute}
            {event.extra_minute ? `+${event.extra_minute}` : ""}
            <span>&apos;</span>
          </motion.span>
        </div>
      </div>

      <div className="flex-1 pt-0.5 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs sm:text-sm font-bold uppercase tracking-tighter sm:tracking-widest text-emerald-500/80"
          >
            {config.label}
          </motion.span>

          {event.team?.logo && (
            <Image
              src={event.team.logo}
              alt={event.team.name ?? "Team logo"}
              width={16}
              height={16}
              className="rounded-full"
            />
          )}

          {event.team?.name && (
            <span className="text-xs sm:text-sm text-primary-gray font-medium opacity-60 truncate">
              • {event.team.name}
            </span>
          )}
        </div>
        <EventDescription event={event} />
      </div>
      <div
        className={cn(
          "relative p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border border-white/5 shadow-lg shrink-0",
          bgColor,
        )}
      >
        <config.icon
          className={`relative z-10 w-4 h-4 sm:w-6 sm:h-6 ${iconColor}`}
          strokeWidth={2.5}
        />
      </div>
    </motion.div>
  );
};

export default MatchEvents;
