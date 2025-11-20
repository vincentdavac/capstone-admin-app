import getAllAlerts from "../core_api_fetching/fetchAllAlerts";
import {useState, useEffect} from "react";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
export const fetchAlertsAlerts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [alertsGet, setAlerts] = useState<any>(null);
  const {user} =useContext(AppContext)!;
  const fetchAlerts = async () => {
    if (!user?.barangay?.id) return;
    try {
      setLoading(true);
      setError(null);
      const data = await getAllAlerts.get(user?.barangay?.id);
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
  }, [user]);
  return { alertsGet, loading, error, fetchAlertsAlerts };
};
