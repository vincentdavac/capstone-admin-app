import Echo from "laravel-echo";
import Pusher from "pusher-js";

// Assign Pusher to window before creating Echo
window.Pusher = Pusher;

export const createEcho = (token: string) => {
  return new Echo({
    broadcaster: "pusher",
    key: "193ca11fdb9f0071d0d6",
    cluster: "ap1",
    forceTLS: false,
    encrypted: false,
    authEndpoint: "http://127.0.0.1:8000/broadcasting/auth",
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
