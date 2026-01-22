"use client";

import { motion } from "framer-motion";

import { MatchEventItem } from "@/types/matches";

type HighlightType = "highlight" | "normal";

interface DescriptionToken {
  text: string;
  type: HighlightType;
}

const highlightClassMap: Record<HighlightType, string> = {
  highlight: "text-primary-green font-semibold capitalize",
  normal: "text-primary-gray",
};

const generateEventDescription = (
  event: MatchEventItem,
): DescriptionToken[] => {
  switch (event.type) {
    case "GOAL":
      return [
        { text: event.player?.name || "Player", type: "highlight" },
        { text: " scores for ", type: "normal" },
        { text: event.team?.name || "the team", type: "highlight" },
        {
          text: event.detail ? ` with a ${event.detail.toLowerCase()}` : "",
          type: "normal",
        },
        { text: "!", type: "normal" },
      ];

    case "OWN_GOAL":
      return [
        { text: event.player?.name || "Player", type: "highlight" },
        { text: " scores an unfortunate own goal for ", type: "normal" },
        { text: event.team?.name || "the opposition", type: "highlight" },
        { text: ".", type: "normal" },
      ];

    case "PENALTY_GOAL":
      return [
        { text: event.player?.name || "Player", type: "highlight" },
        { text: " converts from the penalty spot", type: "normal" },
        {
          text: event.detail ? ` - ${event.detail.toLowerCase()}` : "",
          type: "normal",
        },
        { text: "!", type: "normal" },
      ];

    case "CARD":
      const cardType = event.detail?.toLowerCase().includes("red")
        ? "red card"
        : event.detail?.toLowerCase().includes("yellow")
          ? "yellow card"
          : "card";
      return [
        { text: event.player?.name || "Player", type: "highlight" },
        { text: " receives a ", type: "normal" },
        { text: cardType, type: "highlight" },
        {
          text:
            event.detail && !event.detail.toLowerCase().includes("card")
              ? ` for ${event.detail.toLowerCase()}`
              : "",
          type: "normal",
        },
        { text: ".", type: "normal" },
      ];

    case "SUBSTITUTION":
      return [
        { text: event.related_player?.name || "Player", type: "highlight" },
        { text: " comes on for ", type: "normal" },
        { text: event.player?.name || "teammate", type: "highlight" },
        { text: ".", type: "normal" },
      ];

    case "PERIOD_START":
      return [{ text: event.detail || "Match period begins.", type: "normal" }];

    case "PERIOD_END":
      return [{ text: event.detail || "Match period ends.", type: "normal" }];

    case "VAR":
      return [
        {
          text: `VAR Review${event.detail ? `: ${event.detail}` : " in progress"}`,
          type: "normal",
        },
      ];

    case "SYSTEM":
      return [{ text: event.detail || "System notification", type: "normal" }];

    case "OTHER":
    default:
      return [{ text: event.detail || "Match update", type: "normal" }];
  }
};

const EventDescription = ({ event }: { event: MatchEventItem }) => {
  const eventDescription = generateEventDescription(event);

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-1 text-xs sm:text-sm leading-snug text-primary-gray font-medium"
    >
      {eventDescription.map((t, i) => (
        <span key={i} className={highlightClassMap[t.type]}>
          {t.text}
        </span>
      ))}
    </motion.p>
  );
};
export default EventDescription;
