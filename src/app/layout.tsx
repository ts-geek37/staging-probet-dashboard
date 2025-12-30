import { AppLayout } from "@/modules/core-layout";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ProBets",
  description:
    "Pro Bet is a football-focused web platform delivering live scores, fixtures, match insights, predictions, and football news across global leagues. The platform includes a VIP subscription model to unlock premium prediction content. The system is built using an API-first approach to ensure faster delivery, lower backend complexity, and scalability.",
};

export default function RootLayout({
  children,
}: Readonly<{
    children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
      >
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
