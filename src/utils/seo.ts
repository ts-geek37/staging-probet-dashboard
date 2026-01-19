import type { Metadata } from "next";

export const BASE_METADATA: Metadata = {
  title: {
    default: "ProBetTips",
    template: "%s | ProBetTips",
  },
  description:
    "ProBetTips is a football-focused web platform delivering live scores, fixtures, match insights, predictions, and football news across global leagues. The platform includes a VIP subscription model to unlock premium prediction content. The system is built using an API-first approach to ensure faster delivery, lower backend complexity, and scalability.",
};

type SeoInput = {
  title?: string;
  description?: string;
};

export const seo = ({ title, description }: SeoInput = {}): Metadata => {
  return {
    ...BASE_METADATA,

    title: title ? title : BASE_METADATA.title,

    description: description ?? BASE_METADATA.description,
  };
};
