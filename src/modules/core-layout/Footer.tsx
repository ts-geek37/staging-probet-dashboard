import { FileText, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { FooterLinksGroup } from "./components";

const FOOTER_LINKS = [
  { href: "/about", label: "About", icon: FileText },
  { href: "/contact", label: "Contact", icon: Mail },
];

const QUICK_LINKS = [
  { href: "/predictions", label: "Predictions" },
  { href: "/leagues", label: "Leagues" },
  { href: "/statistics", label: "Statistics" },
];

const LEGAL_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/advertising-policy", label: "Advertising Policy" },
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-primary-bg border-t-2 border-white/10">
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6 md:py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-[4fr_1fr_1fr] gap-6 gap-x-0 md:gap-x-4 mb-6">
          <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/logo.webp"
                alt="ProBetPredictions Logo"
                width={500}
                height={100}
                className="h-9 w-60 object-contain"
              />
            </Link>
            <p className="text-sm text-primary-gray max-w-2xl leading-relaxed">
              <span className="text-primary-green font-medium">
                ProBetPredictions
              </span>{" "}
              an informational football analytics platform. We do not{" "}
              <span className="text-primary-green font-medium">
                promote or facilitate betting or gambling
              </span>
              . All predictions and insights are provided for educational and
              analytical purposes only
            </p>
          </div>

          <FooterLinksGroup title="Resources" links={FOOTER_LINKS} />
          <FooterLinksGroup title="Legal" links={LEGAL_LINKS} />
        </div>

        <div className="border-t pt-4 border-white/10 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-white/50">
          <p>© {currentYear} ProBetPredictions All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
