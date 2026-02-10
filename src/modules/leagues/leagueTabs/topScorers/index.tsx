"use client";

import React from "react";
import { Trophy } from "lucide-react"; // Trophy icon

import { useLeagueTopScorers } from "../../hooks";
import StatsTable from "../components/StatsTable";

interface Props {
  id: number;
}

const TopScorers: React.FC<Props> = ({ id }) => {
  const { data, tableOrder, hasData, isLoading } = useLeagueTopScorers(id);

  return (
    <StatsTable
      data={data}
      tableOrder={tableOrder}
      hasData={!!hasData}
      isLoading={isLoading}
      noDataMessage="No top scorers data available"
      tableTitles={{
        "goal-topscorer": {
          title: "Top Scorer",
          icon: <Trophy size={18} className="text-primary-green ml-1" />,
        },
      }}
    />
  );
};

export default TopScorers;
