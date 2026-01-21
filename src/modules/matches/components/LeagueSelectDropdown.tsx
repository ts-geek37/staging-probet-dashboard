"use client";

import { Check, ChevronDown, LayoutGrid, Search } from "lucide-react"; // Added LayoutGrid for 'All' icon
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
  selectedLeagueId: number | null;
  leagueSearch: string;
  onLeagueSearchChange: (value: string) => void;
  onSelectLeague: (leagueId: number | null) => void;
}
const ALL_LEAGUES_ID = -1;
const LeagueSelectDropdown: React.FC<Props> = ({
  leagues,
  isLoading,
  selectedLeagueId,
  leagueSearch,
  onLeagueSearchChange,
  onSelectLeague,
}) => {
  const ALL_LEAGUES_OPTION: League = {
    id: ALL_LEAGUES_ID,
    name: "All Leagues",
    logo: "",
  };

  const selectedLeague = leagues.find(
    (league) => league.id === selectedLeagueId,
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full md:w-72 justify-between",
            "bg-primary-green/80 border-primary-gray/20 text-white",
            "hover:bg-primary-green transition-all",
          )}
        >
          <div className="flex items-center gap-2 min-w-0">
            {selectedLeague ? (
              <>
                <div className="relative w-5 h-5 shrink-0">
                  {selectedLeague.id === ALL_LEAGUES_ID ? (
                    <LayoutGrid className="w-5 h-5" />
                  ) : (
                    <Image
                      src={selectedLeague.logo}
                      alt={selectedLeague.name}
                      fill
                      className="object-contain rounded-sm"
                    />
                  )}
                </div>
                <span className="truncate text-sm md:text-base">
                  {selectedLeague.name}
                </span>
              </>
            ) : (
              <span className="text-white text-sm md:text-base">
                Select League
              </span>
            )}
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

        <DropdownMenuSeparator className="bg-zinc-870" />

        <div className="max-h-56 sm:max-h-64 md:max-h-72 overflow-y-auto custom-scrollbar p-1">
          {!leagueSearch && !isLoading && (
            <>
              <DropdownMenuItem
                onClick={() => onSelectLeague(ALL_LEAGUES_OPTION.id)}
                className={cn(
                  "flex items-center justify-between gap-3",
                  "px-3 py-2 cursor-pointer rounded-sm outline-none transition-colors",
                  "focus:bg-primary-green/20 focus:text-white",
                  "hover:bg-primary-green/20",
                  selectedLeague?.id === ALL_LEAGUES_ID && "bg-zinc-800",
                )}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 shrink-0 bg-zinc-800 rounded-md">
                    <LayoutGrid className="w-4 h-4 text-primary-green" />
                  </div>
                  <span className="text-sm font-medium">All Leagues</span>
                </div>
                {selectedLeague?.id === ALL_LEAGUES_ID && (
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
                onClick={() => onSelectLeague(league?.id)}
                className={cn(
                  "flex items-center justify-between gap-3",
                  "px-3 py-2 cursor-pointer rounded-sm outline-none",
                  "transition-colors",
                  "focus:bg-primary-green/20 focus:text-white",
                  "hover:bg-primary-green/20",
                  selectedLeague?.id === league.id && "bg-zinc-800",
                )}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-7 h-7 md:w-8 md:h-8 shrink-0 p-1">
                    <Image
                      src={league?.logo ?? "/no-image.png"}
                      alt={league.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <span className="text-sm font-medium truncate">
                    {league.name}
                  </span>
                </div>

                {selectedLeague?.id === league.id && (
                  <Check className="w-4 h-4 text-primary-green" />
                )}
              </DropdownMenuItem>
            ))
          ) : (
            <div className="px-3 py-8 text-center">
              <p className="text-sm text-primary-gray">No leagues found</p>
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LeagueSelectDropdown;
