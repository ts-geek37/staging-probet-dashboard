"use client";

import React, { useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Trophy,
} from "lucide-react";

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
    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-white/10 pb-6">
      {/* Left */}
      <div className="flex items-center gap-4">
        <div className="bg-blue-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/20">
          <Trophy className="text-white" size={28} />
        </div>
        <div>
          <h2 className="text-3xl font-black tracking-tight text-white uppercase sm:text-4xl leading-none">
            Football <span className="text-blue-500">News</span>
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
              Live Headlines
            </p>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center">
        <div className="flex items-center bg-[#0f172a] border border-white/10 rounded-full p-1 shadow-2xl">
          <button
            onClick={() => handleAdjustDate(-1)}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Click anywhere → open calendar */}
          <div
            onClick={openCalendar}
            className="relative flex items-center px-3 gap-2 cursor-pointer select-none"
          >
            <CalendarIcon size={16} className="text-blue-500" />
            <span className="text-sm font-bold text-gray-200 whitespace-nowrap">
              {formatDisplayDate(selectedDate)}
            </span>

            <input
              ref={dateInputRef}
              type="date"
              className="absolute inset-0 opacity-0 pointer-events-none"
              value={selectedDate.toISOString().split("T")[0]}
              onChange={(e) =>
                onDateChange(new Date(e.target.value))
              }
            />
          </div>

          <button
            onClick={() => handleAdjustDate(1)}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsHeader;
