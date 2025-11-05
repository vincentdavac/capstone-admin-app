import { useState } from "react";
import chart from "./chart";
import SensorMonitoring from "./sensorMonitoring";

interface Graph {
  [key: string]: string;
}

export default function Cards() {
  const [data, setData] = useState("SST");
  const CurrentChart = chart[data] || (() => <div>No chart selected</div>);

  const getButtonClass = (key: string) =>
    data === key
      ? "px-4 py-2 bg-blue-500 text-white hover:bg-blue-700 rounded-full"
      : "px-4 py-2 bg-white text-black rounded-full border border-blue-700 hover:bg-blue-100";
  const [date, setDate] = useState("");
  return (
    <div className="lg:col-span-2 flex flex-col">
      <div className="border-2 border-[#D9D9D9] w-[1480px] h-[1200px] mt-8 rounded md:rounded-xl">
        <div className="w-full px-4 flex items-center h-16">
          <h1 className="text-lg font-semibold">HISTORICAL DATA</h1>
        </div>
        <hr className="w-full border-t border-gray-300" />

        {/* BUTTONS SECTION */}
        <div className="flex justify-center pt-5">
          <div className="flex flex-wrap gap-2">
            <button
              className={getButtonClass("SST")}
              onClick={() => setData("SST")}
            >
              Surroundings Temperature
            </button>
            <button
              className={getButtonClass("humidity")}
              onClick={() => setData("humidity")}
            >
              Humidity
            </button>
            <button
              className={getButtonClass("atmospheric")}
              onClick={() => setData("atmospheric")}
            >
              Atmospheric Pressure
            </button>
            <button
              className={getButtonClass("waterDepth")}
              onClick={() => setData("waterDepth")}
            >
              Water Depth
            </button>
            <button
              className={getButtonClass("waterTemp")}
              onClick={() => setData("waterTemp")}
            >
              Water Temperature
            </button>
            <button
              className={getButtonClass("windSpeed")}
              onClick={() => setData("windSpeed")}
            >
              Wind Speed
            </button>
            <button
              className={getButtonClass("rainFall")}
              onClick={() => setData("rainFall")}
            >
              Rain Gauge
            </button>
            <button
              className={getButtonClass("waveHeight")}
              onClick={() => setData("waveHeight")}
            >
              Rain
            </button>
            <button
              className={getButtonClass("waterpressure")}
              onClick={() => setData("waterpressure")}
            >
              Water Pressure
            </button>
          </div>
        </div>

        {/* CHART SECTION */}
        <div className="w-[1410px] h-[400px] bg-white shadow rounded-lg border border-gray-300 p-4 mx-auto mt-6">
          <div className="flex items-center space-x-2 justify-between">
            <h1 className="text-lg mb-3 capitalize">{data} Chart</h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">
                  From:
                </label>
                <input
                  type="date"
                  className="border border-gray-300 rounded-md p-2 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">To:</label>
                <input
                  type="date"
                  className="border border-gray-300 rounded-md p-2 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <div className="border-2 border-[#D9D9D9] rounded-sm h-[300px] flex-1">
              <CurrentChart />
            </div>
          </div>
        </div>
        <SensorMonitoring />
      </div>
    </div>
  );
}
