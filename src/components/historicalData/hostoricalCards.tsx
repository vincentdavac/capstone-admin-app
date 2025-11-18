import { useState } from "react";
import chart from "./chart";
import MonitoringTable from "./monitoringTable";

interface Graph {
  [key: string]: string;
}

export default function HistoricalCards() {
  const [current, setData] = useState("waterLevel");
  const CurrentChart = chart[current];
  const [date, setDate] = useState('');
  return (
    <div className="lg:col-span-2 flex flex-col">
      <div className="border-2 border-[#D9D9D9] w-[1480px] h-[1043px] mt-8 rounded md:rounded-xl">
        <div className="w-full px-4 flex items-center h-16 justify-between">
          <h1 className="text-xl font-normal text-gray-500 dark:text-white">HISTORICAL TABLE</h1>
          <button className="bg-[#FFF] border border-[#453EFE] text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center">
            Export CSV
          </button>
        </div>
        <hr className="w-full border-t border-gray-300" />
        <div className="flex justify-center pt-5">
          <div className="flex flex-wrap gap-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-700 rounded-full"
              onClick={() => setData("waterLevel")}
            >
              Water Level
            </button>

            <button
              className="px-4 py-2 bg-white text-black  rounded-full border border-blue-700"
              onClick={() => setData("SST")}
            >
              Sea Surface Temp
            </button>
            <button
              className="px-4 py-2 bg-white text-black  rounded-full border border-blue-700"
              onClick={() => setData("waterpressure")}
            >
              Water Pressure
            </button>
            <button
              className="px-4 py-2 bg-white text-black rounded-full border border-blue-700"
              onClick={() => setData("atmospheric")}
            >
              Atmospheric Pressure
            </button>
            <button
              className="px-4 py-2 bg-white text-black rounded-full border border-blue-700"
              onClick={() => setData("waveHeight")}
            >
              Wave Height
            </button>
            <button
              className="px-4 py-2 bg-white text-black rounded-full border border-blue-700"
              onClick={() => setData("waterDepth")}
            >
              Water Depth
            </button>
            <button
              className="px-4 py-2 bg-white text-black rounded-full border border-blue-700"
              onClick={() => setData("waterTemp")}
            >
              Water Temp
            </button>
            <button
              className="px-4 py-2 bg-white text-black rounded-full border border-blue-700"
              onClick={() => setData("windSpeed")}
            >
              Wind Speed
            </button>
            <button
              className="px-4 py-2 bg-white text-black rounded-full border border-blue-700"
              onClick={() => setData("rainFall")}
            >
              Rainfall
            </button>
          </div>
        </div>
        <div className="w-[1410px] h-[400px] bg-white shadow rounded-lg border border-gray-300 p-4 mx-auto mt-6">
          <div className="flex items-center space-x-2 justify-between">
            <h1 className="text-lg mb-3">Water Level</h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">From:</label>
                <input type="date" className="border border-gray-300 rounded-md p-2 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">To:</label>
                <input type="date" className="border border-gray-300 rounded-md p-2 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <div className="border-2 border-[#D9D9D9] rounded-sm h-[300px] flex-1">
              <CurrentChart />
            </div>

            {/* <div className="w-[300px] h-[300px] bg-[#E2F1FF] border border-gray-200 shadow rounded-lg p-4">
              <h1 className="text-base font-semibold text-gray-700 mb-2">
                About this Graph
              </h1>
              <p className="text-sm text-gray-600 mb-2">
                {currentData.split("\n")[0]}
              </p>

              <ul className="list-disc list-inside text-sm text-gray-600">
                {currentData
                  .split("\n")
                  .slice(1)
                  .map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
              </ul>
            </div> */}
          </div>
        </div>
        <MonitoringTable />
      </div>
    </div>
  );
}
