import { useState } from "react";
import api_endpoint from "../config/coreApi";
export function useBroadcastAlert() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const broadcastToSelected = async (selectedAlertId: number | null) => {
    try {
      setError(null);
      setSuccess(false);

      if (!selectedAlertId) {
        alert("Please select an alert to broadcast");
        return;
      }

      const payload = { alert_id: selectedAlertId };

      setLoading(true);
      const url = `${api_endpoint}/broadcast-alert`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to broadcast alert");
      }

      const result = await response.json();
      console.log("Alert broadcasted successfully:", result);
      setSuccess(true);
      return result;
    } catch (err: any) {
      console.error("Error broadcasting alert:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    broadcastToSelected,
  };
}
