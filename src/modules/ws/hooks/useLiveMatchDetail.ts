"use client";

import { useEffect, useRef, useState } from "react";

import { MatchListItem } from "@/types/matches";

import useSocket from "./useSocket";

const DEBUG = process.env.NEXT_PUBLIC_WS_DEBUG === "true";

const log = (...args: any[]) => {
  if (DEBUG) console.log("[useLiveMatchDetail]", ...args);
};

interface Options {
  matchId?: number;
  enabled?: boolean;
}

const useLiveMatchDetail = ({ matchId, enabled = true }: Options) => {
  const { socket, connected, error: socketError } = useSocket();

  const [data, setData] = useState<MatchListItem | null>(null);
  const [loading, setLoading] = useState(Boolean(matchId && enabled));
  const [error, setError] = useState<string | null>(null);

  const subscribedRef = useRef<number | null>(null);

  useEffect(() => {
    if (!socket || !matchId || !enabled) return;

    if (!connected) {
      log("socket not connected");
      setLoading(true);
      return;
    }

    if (subscribedRef.current !== matchId) {
      log("subscribing", matchId);
      socket.emit("subscribe:matches:detail", matchId);
      subscribedRef.current = matchId;
    }

    const onUpdate = (detail: MatchListItem) => {
      log("detail update", detail);
      setData(detail);
      setLoading(false);
      setError(null);
    };

    const onError = (err: { message?: string }) => {
      log("detail error", err);
      setError(err?.message ?? "Live match detail failed");
      setLoading(false);
    };

    socket.on("matches:detail:update", onUpdate);
    socket.on("matches:detail:error", onError);

    return () => {
      socket.off("matches:detail:update", onUpdate);
      socket.off("matches:detail:error", onError);
    };
  }, [socket, connected, matchId, enabled]);

  useEffect(() => {
    return () => {
      if (!socket || !subscribedRef.current) return;

      log("unsubscribing", subscribedRef.current);
      socket.emit("unsubscribe:matches:detail", subscribedRef.current);
      subscribedRef.current = null;
    };
  }, [socket]);

  useEffect(() => {
    if (socketError) {
      setError(socketError);
      setLoading(false);
    }
  }, [socketError]);

  return {
    data,
    loading,
    error,
    connected,
  };
};

export default useLiveMatchDetail;
