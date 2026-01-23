import {
  Clock,
  LucideIcon,
  Repeat,
  ShieldAlert,
  Square,
  Trophy,
} from "lucide-react";

import { MatchDetailView, MatchStatus } from "@/types/matches";

type TabConfig = {
  label: string;
  value: MatchDetailView;
  hideWhen?: MatchStatus[];
};

export const TAB_CONFIG: readonly TabConfig[] = [
  { label: "Overview", value: MatchDetailView.OVERVIEW },

  {
    label: "Match Stats",
    value: MatchDetailView.STATS,
    hideWhen: ["UPCOMING"],
  },
  {
    label: "Lineups",
    value: MatchDetailView.LINEUPS,
    hideWhen: ["UPCOMING"],
  },
  {
    label: "Events",
    value: MatchDetailView.EVENTS,
    hideWhen: ["UPCOMING"],
  },

  { label: "H2H", value: MatchDetailView.HEAD_TO_HEAD },

  {
    label: "Comments",
    value: MatchDetailView.COMMENTS,
    hideWhen: ["UPCOMING"],
  },

  { label: "Season Stats", value: MatchDetailView.SEASON_STATS },
  {
    label: "Prediction",
    value: MatchDetailView.PREDICTION,
    hideWhen: ["LIVE"],
  },
];

export const EVENT_CONFIG: Record<
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
