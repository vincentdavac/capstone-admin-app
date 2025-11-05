import getWater from "../core_api_fetching/fetchwater";
import {useState, useEffect} from "react";

export const fetchSensorData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [water, setWater] = useState<any>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getWater.get();
      setWater(data);
    } catch (err) {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { water, loading, error, fetchSensorData };
};
