import {
  ArrowUpRight,
  Globe,
  Handshake,
  HelpCircle,
  Info,
  Mail,
  MessageSquare,
  Monitor,
  Zap,
} from "lucide-react";

export const CONTACT_METHODS = [
  {
    id: "support-email",
    value: "support@probet.com",
    description: "GET DIRECT SUPPORT",
    href: "mailto:support@probet.com",
    icon: Mail,
  },
  {
    id: "website",
    value: "www.probet.com",
    description: "VISIT OUR PLATFORM",
    href: "https://www.probet.com",
    icon: Globe,
  },
];

export const INQUIRY_CATEGORIES = [
  {
    id: "platform",
    label: "Platform support",
    icon: Monitor,
    description: "Technical issues, bugs, or feature not working as expected",
    color: "from-blue-500/20 to-blue-600/10",
    iconColor: "group-hover:text-blue-500",
    bgColor: "group-hover:bg-blue-50",
  },
  {
    id: "features",
    label: "Feature requests",
    icon: Zap,
    description:
      "Suggest new features or improvements to enhance your experience",
    color: "from-yellow-500/20 to-yellow-600/10",
    iconColor: "group-hover:text-yellow-500",
    bgColor: "group-hover:bg-yellow-50",
  },
  {
    id: "data",
    label: "Data or content inquiries",
    icon: Info,
    description:
      "Questions about data accuracy, sources, or content corrections",
    color: "from-cyan-500/20 to-cyan-600/10",
    iconColor: "group-hover:text-cyan-500",
    bgColor: "group-hover:bg-cyan-50",
  },
  {
    id: "partnerships",
    label: "Partnership opportunities",
    icon: Handshake,
    description:
      "Business partnerships, integrations, or collaboration proposals",
    color: "from-purple-500/20 to-purple-600/10",
    iconColor: "group-hover:text-purple-500",
    bgColor: "group-hover:bg-purple-50",
  },
  {
    id: "feedback",
    label: "General feedback",
    icon: MessageSquare,
    description:
      "Share your thoughts, opinions, and general feedback about ProBet",
    color: "from-orange-500/20 to-orange-600/10",
    iconColor: "group-hover:text-orange-500",
    bgColor: "group-hover:bg-orange-50",
  },
];
