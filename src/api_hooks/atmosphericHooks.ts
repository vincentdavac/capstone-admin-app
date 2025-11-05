import getAtmospheric from "../core_api_fetching/fetchAtmospheric";
import {useState, useEffect} from "react";

export const fetchAtmosphericData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [atmosphericData, setAtmospheric] = useState<any>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAtmospheric.get();
      setAtmospheric(data);
    } catch (err) {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { atmosphericData, loading, error, fetchAtmosphericData };
};
