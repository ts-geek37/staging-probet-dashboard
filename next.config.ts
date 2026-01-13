import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
      {
        protocol: "https",
        hostname: "resources.premierleague.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sportmonks.com",
      },
      {
        protocol: "https",
        hostname: "media.api-sports.io",
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
