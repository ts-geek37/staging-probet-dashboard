"use client";

import React from "react";
import { Circle } from "lucide-react";

import { useLeagueYellowCards } from "../../hooks";
import StatsTable from "../components/StatsTable";

interface Props {
  id: number;
}

const YellowCards: React.FC<Props> = ({ id }) => {
  const { data, tableOrder, hasData, isLoading } = useLeagueYellowCards(id);

  return (
    <StatsTable
      data={data}
      tableOrder={tableOrder}
      hasData={!!hasData}
      isLoading={isLoading}
      noDataMessage="No yellow cards data available"
      tableTitles={{
        yellowcards: {
          // match the actual table key
          title: "Yellow Cards",
          icon: (
            <div className="w-3 h-4 ml-1 bg-yellow-500" />
          ),
        },
      }}
    />
  );
};

export default YellowCards;
