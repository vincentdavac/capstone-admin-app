import getWatertemp from "../core_api_fetching/fetchWatertemp";
import {useState, useEffect} from "react";

export const fetchSensorData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [waterTemperate, setWatertemp] = useState<any>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getWatertemp.get();
      setWatertemp(data);
    } catch (err) {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { waterTemperate, loading, error, fetchSensorData };
};
