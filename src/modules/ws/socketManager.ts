"use client";

import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

const WS_URL = process.env.NEXT_PUBLIC_API_URL!;
const TOKEN = process.env.NEXT_PUBLIC_API_INTERNAL_TOKEN!;
const DEBUG = process.env.NEXT_PUBLIC_WS_DEBUG === "true";

const log = <T = unknown>(msg: string, data?: T) => {
  if (DEBUG) {
    console.info(`[WS] ${msg}`, data ?? "");
  }
};

export const getSocket = (): Socket => {
  if (socket) return socket;

  socket = io(WS_URL, {
    transports: ["websocket"],
    reconnection: true,
    auth: (cb) => cb({ token: TOKEN }),
  });

  socket.on("connect", () => log("connected", socket?.id));
  socket.on("disconnect", (r) => log("disconnected", r));
  socket.on("connect_error", (e) => log("connect_error", e.message));

  return socket;
};

export const closeSocket = () => {
  if (!socket) return;
  socket.disconnect();
  socket = null;
};
