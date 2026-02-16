"use client";

import { ChevronDown, X } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

interface TabItem<T> {
  label: string;
  value: T;
}

interface TabNavigationProps<T> {
  activeTab: T;
  tabs: TabItem<T>[];
  onTabChange: (value: T) => void;
}

const TabNavigation = <T extends string | number>({
  activeTab,
  tabs,
  onTabChange,
}: TabNavigationProps<T>) => {
  const [open, setOpen] = React.useState(false);
  const shouldUseSheet = tabs.length > 5;
  const activeTabItem = tabs.find((tab) => tab.value === activeTab);

  const handleTabChange = (value: T) => {
    onTabChange(value);
    setOpen(false);
  };
if (!shouldUseSheet) {
  return (
    <div className="flex w-full gap-1 sm:gap-2 border-b border-primary-gray/20">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;
        return (
          <Button
            key={tab.value}
            className={cn(
              "relative flex-1 sm:flex-none bg-transparent px-1 py-2 text-xs transition-all sm:px-4 sm:text-sm capitalize text-center sm:text-left",
              isActive
                ? "text-primary-green"
                : "text-muted-foreground"
            )}
            onClick={() => onTabChange(tab.value)}
          >
            {tab.label}
            {isActive && (
              <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary-green" />
            )}
          </Button>
        );
      })}
    </div>
  );
}
  return (
    <>
      <div className="md:hidden border-b border-primary-gray/20 text-white">
        <Sheet
          open={open}
          onOpenChange={setOpen}
          closeOnBreakpoint="(min-width: 768px)"
        >
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between px-4 py-2 sm:text-sm capitalize hover:bg-transparent"
            >
              <span className="text-primary-green font-medium">
                {activeTabItem?.label}
              </span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="bottom"
            className="h-auto max-h-[80vh] border-primary-green border p-4 pt-0 gap-0"
          >
            <SheetHeader className="flex-row justify-between items-center">
              <SheetTitle className="text-primary-green text-lg">
                Select Tab
              </SheetTitle>
              <SheetDescription className="sr-only">
                Change the active view by selecting a tab from the list below.
              </SheetDescription>
              <SheetClose asChild>
                <Button variant="ghost" size="icon" aria-label="Close">
                  <X className="size-5 text-white" />
                </Button>
              </SheetClose>
            </SheetHeader>
            <div className="overflow-y-auto grid gap-2 max-h-[60vh]">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.value;
                return (
                  <Button
                    key={tab.value}
                    variant={isActive ? "green" : "default"}
                    size="lg"
                    className={cn("w-full capitalize justify-baseline")}
                    onClick={() => handleTabChange(tab.value)}
                  >
                    {tab.label}
                  </Button>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:flex gap-1 sm:gap-2 border-b border-primary-gray/20">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.value;
          return (
            <Button
              key={tab.value}
              className={cn(
                "relative bg-transparent px-1 py-2 text-xs transition-all sm:px-4 sm:text-sm capitalize",
                isActive ? "text-primary-green" : "text-muted-foreground",
              )}
              onClick={() => onTabChange(tab.value)}
            >
              {tab.label}
              {isActive && (
                <span className="absolute -bottom-px left-1/2 h-0.5 w-full -translate-x-1/2 bg-primary-green" />
              )}
            </Button>
          );
        })}
      </div>
    </>
  );
};

export default TabNavigation;
