"use client";

import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value?: string;
  placeholder?: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  className?: string;
}

const SelectField: React.FC<SelectProps> = ({
  value,
  placeholder,
  options,
  onChange,
  className,
}) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        iconClassName="text-white"
        className={`w-52 bg-primary-green/80 border-primary-green text-white ${className ?? ""}`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent className="bg-slate-800 border-slate-700">
        <div className="max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-primary-green scrollbar-track-slate-700">
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="text-white hover:text-primary-green focus:bg-slate-700 focus:text-white"
            >
              {option.label}
            </SelectItem>
          ))}
        </div>
      </SelectContent>
    </Select>
  );
};

export default SelectField;
