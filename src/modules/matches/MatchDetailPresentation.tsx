"use client";

import React from "react";

import { MatchListItem } from "@/types/matches";

import { MatchHeader } from "./details";
import { MatchDetailTabs } from "./details/tabs";

interface Props {
  initialData: MatchListItem;
}

const MatchDetailPresentation: React.FC<Props> = ({ initialData }) => {
  return (
    <div className="max-w-7xl mx-auto w-full px-4 py-6 grid gap-6 text-white">
      <MatchHeader match={initialData} />

      <MatchDetailTabs match={initialData} />
    </div>
  );
};

export default MatchDetailPresentation;
