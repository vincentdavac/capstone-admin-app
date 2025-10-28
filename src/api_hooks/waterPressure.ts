import getWaterPressure from "../core_api_fetching/getWaterTemperature";
import { useState, useEffect, useRef } from "react";

export const fetchWaterPreessure = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [waterPressure, setWaterPressure] = useState<any>(null);
  const hasFetched = useRef(false);

  const fetchWaterPreessure = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getWaterPressure.get();
      setWaterPressure(data.data.WATER_TEMPERATURE);
    } catch (err) {
      setError("Failed to fetch water temp");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchWaterPreessure();
  }, []);
  return { waterPressure, loading, error, fetchWaterPreessure };
};
