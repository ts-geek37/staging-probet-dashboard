"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Repeat,
  Square,
  Trophy,
  Clock,
  ShieldAlert,
  LucideIcon,
} from "lucide-react";
import Image from "next/image";
import React from "react";

import { MatchEventItem } from "@/types/matches";

const EVENT_CONFIG: Record<
  string,
  { label: string; icon: LucideIcon; color: string; bgColor: string }
> = {
  GOAL: {
    label: "Goal",
    icon: Trophy,
    color: "text-green-400",
    bgColor: "bg-green-500/10",
  },
  OWN_GOAL: {
    label: "Own Goal",
    icon: Trophy,
    color: "text-red-400",
    bgColor: "bg-red-500/10",
  },
  PENALTY_GOAL: {
    label: "Penalty",
    icon: Trophy,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
  CARD: {
    label: "Card",
    icon: Square,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
  },
  SUBSTITUTION: {
    label: "Substitution",
    icon: Repeat,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  VAR: {
    label: "VAR",
    icon: ShieldAlert,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
  },
  DEFAULT: {
    label: "Match Event",
    icon: Clock,
    color: "text-primary-gray",
    bgColor: "bg-primary-gray/10",
  },
};

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
      className="group relative flex items-start gap-2 sm:gap-4 py-3 px-2 sm:px-4 rounded-2xl hover:bg-white/5 transition-colors overflow-hidden"
    >
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-linear-to-b from-transparent via-white/10 to-transparent group-hover:via-primary-green/50 transition-all" />

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

        <div
          className={`relative p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl ${bgColor} border border-white/5 shadow-lg shrink-0`}
        >
          <config.icon
            className={`relative z-10 w-4 h-4 sm:w-6 sm:h-6 ${iconColor}`}
            strokeWidth={2.5}
          />
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

        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-x-3">
          <h4 className="text-xs sm:text-sm font-bold text-white tracking-wide group-hover:text-primary-green transition-colors truncate">
            {event.player?.name || "Match Update"}
          </h4>

          <AnimatePresence>
            {event.related_player && (
              <motion.div
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-primary-gray/80 bg-white/5 px-2 py-0.5 rounded-full w-fit"
              >
                <Repeat className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-400" />
                <span className="truncate">{event.related_player.name}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {event.detail && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            className="text-xs sm:text-sm text-primary-gray mt-1 font-medium line-clamp-2 sm:line-clamp-none"
          >
            {event.detail}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default MatchEvents;
