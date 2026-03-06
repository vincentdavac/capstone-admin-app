import allAlert from "../core_api_fetching/allAlerts";
import api_endpoint from "../config/coreApi";
import { useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
export function insertingAlerts() {
  const { token, user } = useContext(AppContext)!;
  const buoyId = user?.barangay?.buoys?.[0]?.id;
  const buoyCode = user?.barangay?.buoys?.[0]?.buoyCode;
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  useEffect(() => {
    let mount = true;
    const alertController = new AbortController();

    const allInsertAlerts = async () => {
      if (!mount) return;
      try {
        const result = await allAlert.post({
          signal: alertController.signal,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            alert_id: buoyId,
            buoy_code: String(buoyCode),
          }),
        });

        if (result?.reset > 0) {
          await delay(result.reset * 1000);
          const relayRes = await fetch(`${api_endpoint}/reset-relay-modal`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ buoy_code: String(buoyCode) }),
          });
          if (!relayRes.ok) {
            throw new Error(
              `relay-modal failed with status: ${relayRes.status}`,
            );
          }
        }
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
        console.error("Failed to send alert:", error);
      }
    };
    allInsertAlerts();
    const interval = setInterval(allInsertAlerts, 5000);
    return () => {
      console.log("Stop alert polling");
      mount = false;
      alertController.abort();
      clearInterval(interval);
    };
  }, [token, user]);
}
