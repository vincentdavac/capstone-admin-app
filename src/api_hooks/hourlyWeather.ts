import getHourlyWeather from "../core_api_fetching/getHourlyWeather";
import {useState, useEffect, useRef } from "react";

export const fetchHourlyWeather = () => {
  const [loadingChart, setLoading] = useState(false);
  const [errorChart, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState([]);
  const [chartLabels, setChartLabels] = useState([]);
  const hasFetched = useRef(false);

  const fetchHourlyWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getHourlyWeather.get();
      const temps = result.data.map((t: { temperature: number; time: string }) => t.temperature);
      const times = result.data.map((t: { temperature: number; time: string }) => t.time);

    setChartData(temps);
    setChartLabels(times);
    } catch (err) {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchHourlyWeather();
  }, []);
  return {chartData, chartLabels,fetchHourlyWeather };
};
