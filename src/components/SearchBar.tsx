"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/modules/leagues/hooks";

type Props = {
  delay?: number;
  placeholder?: string;
  onSearchChange: (value: string) => void;
};

const SearchBar: React.FC<Props> = ({
  delay = 500,
  placeholder = "Search...",
  onSearchChange,
}) => {
  const [value, setValue] = useState("");
  const debouncedSearch = useDebounce(value, delay);

  useEffect(() => {
    onSearchChange(debouncedSearch);
  }, [debouncedSearch, onSearchChange]);

  return (
    <div className="flex items-center gap-2">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="pl-9 text-white"
        />
      </div>
    </div>
  );
};

export default SearchBar;
