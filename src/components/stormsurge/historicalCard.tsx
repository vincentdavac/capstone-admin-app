import { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function HistoricalCards() {
  const waveRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const charts: echarts.ECharts[] = [];
    if (waveRef.current) {
      const waveChart = echarts.init(waveRef.current);

      waveChart.setOption({
        title: {
          text: "Wave Height (meters)",
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

    return () => {
      window.removeEventListener("resize", handleResize);
      charts.forEach((chart) => chart.dispose());
    };
  }, []);

  return (
    <div className="lg:col-span-2 flex flex-col">
      <div className="border-2 border-[#D9D9D9] w-[1480px] h-[616px] mt-8 rounded md:rounded-xl">
        <div className="w-full px-4 pt-4 text-left mt-7">
          <h1 className="text-lg font-semibold mb-3">HISTORICAL DATA</h1>
        </div>
        <hr className="w-full border-t border-gray-300" />
        <div className="flex justify-center pt-5">
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 bg-blue-500 text-white  hover:bg-blue-700 rounded-full">
              Water Level
            </button>
            <button className="px-4 py-2 bg-white text-black  rounded-full border border-blue-700">
              Sea Surface Temp
            </button>
            <button className="px-4 py-2 bg-white text-black rounded-full border border-blue-700">
              Water Pressure
            </button>
            <button className="px-4 py-2 bg-white text-black rounded-full border border-blue-700">
              Atmospheric Pressure
            </button>
            <button className="px-4 py-2 bg-white text-black rounded-full border border-blue-700">
              Wave Height
            </button>
            <button className="px-4 py-2 bg-white text-black rounded-full border border-blue-700">
              Water Depth
            </button>
            <button className="px-4 py-2 bg-white text-black rounded-full border border-blue-700">
              Water Temp
            </button>
            <button className="px-4 py-2 bg-white text-black rounded-full border border-blue-700">
              Wind Speed
            </button>
            <button className="px-4 py-2 bg-white text-black rounded-full border border-blue-700">
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
            <div
              ref={waveRef}
              className="border-2 border-[#D9D9D9] rounded-sm h-[250px] flex-1"
            />

            <div className="w-[300px] bg-[#E2F1FF] border border-gray-200 shadow rounded-lg p-4">
              <h1 className="text-base font-semibold text-gray-700 mb-2">
                About this Graph
              </h1>
              <p className="text-sm text-gray-600">
                Water Level tracks sea/river height. Peaks align with high tides, storm surges, or heavy rain runoff.<br></br>
                <br></br>
                Unit: meters (m)<br></br>
                Normal: 0.8–2.0 m<br></br>
                Watch:  2.5 m (possible flooding)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

