"use client";

import React from "react";

import { NoData, SkeletonCardLoader } from "@/components";

import { PlayerTransfersTable } from "../components";
import { usePlayerTransfers } from "../hooks";

interface Props {
  playerId: number;
}

const PlayerTransfersTab: React.FC<Props> = ({ playerId }) => {
  const { transfers, isLoading, error } = usePlayerTransfers(playerId);

  if (isLoading) {
    return <SkeletonCardLoader />;
  }

  if (error) {
    return <NoData message="Failed to load transfers" />;
  }

  return (
    <PlayerTransfersTable
      transfers={transfers}
      pagination={null}
      page={1}
      setPage={() => {}}
    />
  );
};

export default PlayerTransfersTab;
