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

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-primary-bg border-t border-white/10">
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12 mb-12">
          <div className="flex flex-col gap-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/logo.webp"
                alt="Pro Bet Logo"
                width={100}
                height={100}
                className="h-6 w-32 object-contain"
              />
            </Link>
            <p className="text-sm text-white/60 max-w-2xl leading-relaxed">
              <span className="text-primary-green font-medium">Pro Bet</span> is
              an informational football analytics platform. We do not{" "}
              <span className="text-primary-green font-medium">
                promote or facilitate betting or gambling
              </span>
              . All predictions and insights are provided for educational and
              analytical purposes only
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
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

        <div className="border-t pt-4 border-white/10 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-white/50">
          <p>© {currentYear} ProBet All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
