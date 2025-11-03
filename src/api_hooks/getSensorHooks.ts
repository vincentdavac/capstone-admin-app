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

  const fetchMonitoring = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getsensormonitoring.get();
      console.log("sensor data:", response);
      setSensorData(response); 
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonitoring()
    const fetchMonitoringData =() => {
    fetchMonitoring();
    }
  fetchMonitoringData
  const interval = setInterval(fetchMonitoringData, 5000);
  return ()=>clearInterval(interval)
  }, []);
  return { sensorData, loading, error, fetchSensorData };
};
