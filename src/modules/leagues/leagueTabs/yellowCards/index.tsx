"use client";

import React from "react";

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
    />
  );
};

export default YellowCards;
