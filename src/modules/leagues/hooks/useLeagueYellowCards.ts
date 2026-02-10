"use client";

import useSWR from "swr";

import { ApiResponse } from "@/api/types";
import { LeagueView, TopScorersResponse } from "@/types/leagues";

const useLeagueYellowCards = (leagueId: number) => {
  const response = useSWR<ApiResponse<TopScorersResponse>>(
    `/api/v2/leagues/${leagueId}/${LeagueView.YELLOW_CARDS}`,
  );
  const data = response.data?.data;

  const hasData = data && data.tables && Object.keys(data.tables).length > 0;

  const tableOrder = hasData
    ? data.schema?.order || Object.keys(data.tables)
    : [];
  const validTables = tableOrder.filter((tableKey) => {
    const tableData = data?.tables[tableKey];
    return tableData && tableData.rows && tableData.rows.length > 0;
  });

  return {
    data: response.data?.data,
    tableOrder: validTables,
    hasData: hasData && validTables.length > 0,
    isLoading: !response.data && !response.error,
    error: response.error,
  };
};

export default useLeagueYellowCards;
