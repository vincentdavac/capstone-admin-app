import { useState } from "react";
import api_endpoint from "../config/coreApi";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
export function useBroadcastAlert() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { token, user } = useContext(AppContext)!;
  const broadcastToSelected = async (selectedAlertId: number | null) => {
    const buoyCode = user?.barangay?.buoys?.[0]?.buoyCode;
    if (!token) return;
    try {
      setError(null);
      setSuccess(false);
      if (!selectedAlertId) {
        alert("Please select an alert to broadcast");
        return;
      }
      if (!buoyCode || buoyCode === undefined) {
        alert("User has no assigned prototype");
        setError("User has no assigned prototype");
        return;
      }
      const payload = {
        alert_id: selectedAlertId,
        buoy_code: String(buoyCode),
      };
      setLoading(true);
      const url = `${api_endpoint}/broadcast-alert`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to broadcast alert");
      }
      const result = await response.json();
      if (result.reset > 0) {
        const endPoint = `${api_endpoint}/reset-relay`;
        setTimeout(async () => {
          await fetch(endPoint, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ buoy_code: String(buoyCode) }),
          });
        }, result.reset * 1000);
      }
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
