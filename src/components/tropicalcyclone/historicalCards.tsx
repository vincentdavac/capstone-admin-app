import { useState } from "react";
import chart from "../../components/stormsurge/chart";

interface Graph {
  [key: string]: string;
}

const aboutGraph: Graph = {
  SST: "SST shows the temperature of the ocean surface, which can indicate cyclone potential. \nUnit: °C \nLow: <26°C \nModerate: 26-27.9°C \nHigh: 28-28.9°C \nVery High: 29°C or higher",
};

export default function HistoricalCards() {
  const [current, setData] = useState("SST");
  const currentData = aboutGraph[current];
  const CurrentChart = chart[current];
  return (
    <div className="lg:col-span-2 flex flex-col">
      <div className="border-2 border-[#D9D9D9] w-[1480px] h-[616px] mt-8 rounded md:rounded-xl">
        <div className="w-full px-4 flex items-center h-16">
          <h1 className="text-lg font-semibold">HISTORICAL DATA</h1>
        </div>
        <hr className="w-full border-t border-gray-300" />
        <div className="flex justify-center pt-5">
          <div className="flex flex-wrap gap-2">
            <button
              className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-700 rounded-full"
              onClick={() => setData("SST")}
            >
              Sea Surface Temperature
            </button>
            <button className="px-4 py-2 bg-white text-black  rounded-full border border-blue-700">
              Humidity
            </button>
            <button className="px-4 py-2 bg-white text-black rounded-full border border-blue-700">
              Atmospheric Pressure
            </button>
            <button className="px-4 py-2 bg-white text-black rounded-full border border-blue-700">
              Water Pressure
            </button>
            <button className="px-4 py-2 bg-white text-black rounded-full border border-blue-700">
              Water Temperature
            </button>
            <button className="px-4 py-2 bg-white text-black rounded-full border border-blue-700">
              Air Temperature
            </button>
            <button className="px-4 py-2 bg-white text-black rounded-full border border-blue-700">
              Wave Rotation
            </button>
            <button className="px-4 py-2 bg-white text-black rounded-full border border-blue-700">
              Wind Speed
            </button>
            <button className="px-4 py-2 bg-white text-black rounded-full border border-blue-700">
              Danger Level
            </button>
          </div>
        </div>
        <div className="w-[1410px] h-[400px] bg-white shadow rounded-xl border border-gray-300 p-4 mx-auto mt-6">
          <div className="flex items-center space-x-2 justify-between">
            <h1 className="text-lg mb-3">Water Level</h1>
            <select
              id="my-select"
              className="block text-nowrap overflow-hidden truncate border border-gray-300 text-[15px] rounded-md p-2 w-[158px] h-[40px]"
            >
              <option value="">Last 6 months</option>
              <option value="">Last 7 months</option>
            </select>
          </div>

          <div className="flex gap-4 mt-4">
            <div className="border-2 border-[#D9D9D9] rounded-sm h-[250px] flex-1">
              <CurrentChart />
            </div>

            <div className="w-[300px] bg-[#E2F1FF] border border-gray-200 shadow rounded-lg p-4">
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
              {/* <p className="text-sm text-gray-600">{currentData}</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
