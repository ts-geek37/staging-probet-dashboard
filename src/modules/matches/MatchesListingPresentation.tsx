"use client";

import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

import { SearchBar } from "@/components";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MatchListStatus } from "@/types/matches";

import MatchStatusTabs from "./tabs/MatchStatusTabs";

const MatchesListingPresentation: React.FC = () => {
  const [status, setStatus] = useState<MatchListStatus>(MatchListStatus.LIVE);
  const [search, setSearch] = useState("");

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const statusOptions: { label: string; value: MatchListStatus }[] = [
    { label: "Live", value: MatchListStatus.LIVE },
    { label: "Upcoming", value: MatchListStatus.UPCOMING },
    { label: "Finished", value: MatchListStatus.FINISHED },
  ];

  const currentLabel =
    statusOptions.find((s) => s.value === status)?.label ?? "Live";

  return (
    <section className="pb-10 md:pb-20 text-white space-y-10">
      <Image
        src="/adsBg.jpg"
        alt="Promotion Banner"
        width={1920}
        height={360}
        className="w-full h-20 object-cover"
        priority
      />
      <div className="max-w-7xl mx-auto px-4 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-5xl font-bold">Match Center</h1>
            <p className="text-sm sm:text-base text-white">
              Live scores and upcoming fixtures
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full">
          <div className="flex-1">
            <SearchBar
              value={search}
              onSearchChange={handleSearchChange}
              placeholder="Search teams or leagues"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-primary-green flex items-center gap-2 text-white">
                {currentLabel}
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="bg-primary-gray/20 text-white w-40"
            >
              {statusOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setStatus(option.value)}
                  className="cursor-pointer hover:bg-primary-green border-b border-primary-gray/20"
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <MatchStatusTabs
          activeStatus={status}
          onChange={setStatus}
          search={search}
        />
      </div>
    </section>
  );
};
export default MatchesListingPresentation;
