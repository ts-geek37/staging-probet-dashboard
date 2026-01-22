"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { navlinks } from "../constant";

const HeaderNavClient = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden nav:flex items-center gap-1">
      {navlinks.map((link) => {
        const Icon = link.icon;
        const isActive =
          pathname === link.href || pathname.startsWith(`${link.href}/`);

        return (
          <Link
            key={link.name}
            href={link.href}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-gray-800",
              isActive && "bg-gray-800 text-white",
            )}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm font-medium">{link.name}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default HeaderNavClient;
