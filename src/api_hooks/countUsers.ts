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
  }, []);
  return { counts, loading, error, fetchUserCounts };
};
