import api_endpoint from "../config/coreApi";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
export const alertMonitoring = {
  async getActiveAlerts(buoyId: string) {
    const response = await fetch(`${api_endpoint}/${buoyId}/active`);
    return await response.json();
  },
  async markAlertAsShown(alertId: number) {
    const response = await fetch(`${api_endpoint}/mark-shown`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        alert_id: alertId,
      }),
    });

    return await response.json();
  },
  async checkAlertStatus(buoyId: string) {
    const response = await fetch(`${api_endpoint}/${buoyId}/status`);
    return await response.json();
  }
};
