import getRaingauge from "../core_api_fetching/fetchRainRauge";
import {useState, useEffect} from "react";

export const fetchSensorData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [raingauge, setgetRaingauge] = useState<any>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getRaingauge.get();
      setgetRaingauge(data);
    } catch (err) {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { raingauge, loading, error, fetchSensorData };
};
