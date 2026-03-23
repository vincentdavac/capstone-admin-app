import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import getWaterAlert from "../core_api_fetching/fetchWaterAlert";
interface WaterAlertData {
  [key: string]: unknown;
}

const WaterAlertHooks = () => {
  const { token } = useContext(AppContext)!;
  const [data, setData] = useState<WaterAlertData | null>(null);

  useEffect(() => {
    const fetchWaterAlert = async () => {
      if (!token) return;
      try {
        const res= await getWaterAlert.get(token);
        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWaterAlert();
  }, [token]);

  return { data };
};

export default WaterAlertHooks;
