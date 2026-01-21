/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useRef, useState } from "react";

import { MatchEventItem } from "@/types/matches";

import useSocket from "./useSocket";

const DEBUG = process.env.NEXT_PUBLIC_WS_DEBUG === "true";

const log = <T extends unknown[]>(...args: T) => {
  if (DEBUG) console.log("[useLiveMatchEvents]", ...args);
};

interface Options {
  matchId?: number;
  enabled?: boolean;
}

const useLiveMatchEvents = ({ matchId, enabled = true }: Options) => {
  const { socket, connected, error: socketError } = useSocket();

  const [events, setEvents] = useState<MatchEventItem[]>([]);
  const [loading, setLoading] = useState(enabled && !!matchId);
  const [error, setError] = useState<string | null>(null);

  const subscribedRef = useRef<number | null>(null);

  useEffect(() => {
    if (!socket || !matchId || !enabled) return;

    if (!connected) {
      setLoading(true);
      return;
    }

    if (subscribedRef.current !== matchId) {
      log("subscribing", matchId);
      socket.emit("subscribe:matches:events", matchId);
      subscribedRef.current = matchId;
    }

    const onUpdate = (payload: {
      matchId: number;
      events: MatchEventItem[];
    }) => {
      if (payload.matchId !== matchId) return;

      log("events update", payload.events.length);
      setEvents(payload.events);
      setLoading(false);
      setError(null);
    };

    socket.on("matches:events:update", onUpdate);

    return () => {
      socket.off("matches:events:update", onUpdate);
    };
  }, [socket, connected, matchId, enabled]);

  useEffect(() => {
    return () => {
      if (!socket || !subscribedRef.current) return;

      log("unsubscribing", subscribedRef.current);
      socket.emit("unsubscribe:matches:events", subscribedRef.current);
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
    events,
    loading,
    error,
    connected,
  };
};

export default useLiveMatchEvents;
