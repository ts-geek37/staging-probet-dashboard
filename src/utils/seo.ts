import type { Metadata } from "next";

export const BASE_METADATA: Metadata = {
  title: {
    default: "ProBetPredictions",
    template: "%s | ProBetPredictions",
  },
  description:
    "ProBetPredictions is a football-focused web platform delivering live scores, fixtures, match insights, predictions, and football news across global leagues. The platform includes a VIP subscription model to unlock premium prediction content. The system is built using an API-first approach to ensure faster delivery, lower backend complexity, and scalability.",
  openGraph: {
    type: "website",
    siteName: "ProBetPredictions",
    images: [
      {
        url: "/company-og-image.webp",
        width: 1200,
        height: 630,
        alt: "ProBetPredictions – Football Predictions & Insights",
      },
    ],
  },
};

type SeoInput = {
  title?: string;
  description?: string;
};

const normalizeOgImages = (
  images: NonNullable<Metadata["openGraph"]>["images"],
  baseUrl: string,
): NonNullable<Metadata["openGraph"]>["images"] => {
  if (!images) return [];

  const list = Array.isArray(images) ? images : [images];

  return list.map((img) => {
    if (typeof img === "string") {
      return img.startsWith("http") ? img : `${baseUrl}${img}`;
    }

    if (img instanceof URL) {
      return img;
    }

    const url =
      typeof img.url === "string"
        ? img.url.startsWith("http")
          ? img.url
          : `${baseUrl}${img.url}`
        : img.url;

    return {
      ...img,
      url,
    };
  });
};

export const seo = ({ title, description }: SeoInput = {}): Metadata => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return {
    ...BASE_METADATA,
    title: title ?? BASE_METADATA.title,
    description: description ?? BASE_METADATA.description,
    openGraph: {
      ...BASE_METADATA.openGraph,
      images: normalizeOgImages(BASE_METADATA.openGraph?.images, baseUrl),
    },
  };
};
