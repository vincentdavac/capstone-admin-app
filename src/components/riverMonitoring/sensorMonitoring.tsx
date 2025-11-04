import { fetchSensorData } from "../../api_hooks/getSensorHooks";
import { useState, useEffect } from "react";

const SensorMonitoring = () => {
  const { sensorData, loading, error } = fetchSensorData();
  const sensorMonitoring = sensorData || [];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const flatData = sensorMonitoring.flatMap((sensor) =>
    sensor.bme280_atmospheric_readings.map((_, i) => ({
      id: `${sensor.id}-${i}`,
      temperature:
        sensor.bme280_temperature_reading[i]?.temperature_celsius ?? "+-+",
      humidity: sensor.bme280_humidity_reading[i]?.humidity ?? "+-+",
      pressure: sensor.bme280_atmospheric_readings[i]?.pressure_hpa ?? "+-+",
      waterPressure: sensor.depth_reading[i]?.pressure_hpa ?? "+-+",
      depth: sensor.depth_reading[i]?.depth_m ?? "+-+",
      waterTemp:
        sensor.water_temperature_reading[i]?.temperature_celsius ?? "+-+",
      rainGauge: sensor.rain_gauge_reading[i]?.rainfall_mm ?? "+-+",
      rain: sensor.rain_sensor_reading[i]?.percentage ?? "+-+",
      wind: sensor.wind_reading[i]?.wind_speed_k_h ?? "+-+",
      recordedAt: new Date(
        sensor.bme280_atmospheric_readings[i]?.recorded_at ?? "+-+"
      ).toLocaleDateString("en-US", {
        month: "short", 
        day: "numeric", 
        year: "numeric",
      }),
    }))
  );

  const totalItems = flatData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = flatData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex justify-center mt-5">
      <div className="lg:col-span-2 flex flex-col gap-4">
        <div className="w-[1413px] h-auto bg-white shadow rounded-lg border border-gray-300 p-4">
          <div className="w-full px-4 flex items-center h-16">
            <h1 className="text-lg font-semibold">SENSOR MONITORING TABLE</h1>
          </div>
          <hr className="w-full border-t border-gray-300" />
          <div className="w-[1350px] overflow-hidden border rounded-xl shadow-sm mt-10 ml-3">
            <table className="table-auto w-full text-sm text-center border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr className="h-15">
                  <th className="px-4 py-2">Surroundings Temperature</th>
                  <th className="px-4 py-2">Humidity</th>
                  <th className="px-4 py-2">Atmospheric Pressure</th>
                  <th className="px-4 py-2">Water Pressure</th>
                  <th className="px-4 py-2">Water Depth</th>
                  <th className="px-4 py-2">Water Temperature</th>
                  <th className="px-4 py-2">Rain Gauge</th>
                  <th className="px-4 py-2">Rain</th>
                  <th className="px-4 py-2">Wind Speed</th>
                  <th className="px-4 py-2">Recorded At</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((d) => (
                  <tr className="border-b border-[#D9D9D9] h-12" key={d.id}>
                    <td className="px-4 py-2">{d.temperature + "°C"}</td>
                    <td className="px-4 py-2">{d.humidity + "%"}</td>
                    <td className="px-4 py-2">{d.pressure + " hPa"}</td>
                    <td className="px-4 py-2">{d.waterPressure + " hPa"}</td>
                    <td className="px-4 py-2">{d.depth + "m"}</td>
                    <td className="px-4 py-2">{d.waterTemp + "°C"}</td>
                    <td className="px-4 py-2">{d.rainGauge + " mm"}</td>
                    <td className="px-4 py-2">{d.rain}</td>
                    <td className="px-4 py-2">{d.wind + " km/h"}</td>
                    <td className="px-4 py-2">{d.recordedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 space-y-2 sm:space-y-0">
            <div className="text-sm text-gray-700">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, totalItems)}
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex space-x-1 sm:space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-2 sm:px-3 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50"
                >
                  Previous
                </button>
                {[...Array(Math.min(totalPages, 5))].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 text-sm rounded ${
                      currentPage === i + 1
                        ? "bg-[#453EFE] text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-2 sm:px-3 py-1 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SensorMonitoring;
