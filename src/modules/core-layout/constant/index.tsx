import {
  CalendarDays,
  Crown,
  Facebook,
  FileText,
  Home,
  Instagram,
  LucideIcon,
  Mail,
  Newspaper,
  Send,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { FaTiktok } from "react-icons/fa";

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

export const FOOTER_LINKS = [
  { href: "/about", label: "About", icon: FileText },
  { href: "/contact", label: "Contact", icon: Mail },
];

export const LEGAL_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/advertising-policy", label: "Advertising Policy" },
];

export const SOCIAL_LINKS = [
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://www.facebook.com/",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/",
  },
  {
    name: "Telegram",
    icon: Send,
    url: "https://t.me/",
  },
  {
    name: "TikTok",
    icon: FaTiktok,
    url: "https://www.tiktok.com/",
  },
];
