"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { NavLink } from "@/modules/core-layout/constant";

import VipSection from "./VipSection";

type Props = {
  links: NavLink[];
  vipLink?: NavLink;
  triggerClassName?: string;
};

const MobileNavSheet: React.FC<Props> = ({
  links,
  vipLink,
  triggerClassName,
}) => {
  const [open, setOpen] = useState(false);

    useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");

    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setOpen(false);
      }
    };

    media.addEventListener("change", handleChange);

    if (media.matches) {
      setOpen(false);
    }

    return () => {
      media.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          className={cn("text-gray-300", triggerClassName)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="border-gray-800 w-[300px] sm:w-[350px] p-4"
      >
        <SheetClose asChild className="absolute top-0 right-5">
          <Button variant="ghost" size="icon" aria-label="Close">
            <X className="w-5 h-5 text-white" />
          </Button>
        </SheetClose>

        <nav className="flex flex-col gap-4 mt-8">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  "text-gray-300 hover:text-white hover:bg-gray-800",
                  link.isActive && "bg-gray-800 text-white",
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-base font-medium">{link.name}</span>
              </Link>
            );
          })}

          {!!vipLink && <VipSection onNavigate={() => setOpen(false)} />}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavSheet;
