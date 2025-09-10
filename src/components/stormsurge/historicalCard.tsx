import { useState } from "react";
import chart from "../../components/stormsurge/chart";

interface Graph {
  [key: string]: string;
}

const aboutGraph: Graph = {
  SST: "Sea Surface Temperature (SST) indicates ocean warming trends; sustained highs can lead to coral bleaching. \n Unit: °C \n Normal (tropics): 26-30 °C\nWatch: ≥ 32 °C (heat stress)",
  waterLevel:
    "Water Level tracks sea/river height. Peaks align with high tides, storm surges, or heavy rain runoff. \nUnit: meters (m)\nNormal: 0.8-2.0 m\nWatch: > 2.5 m (possible flooding)",
  waterpressure:
    "Water Pressurerises with depth and wave action; sudden spikes may indicate strong currents or surges. \n Unit: kPa \n Typical: 100-200 kPa (shallow sensors) \n Watch: abrupt ±20 kPa shifts",
  atmospheric:
    "Atmospheric Pressure helps track weather systems; sharp drops often precede storms/typhoons. \nUnit: hPa \nNormal: 1000-1015 hPa \nWatch: < 990 hPa (low-pressure system)",
  waveHeight:
    "Wave Height shows sea roughness. Larger waves pose risks for small craft and coastal operations.  \nUnit: meters (m) \nFair: 0.5-1.5 m \n Rough/High: > 3-4 m",
  waterDepth:
    "Water Depth variations may reflect tides, sedimentation, scouring, or subsidence along channels. \nUnit: meters (m) \nNormal: site-specific, generally stable \n Watch: sudden change > 1 ms",
  waterTemp:
    "Water Temperature (below surface) influences dissolved oxygen and species distribution. \n Unit: °C \nNormal (tropics, sub-surface): 24-28 °C \nWatch: > 30 °C sustained",
  windSpeed:
    "Wind Speed helps assess sea state and storm risk; gusty periods often precede higher waves. \nUnit: m/s \n Breeze: 3-8 m/s \n Strong/Gale: > 15 m/s",
  rainFall:
    "Rainfall totals drive runoff and flood risk; monthly accumulations highlight wet/dry seasons. \nUnit: millimeters (mm) \n Light: 1-10 mm/day \n Heavy: > 50 mm/day",
};

export default function HistoricalCards() {
  const [current, setData] = useState("waterLevel");
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
            <div className="border-2 border-[#D9D9D9] rounded-sm h-[300px] flex-1">
              <CurrentChart />
            </div>

            <div className="w-[300px] h-[300px] bg-[#E2F1FF] border border-gray-200 shadow rounded-lg p-4">
              <h1 className="text-base font-semibold text-gray-700 mb-2">
                About this Graph
              </h1>
              {/*Firs*/ }
              <p className="text-sm text-gray-600 mb-2">
                {currentData.split("\n")[0]}
              </p>

              {/* The rest as bullet list */}
              <ul className="list-disc list-inside text-sm text-gray-600">
                {currentData
                  .split("\n")
                  .slice(1)
                  .map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
