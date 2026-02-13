import {
  BarChart3,
  BookOpen,
  Globe,
  Handshake,
  Info,
  Mail,
  MessageSquare,
  Monitor,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  Users,
  Eye,
  Newspaper,
  Brain,
  Crown,
  Scale,
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
export const philosophyItems = [
  {
    title: "Clarity",
    description:
      "Football data should be structured, readable, and accessible.",
    icon: Eye,
  },
  {
    title: "Responsibility",
    description:
      "We do not promote betting. Our platform exists for analysis and education.",
    icon: ShieldCheck,
  },
  {
    title: "Integrity",
    description:
      "Predictions are based on data trends and performance indicators, not hype or speculation.Football remains unpredictable. Our role is to provide insight, not certainty",
    icon: Scale,
  },
];

export const AboutFeatures = [
  {
    label: "Live Scores and Match Updates",
    icon: Zap,
    description:
      "Stay connected with real-time match progress from leagues across the world. Whether it is ongoing games, upcoming fixtures, or recently completed matches, our platform keeps you informed clearly and efficiently",
  },
  {
    label: "Teams and Players",
    icon: Users,
    description:
      " Dive deeper into individual clubs and players We provide structured team profiles, squad listings, and performance snapshots that help users understand how teams and players are evolving throughout the season.",
  },
  {
    label: "Football News",
    icon: Newspaper,
    description:
      "Stay updated with curated football news from across global competitions.We provide relevant stories and updates to keep you informed about developments, transfers,and major football moments.",
  },
  {
    label: "Global League Coverage",
    icon: Globe,
    description:
      "Explore major football competitions with access to:• League standings• Team rankings• Performance trends• Season statisticsEach league page is designed to give you a structured overview without unnecessary complexity",
  },
  {
    label: "Match Insights and Analysis",
    icon: BarChart3,
    description:
      "Every match page provides a focused view of team performance and comparative insights.Users can review past form, head to head history, scoring patterns, and overall match trends to gain a broader understanding of the game. Our goal is to present insights clearly, not overwhelm you with technical noise.",
  },
  {
    label: "Informational Predictions",
    icon: Brain,
    description:
      "ProBetPredictions provides data-driven match predictions designed to offer perspective.These include:• Outcome probability guidance• Performance-based indicators• Confidence ratings• Trend insightsPredictions are informational only. They do not represent guarantees, promises, or betting advice",
  },
  {
    label: "VIP Membership",
    icon: Crown,
    description:
      "For users who want deeper analytical access, we offer a VIP membership option. VIP members unlock extended match insights and full prediction access across coveredleagues. Subscription plans are flexible, allowing users to choose monthly or longer-termaccess.Our premium offering enhances insight depth without promoting gambling or betting services.",
  },
];
