"use client";

import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/modules/leagues/hooks";

import { Button } from "./ui/button";

type Props = {
  value?: string;
  delay?: number;
  placeholder?: string;
  onSearchChange: (value: string) => void;
  isMobileAbsolute?: boolean;
};

const SearchBar: React.FC<Props> = ({
  value = "",
  delay = 300,
  placeholder = "Search...",
  onSearchChange,
  isMobileAbsolute = false,
}) => {
  const [searchValue, setSearchValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);

  const debouncedValue = useDebounce(searchValue, delay);

  useEffect(() => {
    setSearchValue(value);
  }, [value]);

  useEffect(() => {
    onSearchChange(debouncedValue);
  }, [debouncedValue, onSearchChange]);

  return (
    <div className="relative flex items-center gap-2">
      <div
        className={cn(
          "relative w-full",
          isMobileAbsolute ? "hidden sm:block" : "block",
        )}
      >
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={placeholder}
          className="pl-9 text-white text-sm"
        />
      </div>

      {isMobileAbsolute && (
        <Button
          onClick={() => setIsOpen((prev) => !prev)}
          className="sm:hidden p-2 rounded-md bg-[#1e293b] border border-[#334155] text-white"
        >
          <Search className="h-4 w-4" />
        </Button>
      )}

      {isMobileAbsolute && isOpen && (
        <div className="sm:hidden absolute top-10 right-0 w-64 h-16 z-50 bg-transparent backdrop-blur-2xl px-4 flex items-center animate-in slide-in-from-top duration-200">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              autoFocus
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={placeholder}
              className="pl-9 pr-10 text-white text-sm w-full h-10"
            />
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-800 text-muted-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
