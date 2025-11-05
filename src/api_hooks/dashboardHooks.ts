 import allAlert from "../core_api_fetching/allAlerts";
 import { useEffect } from "react";
 export function insertingAlerts() {
 useEffect(() => {
    let mount = true;
    const alertController = new AbortController();

    const allInsertAlerts = async () => {
      if (!mount) return;
      try {
        await allAlert.post({ signal: alertController.signal });
      } catch (error) {
        console.error(" failed to send alert: ", error);
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
  }, []);
}