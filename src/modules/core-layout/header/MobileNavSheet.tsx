import { useUser } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import AppUserButton from "@/components/AppUserButton";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
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
  const [open, setOpen] = useState<boolean>(false);
  const { user } = useUser();

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
      closeOnBreakpoint="(min-width: 1100px)"
    >
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          className={cn("text-primary-gray", triggerClassName)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent
        key={
          typeof window !== "undefined"
            ? String(window.innerWidth < 640)
            : "default"
        }
        side="right"
        className="border-primary-gray/20 w-75 sm:w-87.5 p-4"
      >
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <SheetDescription className="sr-only">
          Access site links and user platform settings.
        </SheetDescription>
        <SheetClose asChild className="absolute top-2 right-5">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Close"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
          >
            <X className="w-5 h-5 text-white" />
          </Button>
        </SheetClose>

        <nav className="flex flex-col gap-4 ">
          {user && (
            <div
              className="sm:hidden px-2"
              onClick={(e) => {
                e.stopPropagation();
              }}
              style={{ isolation: "isolate", pointerEvents: "auto" }}
            >
              <AppUserButton />
            </div>
          )}
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                }}
                className={cn(
                  "flex items-center gap-3 py-2 rounded-lg transition-colors",
                  "text-gray-300 hover:text-white hover:bg-gray-800",
                  link.isActive && "bg-gray-800 text-white",
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-base font-medium">{link.name}</span>
              </Link>
            );
          })}

          {!!vipLink && (
            <div className="sm:hidden">
              <VipSection onNavigate={() => setOpen(false)} />
            </div>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavSheet;
