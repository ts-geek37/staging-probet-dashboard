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
  value: string | number;
  label: string;
}

interface SelectProps {
  value?: string | number;
  placeholder?: string;
  options: SelectOption[];
  onChange: (value: string | number) => void;
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
    <Select value={value?.toString()} onValueChange={onChange}>
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
              value={option.value.toString()}
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
