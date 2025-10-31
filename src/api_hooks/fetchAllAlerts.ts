import getAllAlerts from "../core_api_fetching/fetchAllAlerts";
import {useState, useEffect} from "react";

export const fetchAlertsAlerts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [alertsGet, setAlerts] = useState<any>(null);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllAlerts.get();
      console.log("Fetched alerts:", data);
      setAlerts(data.data);
    } catch (err) {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAlerts();
  }, []);
  return { alertsGet, loading, error, fetchAlertsAlerts };
};
