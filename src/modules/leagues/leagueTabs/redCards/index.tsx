"use client";

import React from "react";

import { useLeagueRedCards } from "../../hooks";
import StatsTable from "../components/StatsTable";

interface Props {
  id: number;
}

const RedCards: React.FC<Props> = ({ id }) => {
  const { data, tableOrder, hasData, isLoading } = useLeagueRedCards(id);

  return (
    <StatsTable
      data={data}
      tableOrder={tableOrder}
      hasData={!!hasData}
      isLoading={isLoading}
      noDataMessage="No red cards data available"
    />
  );
};

export default RedCards;
