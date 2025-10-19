import getWeather from "../core_api_fetching/getWeeklyWeather";
import { useState, useEffect, useRef } from "react";

export const fetchWeather = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forecast, setForecast] = useState<any>(null);
  const hasFetched = useRef(false);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getWeather.get();
      setForecast(data);
    } catch (err) {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchWeather();
  }, []);
  return { forecast, loading, error, fetchWeather };
};
