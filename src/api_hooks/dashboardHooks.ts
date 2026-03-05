import allAlert from "../core_api_fetching/allAlerts";
import { useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
export function insertingAlerts() {
  const { token, user } = useContext(AppContext)!;
  const buoyId = user?.barangay?.buoys?.[0]?.id;
  const buoyCode = user?.barangay?.buoys?.[0]?.buoyCode;
  useEffect(() => {
    let mount = true;
    const alertController = new AbortController();

    const allInsertAlerts = async () => {
      if (!mount) return;
      try {
        await allAlert.post({
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
