"use client";

import React from "react";

interface DetailRowProps {
  label: string;
  value: string | number | null | React.ReactNode;
  icon?: React.ElementType;
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value, icon: Icon }) => (
  <div className="flex justify-between items-center pb-4 border-b border-primary-gray/20 last:border-0 group">
    <span className="text-xs sm:text-sm text-primary-gray flex items-center gap-3">
      {Icon && <Icon size={16} className="opacity-40" />}
      {label}
    </span>
    <div className="text-sm font-bold text-white/90">{value || "—"}</div>
  </div>
);

export default DetailRow;
