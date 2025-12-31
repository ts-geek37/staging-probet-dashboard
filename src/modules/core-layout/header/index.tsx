"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

import { cn } from "@/lib/utils";
import VipSection from "@/modules/core-layout/header/VipSection";

import { navlinks, vipLink } from "../constant";
import MobileNavSheet from "./MobileNavSheet";

const Header: React.FC = () => {
  const pathname = usePathname();
  const links = useMemo(() => {
    return navlinks.map((link) => {
      return {
        ...link,
        isActive: pathname === link.href,
      };
    });
  }, [pathname]);

  return (
    <header className="relative">
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-gray-800 via-45% via-primary-green to-75% to-gray-800" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-16">
        <Link href="/">
          <Image
            src="/logo.webp"
            alt="ProBet logo"
            width={1000}
            height={40}
            className="h-6 w-auto"
          />
        </Link>

        <nav className="hidden nav:flex items-center gap-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-gray-800",
                  link.isActive && "bg-gray-800 text-white",
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden sm:flex items-center gap-4">
          <VipSection />
          <div className="sm:max-nav:block hidden">
            <MobileNavSheet links={links} />
          </div>
        </div>
        <div className="max-sm:block hidden">
          <MobileNavSheet links={links} vipLink={vipLink} />
        </div>
      </div>
    </header>
  );
};

export default Header;
