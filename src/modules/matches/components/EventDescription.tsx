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

const PUNCTUATION = [".", "!", ",", ":"];

const token = (text: string, type: HighlightType): DescriptionToken => ({
  text,
  type,
});

const generateEventDescription = (
  event: MatchEventItem,
): DescriptionToken[] => {
  switch (event.type) {
    case "GOAL":
      return [
        token(event.player?.name || "Player", "highlight"),
        token("scores for", "normal"),
        token(event.team?.name || "the team", "highlight"),
        ...(event.detail
          ? [token(`with a ${event.detail.toLowerCase()}`, "normal")]
          : []),
        token("!", "normal"),
      ];

    case "OWN_GOAL":
      return [
        token(event.player?.name || "Player", "highlight"),
        token("scores an unfortunate own goal for", "normal"),
        token(event.team?.name || "the opposition", "highlight"),
        token(".", "normal"),
      ];

    case "PENALTY_GOAL":
      return [
        token(event.player?.name || "Player", "highlight"),
        token("converts from the penalty spot", "normal"),
        ...(event.detail ? [token(event.detail.toLowerCase(), "normal")] : []),
        token("!", "normal"),
      ];

    case "CARD": {
      const cardType = event.detail?.toLowerCase().includes("red")
        ? "red card"
        : event.detail?.toLowerCase().includes("yellow")
          ? "yellow card"
          : "card";

      return [
        token(event.player?.name || "Player", "highlight"),
        token("receives a", "normal"),
        token(cardType, "highlight"),
        ...(event.detail && !event.detail.toLowerCase().includes("card")
          ? [token(`for ${event.detail.toLowerCase()}`, "normal")]
          : []),
        token(".", "normal"),
      ];
    }

    case "SUBSTITUTION":
      return [
        token(event.related_player?.name || "Player", "highlight"),
        token("comes on for", "normal"),
        token(event.player?.name || "teammate", "highlight"),
        token(".", "normal"),
      ];

    case "PERIOD_START":
      return [token(event.detail || "Match period begins.", "normal")];

    case "PERIOD_END":
      return [token(event.detail || "Match period ends.", "normal")];

    case "VAR":
      return [
        token(
          event.detail
            ? `VAR Review: ${event.detail}`
            : "VAR Review in progress",
          "normal",
        ),
      ];

    case "SYSTEM":
      return [token(event.detail || "System notification", "normal")];

    case "OTHER":
    default:
      return [token(event.detail || "Match update", "normal")];
  }
};

const EventDescription = ({ event }: { event: MatchEventItem }) => {
  const eventDescription = generateEventDescription(event);

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.7 }}
      className="text-xs sm:text-sm text-primary-gray mt-1 font-medium line-clamp-2"
    >
      {eventDescription.map((t, i) => {
        const needsSpace = i !== 0 && !PUNCTUATION.includes(t.text);

        return (
          <span key={i} className={highlightClassMap[t.type]}>
            {needsSpace && " "}
            {t.text}
          </span>
        );
      })}
    </motion.p>
  );
};

export default EventDescription;
