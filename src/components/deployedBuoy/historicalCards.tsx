import { useState } from "react";
import chart from "../riverMonitoring/chart"; 

export default function HistoricalCards() {
  const [current, setData] = useState("SST");

  const CurrentChart = chart[current];

  return (
    <div className="lg:col-span-2 flex flex-col w-full">
      <div className="border-2 border-[#D9D9D9] dark:border-gray-700 w-full h-auto mt-8 rounded md:rounded-xl bg-white dark:bg-gray-800">
        <div className="w-full px-4 flex items-center h-16">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            HISTORICAL DATA
          </h1>
        </div>
        <hr className="w-full border-t border-gray-300 dark:border-gray-700" />

        <div className="flex justify-center pt-5 px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              className={`px-4 py-2 rounded-full text-sm sm:text-base whitespace-nowrap 
                ${
                  current === "SST"
                    ? "bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600"
                    : "bg-white text-black border border-blue-700 dark:bg-gray-700 dark:text-gray-200 dark:border-blue-500"
                }`}
              onClick={() => setData("SST")}
            >
              Surroundings Temperature
            </button>
            
            <button
              className="px-4 py-2 bg-white text-black dark:bg-gray-700 dark:text-gray-200 rounded-full border border-blue-700 dark:border-blue-500 text-sm sm:text-base whitespace-nowrap"
              onClick={() => setData("Humidity")}
            >
              Humidity
            </button>
            <button
              className="px-4 py-2 bg-white text-black dark:bg-gray-700 dark:text-gray-200 rounded-full border border-blue-700 dark:border-blue-500 text-sm sm:text-base whitespace-nowrap"
              onClick={() => setData("Pressure")}
            >
              Atmospheric Pressure
            </button>
            <button
              className="px-4 py-2 bg-white text-black dark:bg-gray-700 dark:text-gray-200 rounded-full border border-blue-700 dark:border-blue-500 text-sm sm:text-base whitespace-nowrap"
              onClick={() => setData("WaterDepth")}
            >
              Water Depth
            </button>
            <button
              className="px-4 py-2 bg-white text-black dark:bg-gray-700 dark:text-gray-200 rounded-full border border-blue-700 dark:border-blue-500 text-sm sm:text-base whitespace-nowrap"
              onClick={() => setData("WaterTemp")}
            >
              Water Temperature
            </button>
            <button
              className="px-4 py-2 bg-white text-black dark:bg-gray-700 dark:text-gray-200 rounded-full border border-blue-700 dark:border-blue-500 text-sm sm:text-base whitespace-nowrap"
              onClick={() => setData("WindSpeed")}
            >
              Wind Speed
            </button>
            <button
              className="px-4 py-2 bg-white text-black dark:bg-gray-700 dark:text-gray-200 rounded-full border border-blue-700 dark:border-blue-500 text-sm sm:text-base whitespace-nowrap"
              onClick={() => setData("RainGauge")}
            >
              Rain Gauge
            </button>
            <button
              className="px-4 py-2 bg-white text-black dark:bg-gray-700 dark:text-gray-200 rounded-full border border-blue-700 dark:border-blue-500 text-sm sm:text-base whitespace-nowrap"
              onClick={() => setData("Rain")}
            >
              Rain
            </button>
            <button
              className="px-4 py-2 bg-white text-black dark:bg-gray-700 dark:text-gray-200 rounded-full border border-blue-700 dark:border-blue-500 text-sm sm:text-base whitespace-nowrap"
              onClick={() => setData("WaterPressure")}
            >
              Water Pressure
            </button>
          </div>
        </div>

        <div className="w-full h-auto bg-white dark:bg-gray-700 shadow rounded-xl border border-gray-300 dark:border-gray-600 p-4 mx-auto mt-6 mb-6 max-w-full md:max-w-[95%]">
          <div className="flex items-center space-x-2 justify-between flex-wrap">
            <h1 className="text-lg mb-3 dark:text-gray-100">Water Level</h1>

            <select
              id="my-select"
              className="block text-nowrap overflow-hidden truncate border border-gray-300 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-100 text-[15px] rounded-md p-2 w-full sm:w-[158px] h-[40px] mb-3"
            >
              <option value="">Last 6 months</option>
              <option value="">Last 7 months</option>
            </select>
          </div>

          <div className="flex gap-4 mt-4">
            <div className="border-2 border-[#D9D9D9] dark:border-gray-600 rounded-sm h-[400px] flex-1">
              <CurrentChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
