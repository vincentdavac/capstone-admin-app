import getSurrounding from "../core_api_fetching/fetchSurroundingTemp";
import {useState, useEffect} from "react";

export const fetchSensorData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [surrounding, setSurrounding] = useState<any>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSurrounding.get();
      setSurrounding(data);
    } catch (err) {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { surrounding, loading, error, fetchSensorData };
};
