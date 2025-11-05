import getsensormonitoring from "../core_api_fetching/getSensorMonitoring";
import { useState, useEffect } from "react";
interface AtmosphericReading {
  pressure_hpa: number;
  recorded_at: string;
}
interface HumidityReading {
  humidity: number;
  recorded_at: string;
}
interface TemperatureReading {
  temperature_celsius: number;
  recorded_at: string;
}
interface DepthReading {
  depth_m: number;
  pressure_hpa: number;
}
interface WaterTempReading {
  temperature_celsius: number;
}
interface RainGaugeReading {
    rainfall_mm: number
}
interface rainSensorReading{
    percentage: number
}
interface windReading{
    wind_speed_k_h: number
}

interface Sensor {
  id: number;
  bme280_atmospheric_readings: AtmosphericReading[];
  bme280_humidity_reading: HumidityReading[];
  bme280_temperature_reading: TemperatureReading[];
  depth_reading: DepthReading[];
  water_temperature_reading: WaterTempReading[]
  rain_gauge_reading:RainGaugeReading[]
  rain_sensor_reading:rainSensorReading[]
  wind_reading:windReading[]
}

export const fetchSensorData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sensorData, setSensorData] = useState<Sensor[]>([]);

  useEffect(() => {
  let isMounted = true;
  
  const fetchData = async () => {
    if (!isMounted) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await getsensormonitoring.get();
      console.log("sensor data:", response);
      
      if (isMounted) {
        setSensorData(response);
      }
    } catch (err) {
      if (isMounted) {
        setError("Failed to fetch data");
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  fetchData(); 
  const interval = setInterval(fetchData, 5000);

  return () => {
    isMounted = false;
    clearInterval(interval);
  };
}, []);
  return { sensorData, loading, error, fetchSensorData };
};
