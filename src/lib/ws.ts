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
    auth: { token: TOKEN },
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
  });

  socket.on("connect", () => log("connected", socket?.id));
  socket.on("disconnect", (r) => log("disconnected", r));
  socket.on("connect_error", (e) => log("connect_error", e.message));

  socket.io.on("ping", () => log("ping"));
  socket.io.on("reconnect_attempt", (n) => log("reconnect_attempt", n));
  socket.io.on("reconnect", (n) => log("reconnected", n));

  return socket;
};

export const closeSocket = () => {
  if (!socket) return;
  socket.disconnect();
  socket = null;
};
