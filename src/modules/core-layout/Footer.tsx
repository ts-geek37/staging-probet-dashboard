import { FileText, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 md:gap-12 mb-6">
          <div className="flex flex-col gap-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/logo.webp"
                alt="ProBetTips Logo"
                width={100}
                height={100}
                className="h-8 w-42 object-contain"
              />
            </Link>
            <p className="text-sm text-white/60 max-w-2xl leading-relaxed">
              <span className="text-primary-green font-medium">ProBetTips</span>{" "}
              an informational football analytics platform. We do not{" "}
              <span className="text-primary-green font-medium">
                promote or facilitate betting or gambling
              </span>
              . All predictions and insights are provided for educational and
              analytical purposes only
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-white/60 hover:text-primary-green transition-colors duration-200"
                  >
                    <link.icon className="h-4 w-4" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t pt-4 border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <p>© {currentYear} ProBetTips All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-primary-green transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
