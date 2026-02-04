"use client";

import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Trophy,
} from "lucide-react";
import React, { useRef } from "react";

interface NewsHeaderProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const NewsHeader: React.FC<NewsHeaderProps> = ({
  selectedDate,
  onDateChange,
}) => {
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleAdjustDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    onDateChange(newDate);
  };

  const formatDisplayDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const openCalendar = () => {
    dateInputRef.current?.showPicker();
  };

  return (
    <div className="flex flex-row items-center justify-between border-b border-primary-gray/20 pb-6 gap-2">
      <div className="flex items-center gap-3 md:gap-4">
        <div className="bg-primary-green p-2 md:p-2.5 rounded-xl shadow-lg shadow-primary-green/20 shrink-0">
          <Trophy className="text-white" size={24} />
        </div>
        <div>
          <h2 className="text-lg sm:text-3xl font-black tracking-tight text-white uppercase leading-none">
            Football <span className="text-primary-green">News</span>
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-green animate-pulse" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-gray">
              Football Insights
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center shrink-0">
        <div className="flex items-center bg-card border border-primary-gray/20 rounded-full p-1 shadow-2xl">
          <button
            onClick={() => handleAdjustDate(-1)}
            className="hidden md:block p-2 text-gray-400 hover:text-white"
          >
            <ChevronLeft size={18} />
          </button>

          <div
            onClick={openCalendar}
            className="relative flex items-center px-2 md:px-3 gap-2 cursor-pointer select-none"
          >
            <CalendarIcon size={18} className="text-primary-green" />
            <span className="hidden md:block text-sm font-bold text-white whitespace-nowrap">
              {formatDisplayDate(selectedDate)}
            </span>

            <input
              ref={dateInputRef}
              type="date"
              className="absolute inset-0 opacity-0 pointer-events-none"
              value={selectedDate.toISOString().split("T")[0]}
              onChange={(e) => onDateChange(new Date(e.target.value))}
            />
          </div>

          <button
            onClick={() => handleAdjustDate(1)}
            className="hidden md:block p-2 text-primary-gray hover:text-white transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsHeader;
