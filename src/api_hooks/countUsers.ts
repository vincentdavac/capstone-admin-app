/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import getUser from "../core_api_fetching/getCountUser";
import {useState, useEffect} from "react";

export const fetchUserCounts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [counts, setCounts] = useState<any>(null);

  const fetchUserCount = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getUser.get();
      setCounts(data);
    } catch (err) {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUserCount();
    const interval = setInterval(fetchUserCount, 5000);
    return () => clearInterval(interval);
  }, []);
  return { counts, loading, error, fetchUserCounts };
};
