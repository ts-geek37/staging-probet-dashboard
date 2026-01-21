import {
  CalendarDays,
  Crown,
  Home,
  LucideIcon,
  Newspaper,
  TrendingUp,
  Trophy,
} from "lucide-react";

export type NavLink = {
  name: string;
  href: string;
  icon: LucideIcon;
  isActive?: boolean;
};

export const navlinks: NavLink[] = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Leagues",
    href: "/leagues",
    icon: Trophy,
  },
  {
    name: "Matches",
    href: "/matches",
    icon: CalendarDays,
  },
  {
    name: "Predictions",
    href: "/prediction",
    icon: TrendingUp,
  },
  {
    name: "News",
    href: "/news",
    icon: Newspaper,
  },
];

export const vipLink = {
  name: "VIP",
  href: "/pricing",
  icon: Crown,
};
