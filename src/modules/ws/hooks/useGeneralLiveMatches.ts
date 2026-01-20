"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { MatchListItem } from "@/types/matches";
import useSocket from "./useSocket";
import { LiveMatchesScopeProps, LiveScopeEnum } from "../types";

const DEBUG = process.env.NEXT_PUBLIC_WS_DEBUG === "true";

const log = (...args: any[]) => {
  if (DEBUG) console.log("[useGeneralLiveMatches]", ...args);
};

const useGeneralLiveMatches = (
  initialData: MatchListItem[] = [],
  scopeInfo: LiveMatchesScopeProps = {
    scope: LiveScopeEnum.GENERAL,
  },
  search: string = ""
) => {
  const { socket, connected, error: socketError } = useSocket();

  const [rawData, setRawData] = useState<MatchListItem[]>(initialData);
  const [loading, setLoading] = useState(!initialData.length);
  const [error, setError] = useState<string | null>(null);

  const subscribedRef = useRef(false);

  useEffect(() => {
    if (!socket) return;

    if (!connected) {
      log("socket not connected");
      setLoading(true);
      return;
    }

    if (!subscribedRef.current) {
      log("subscribing to general matches");
      socket.emit("subscribe:matches:list", scopeInfo);
      subscribedRef.current = true;
    }

    const onUpdate = (items: MatchListItem[]) => {
      log("matches update", items);
      setRawData(items);
      setLoading(false);
      setError(null);
    };

    const onError = (err: { message?: string }) => {
      log("matches error", err);
      setError(err?.message ?? "Live update failed");
      setLoading(false);
    };

    socket.on("matches:list:update", onUpdate);
    socket.on("matches:list:error", onError);

    return () => {
      socket.off("matches:list:update", onUpdate);
      socket.off("matches:list:error", onError);
    };
  }, [socket, connected, scopeInfo]);

  useEffect(() => {
    return () => {
      if (!socket || !subscribedRef.current) return;

      log("unsubscribing from general matches");
      socket.emit("unsubscribe:matches:list", { scope: "general" });
      subscribedRef.current = false;
    };
  }, [socket]);

  useEffect(() => {
    if (socketError) {
      setError(socketError);
      setLoading(false);
    }
  }, [socketError]);

 
  const data = useMemo(() => {
    if (!search.trim()) return rawData;

    const q = search.toLowerCase();

    return rawData.filter((match) =>
      match.league?.name?.toLowerCase().includes(q) ||
      match.teams?.home?.name?.toLowerCase().includes(q) ||
      match.teams?.away?.name?.toLowerCase().includes(q)
    );
  }, [rawData, search]);

  return {
    data,
    loading,
    error,
    connected,
  };
};

export default useGeneralLiveMatches;
