"use client";

import { Check, ChevronDown, LayoutGrid, Search } from "lucide-react";
import Image from "next/image";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export type League = {
  id: number;
  name: string;
  logo: string;
};

interface Props {
  leagues: League[];
  isLoading: boolean;
  selectedLeague: League | null;
  leagueSearch: string;
  onLeagueSearchChange: (value: string) => void;
  onSelectLeague: (league: League | null) => void;
}

const LeagueSelectDropdown: React.FC<Props> = ({
  leagues,
  isLoading,
  selectedLeague,
  leagueSearch,
  onLeagueSearchChange,
  onSelectLeague,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(
            "w-full md:w-72 justify-between",
            "bg-primary-green/80 border-primary-gray/20 text-white",
            "hover:bg-primary-green transition-all",
          )}
        >
          <div className="flex items-center gap-2 min-w-0">
            <div className="relative w-5 h-5 shrink-0">
              {selectedLeague ? (
                <Image
                  src={selectedLeague.logo}
                  alt={selectedLeague.name}
                  fill
                  className="object-contain rounded-sm"
                />
              ) : (
                <LayoutGrid className="w-5 h-5" />
              )}
            </div>

            <span className="truncate text-sm md:text-base">
              {selectedLeague?.name ?? "All Leagues"}
            </span>
          </div>

          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className={cn(
          "w-(--radix-popper-anchor-width) md:w-72",
          "bg-zinc-900/95 backdrop-blur-md",
          "border-primary-gray/20 text-zinc-100 shadow-2xl p-1",
        )}
      >
        <div className="flex items-center px-3 py-2 gap-2 bg-zinc-900 rounded-md m-1 mb-2 border border-primary-gray/20">
          <Search className="w-4 h-4 text-primary-gray shrink-0" />
          <input
            value={leagueSearch}
            onChange={(e) => onLeagueSearchChange(e.target.value)}
            placeholder="Search league..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-primary-gray"
          />
        </div>

        <DropdownMenuSeparator className="bg-zinc-800" />

        <div className="max-h-56 md:max-h-72 overflow-y-auto custom-scrollbar p-1">
          {!leagueSearch && !isLoading && (
            <>
              <DropdownMenuItem
                onClick={() => onSelectLeague(null)}
                className={cn(
                  "flex items-center justify-between gap-3 px-3 py-2 rounded-sm cursor-pointer",
                  "hover:bg-primary-green/20 focus:bg-primary-green/20",
                  selectedLeague === null && "bg-zinc-800",
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-zinc-800 rounded-md">
                    <LayoutGrid className="w-4 h-4 text-primary-green" />
                  </div>
                  <span className="text-sm font-medium">All Leagues</span>
                </div>

                {selectedLeague === null && (
                  <Check className="w-4 h-4 text-primary-green" />
                )}
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-zinc-800/50 my-1" />
            </>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center py-6">
              <div className="h-5 w-5 border-2 border-primary-green border-t-transparent animate-spin rounded-full" />
            </div>
          ) : leagues.length > 0 ? (
            leagues.map((league) => (
              <DropdownMenuItem
                key={league.id}
                onClick={() => onSelectLeague(league)}
                className={cn(
                  "flex items-center justify-between gap-3 px-3 py-2 rounded-sm cursor-pointer",
                  "hover:bg-primary-green/20 focus:bg-primary-green/20",
                  selectedLeague?.id === league.id && "bg-zinc-800",
                )}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative size-8 bg-white rounded-md p-1 shrink-0">
                    <Image
                      src={league.logo ?? "/no-image.png"}
                      alt={league.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="truncate text-sm font-medium">
                    {league.name}
                  </span>
                </div>

                {selectedLeague?.id === league.id && (
                  <Check className="w-4 h-4 text-primary-green" />
                )}
              </DropdownMenuItem>
            ))
          ) : (
            <div className="px-3 py-8 text-center text-sm text-primary-gray">
              No leagues found
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LeagueSelectDropdown;
