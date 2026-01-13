"use client";

import React from "react";

import { NoData, SkeletonCardLoader } from "@/components";

import TeamTransfersTable from "../components/TeamTransfersTable";
import { useTeamTransfers } from "../hooks";

interface Props {
  teamId: number;
}

const TeamTransfersTab: React.FC<Props> = ({ teamId }) => {
  const { transfers, pagination, page, setPage, isLoading, error } =
    useTeamTransfers(teamId, { limit: 5 });

  if (isLoading) {
    return <SkeletonCardLoader />;
  }

  if (error) {
    return <NoData message="Failed to load transfers" />;
  }

  return (
    <TeamTransfersTable
      transfers={transfers}
      pagination={pagination}
      page={page}
      setPage={setPage}
    />
  );
};

export default TeamTransfersTab;
