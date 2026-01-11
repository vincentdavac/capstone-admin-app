import Echo from "laravel-echo";
import Pusher from "pusher-js";

const AUTH_ENDPOINT = import.meta.env.VITE_ECHO_AUTH_ENDPOINT;
const PUSHER_KEY = import.meta.env.VITE_PUSHER_KEY;
const PUSHER_CLUSTER = import.meta.env.VITE_PUSHER_CLUSTER;

// Assign Pusher to window before creating Echo
window.Pusher = Pusher;

export const createEcho = (token: string) => {
  return new Echo({
    broadcaster: "pusher",
    key: PUSHER_KEY,
    cluster: PUSHER_CLUSTER,
    forceTLS: false,
    encrypted: false,
    authEndpoint: AUTH_ENDPOINT,
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
    // Add these important options
    // enabledTransports: ["ws", "wss"],
    wsHost: "ws-ap1.pusher.com",
    wsPort: 443,
    wssPort: 443,
    disableStats: true,
    // Add connection timeout and retry logic
    activityTimeout: 30000,
    pongTimeout: 10000,
  });
};
