import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import Icons from "../../components/dashboard_content/icons";
import { useState } from "react";
import chart from "../../components/tsunami/chart";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Graph {
  [key: string]: string;
}

const aboutGraph: Graph = {
  magnitude:
    "Magnitude (Mw) shows earthquake strength. Peaks indicate stronger seismic events. \nUnit: Mw \nLow: 1-3 Mw \nModerate: 4-6 Mw \nStrong: > 6 Mw",
};

const Cards = () => {
  const [current, setData] = useState("magnitude");
  const currentData = aboutGraph[current];
  const CurrentChart = chart[current];
  const waveRef = useRef<HTMLDivElement>(null);
  const WaveHeight = useRef<HTMLDivElement>(null);
    useEffect(() => { 
      // Initialize map
      //14.653700482338781, 120.99474052545784
      const map = L.map("map").setView([14.653700482338781,120.99474052545784], 12);
  
      // Add OpenStreetMap tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
  
      // Add a marker in Manila
      L.marker([14.653700482338781, 120.99474052545784])
        .addTo(map)
        .bindPopup("<b>Caloocan</b><br />Philippines")
        .openPopup();
  
      // Cleanup on unmount
      return () => {
        map.remove();
      };
    }, []);
  useEffect(() => {
    const charts: echarts.ECharts[] = [];
    if (WaveHeight.current) {
      const WaveHeightChart = echarts.init(WaveHeight.current);

      WaveHeightChart.setOption({
        title: {
          textStyle: {
            fontSize: 10,
            fontWeight: "normal",
            color: "#374151",
          },
          left: "center",
          top: 5,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept"],
          axisLabel: {
            fontSize: 8,
            color: "#6b7280",
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            fontSize: 8,
            formatter: "{value}m",
            color: "#6b7280",
          },
        },
        series: [
          {
            data: [1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4],
            type: "line",
            areaStyle: {
              color: "rgba(59, 130, 246, 0.3)",
            },
            itemStyle: {
              color: "#3b82f6",
            },
            lineStyle: {
              color: "#3b82f6",
            },
          },
        ],
        grid: {
          top: 30,
          left: 25,
          right: 15,
          bottom: 20,
        },
      });
      charts.push(WaveHeightChart);
    }

    if (waveRef.current) {
      const waveChart = echarts.init(waveRef.current);

      waveChart.setOption({
        title: {
          textStyle: {
            fontSize: 10,
            fontWeight: "normal",
            color: "#374151",
          },
          left: "center",
          top: 5,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept"],
          axisLabel: {
            fontSize: 8,
            color: "#6b7280",
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            fontSize: 8,
            formatter: "{value}m",
            color: "#6b7280",
          },
        },
        series: [
          {
            data: [1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4],
            type: "line",
            areaStyle: {
              color: "rgba(59, 130, 246, 0.3)",
            },
            itemStyle: {
              color: "#3b82f6",
            },
            lineStyle: {
              color: "#3b82f6",
            },
          },
        ],
        grid: {
          top: 30,
          left: 25,
          right: 15,
          bottom: 20,
        },
      });
      charts.push(waveChart);
    }
    const handleResize = () => {
      charts.forEach((chart) => chart.resize());
    };

    window.addEventListener("resize", handleResize);

    // Cleanup both charts
    return () => {
      window.removeEventListener("resize", handleResize);
      charts.forEach((chart) => chart.dispose());
    };
  }, []);
  return (
    <div className="p-2 sm:p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center mb-4 gap-3 sm:gap-45">
        <div className="relative w-full sm:w-60 lg:w-[946px]">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-[999]">
            <Icons name="search" className="w-5 h-5 text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Search Buoy ID..."
            className="border rounded-lg pl-10 pr-3 py-2 w-full border-[#D9D9D9] h-12 sm:h-[61px] text-sm sm:text-base focus:ring-[#D9D9D9] focus:border-[#D9D9D9]"
          />
        </div>
        <span className="text-gray-600 text-xs sm:text-sm lg:text-base font-medium">
          REAL-TIME HAZARD STATUS OVERVIEW
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="border-2 border-[#D9D9D9] rounded-sm h-64 sm:h-80 lg:h-[580px] w-[946px]">
            <div id="map" className="w-full h-full rounded-xl" />
          </div>
          <div className="border-2 border-[#D9D9D9] mb-4 h-48 sm:h-56 lg:h-[250px] w-[946px] rounded md:rounded-xl">
            <div className="w-full px-4 flex items-center h-16">
              <h1 className="text-lg font-semibold">DATA REGARDING THE MAP</h1>
            </div>
            <hr className="w-full border-t border-gray-300" />
            <div className="px-4 py-4">
              <p className=" text-[#6C757D] ">
                The Tsunami map displays each event with its magnitude,
                estimated wave height, central pressure, water pressure, and
                last update. For example, a magnitude 7.0 earthquake generates
                an estimated wave height of 1.95 meters, with central pressure
                at 100.5 hPa and water pressure of 41.99 hPa, last recorded at
                08:00. A smaller magnitude 5.0 event produces a 0.90-meter wave,
                central pressure of 100.5 hPa, and water pressure of 9.05 hPa,
                updated at 09:15. Larger events like magnitude 8.0 can cause
                waves up to 9.05 meters, illustrating the critical need for
                real-time monitoring and early alerts.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 overflow-x-hidden overflow-y-auto scrollbar-hide h-[825px] no-scrollbar">
          <div className="flex-shrink-0">
            <div className="border-2 border-[#D9D9D9] w-full rounded-sm h-20 sm:h-28 lg:h-[217px] flex flex-col items-center justify-center">
              <p className="text-xs sm:text-sm lg:text-base font-medium text-gray-700 mb-1">
                Water Level
              </p>
              <div ref={waveRef} className="w-full h-full" />
            </div>
            <div className="w-full text-center mt-2 text-sm text-gray-600 p-4">
              Sample Sentence
            </div>
          </div>

          <div className="flex-shrink-0">
            <div className="border-2 border-[#D9D9D9] w-full rounded-sm h-20 sm:h-28 lg:h-[217px] flex flex-col items-center justify-center">
              <p className="text-xs sm:text-sm lg:text-base font-medium text-gray-700 mb-1">
                Wave Height (meters / feet)
              </p>
              <div ref={WaveHeight} className="w-full h-full" />
            </div>
            <div className="w-full text-center mt-2 text-sm text-gray-600 p-4">
              Sample Sentence
            </div>
          </div>

          <div className="flex-shrink-0">
            <div className="border-2 border-[#D9D9D9] w-full rounded-sm h-20 sm:h-28 lg:h-[217px] flex flex-col items-center justify-center">
              <p className="text-xs sm:text-sm lg:text-base font-medium text-gray-700 mb-1">
                Water Level (m)
              </p>
            </div>
            <div className="w-full text-center mt-2 text-sm text-gray-600 p-4">
              Sample Sentence
            </div>
          </div>

          <div className="flex-shrink-0">
            <div className="border-2 border-[#D9D9D9] w-full rounded-sm h-20 sm:h-28 lg:h-[217px] flex flex-col items-center justify-center">
              <p className="text-xs sm:text-sm lg:text-base font-medium text-gray-700 mb-1">
                Water Level (m)
              </p>
            </div>
            <div className="w-full text-center mt-2 text-sm text-gray-600 p-4">
              Sample Sentence
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 flex flex-col gap-4">
        <div className="w-[1480px] h-[407px] bg-white shadow rounded-xl border border-gray-300 p-4">
          <div className="w-full px-4 pt-4 text-left mt-2">
            <h1 className="text-lg font-semibold mb-3">
              TROPICAL CYCLONE MONITORING TABLE
            </h1>
          </div>
          <hr className="w-full border-t border-gray-300" />
          <div className="w-[1409px] h-[262px] overflow-hidden border rounded-xl shadow-sm mt-10 ml-3">
            <table className="table-auto w-full h-full text-sm text-center border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2">
                    Sea Surface Temperature (°C / °F)
                  </th>
                  <th className="px-4 py-2">Magnitude (Mw)</th>
                  <th className="px-4 py-2">Time (Sec/Min)</th>
                  <th className="px-4 py-2">Water Level (m)</th>
                  <th className="px-4 py-2">Wave (Axis / Rotation)</th>
                  <th className="px-4 py-2">Wave Height (meters/ft)</th>
                  <th className="px-4 py-2">Danger Level</th>

                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-2">test</td>
                  <td className="px-4 py-2">test</td>
                  <td className="px-4 py-2">test</td>
                  <td className="px-4 py-2">test</td>
                  <td className="px-4 py-2">test</td>
                  <td className="px-4 py-2">test</td>
                  <td className="px-4 py-2">test</td>

                  <td className="px-4 py-2">
                    <span className="w-4 h-4 aspect-square rounded-full inline-block bg-blue-400"></span>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">test</td>
                  <td className="px-4 py-2">test</td>
                  <td className="px-4 py-2">test</td>
                  <td className="px-4 py-2">test</td>
                  <td className="px-4 py-2">test</td>
                  <td className="px-4 py-2">test</td>
                  <td className="px-4 py-2">test</td>

                  <td className="px-4 py-2">
                    <span className="w-4 h-4 aspect-square rounded-full inline-block bg-yellow-400"></span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 flex flex-col">
        <div className="border-2 border-[#D9D9D9] w-[1480px] h-[616px] mt-8 rounded md:rounded-xl">
          <div className="w-full px-4 flex items-center h-16">
            <h1 className="text-lg font-semibold">HISTORICAL DATA</h1>
          </div>
          <hr className="w-full border-t border-gray-300" />
          <div className="flex justify-self-start pt-5 ml-10">
            <div className="flex flex-wrap gap-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-700 rounded-full"
                onClick={() => setData("magnitude")}
              >
                Magnitude
              </button>

              <button
                className="px-4 py-2 bg-white text-black  rounded-full border border-blue-700"
                //   onClick={() => setData("SST")}
              >
                Time
              </button>
              <button className="px-4 py-2 bg-white text-black rounded-full border border-blue-700">
                Water Level
              </button>
              <button className="px-4 py-2 bg-white text-black rounded-full border border-blue-700">
                Wave Axis
              </button>
              <button className="px-4 py-2 bg-white text-black rounded-full border border-blue-700">
                Wave Height
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
              <div className="border-2 border-[#D9D9D9] rounded-sm h-[300px] flex-1">
                <CurrentChart />
              </div>

              <div className="w-[300px] h-[300px] bg-[#E2F1FF] border border-gray-200 shadow rounded-lg p-4">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cards;
