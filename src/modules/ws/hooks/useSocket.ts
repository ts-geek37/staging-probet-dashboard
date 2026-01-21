"use client";

import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

import { getSocket } from "../socketManager";

const DEBUG = process.env.NEXT_PUBLIC_WS_DEBUG === "true";

const log = <T extends unknown[]>(...args: T) => {
  if (DEBUG) console.log("[useSocket]", ...args);
};

type UseSocketResult = {
  socket: Socket | null;
  connected: boolean;
  error: string | null;
};

const useSocket = (): UseSocketResult => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const s = getSocket();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSocket(s);
    setConnected(s.connected);

    const onConnect = () => {
      log("connected", s.id);
      setConnected(true);
      setError(null);
    };

    const onDisconnect = (reason: string) => {
      log("disconnected", reason);
      setConnected(false);
    };

    const onConnectError = (err: Error) => {
      log("connect_error", err.message);
      setError(err.message);
      setConnected(false);
    };

    const onReconnect = (attempt: number) => {
      log("reconnected after attempts:", attempt);
      setConnected(true);
      setError(null);
    };

    const onPing = () => {
      log("ping");
    };

    s.on("connect", onConnect);
    s.on("disconnect", onDisconnect);
    s.on("connect_error", onConnectError);
    s.io.on("reconnect", onReconnect);
    s.io.on("ping", onPing);

    return () => {
      s.off("connect", onConnect);
      s.off("disconnect", onDisconnect);
      s.off("connect_error", onConnectError);
      s.io.off("reconnect", onReconnect);
      s.io.off("ping", onPing);
    };
  }, []);

  return {
    socket,
    connected,
    error,
  };
};

export default useSocket;
