import { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function MapsWithHazard() {
  const gaugeRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);
  const windSpeed = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const charts: echarts.ECharts[] = [];
    if (windSpeed.current) {
      const windSpeedGauge = echarts.init(windSpeed.current);
      windSpeedGauge.setOption({
        series: [
          {
            type: "gauge",
            radius: "110%",
            center: ["50%", "60%"],
            progress: {
              show: true,
              width: 12,
            },
            axisLine: {
              lineStyle: {
                width: 12,
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              distance: 0,
              length: 5,
              lineStyle: {
                color: "#000",
                width: 1,
              },
            },
            axisLabel: {
              distance: 15,
              fontSize: 8,
              color: "#000",
            },
            anchor: {
              show: true,
              showAbove: true,
              size: 8,
              itemStyle: {
                borderWidth: 3,
              },
            },
            title: {
              show: false,
            },
            detail: {
              valueAnimation: true,
              fontSize: 13,
              offsetCenter: [0, "60%"],
              formatter: function (value: number) {
                return value.toFixed(0) + "km/h";
              },
            },
            data: [
              {
                value: 70,
              },
            ],
          },
        ],
      });

      const handleResize = () => {
        if (!windSpeed.current) return;
        windSpeedGauge.resize();
      };

      window.addEventListener("resize", handleResize);
      charts.push(windSpeedGauge);
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
    if (gaugeRef.current) {
      const gaugeChart = echarts.init(gaugeRef.current);

      gaugeChart.setOption({
        series: [
          {
            type: "gauge",
            startAngle: 180,
            endAngle: 0,
            center: ["50%", "93%"],
            radius: "170%",
            min: 0,
            max: 3,
            splitNumber: 6,
            axisLine: {
              lineStyle: {
                width: 6,
                color: [
                  [1 / 3, "#7CFFB2"],
                  [2 / 3, "#FDDD60"],
                  [2.5 / 3, "#FF9F40"],
                  [1, "#ff1100ff"],
                ],
              },
            },

            pointer: {
              icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
              length: "10%",
              width: 14,
              offsetCenter: [0, "-45%"],
              itemStyle: {
                color: "auto",
              },
            },

            axisTick: {
              length: 8,
              lineStyle: {
                color: "auto",
                width: 1.5,
              },
            },

            splitLine: {
              length: 12,
              lineStyle: {
                color: "auto",
                width: 3,
              },
            },

            axisLabel: {
              color: "#464646",
              fontSize: 12,
              distance: -30,
              rotate: "tangential",
              formatter: function (value: number) {
                return value + "m";
              },
            },

            title: {
              offsetCenter: [0, "-5%"],
              fontSize: 10,
            },

            detail: {
              fontSize: 16,
              fontWeight: "bold",
              offsetCenter: [0, "-25%"],
              valueAnimation: true,
              formatter: function (value: number) {
                return value.toFixed(2) + " m";
              },
              color: "inherit",
            },

            data: [
              {
                value: 1,
                name: "Water Level",
              },
            ],
          },
        ],
      });

      charts.push(gaugeChart);
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 flex flex-col gap-4">
        <div className="border-2 border-[#D9D9D9] rounded-sm h-64 sm:h-80 lg:h-[580px] w-[946px]">
          
        </div>
        <div className="border-2 border-[#D9D9D9] mb-4 h-48 sm:h-56 lg:h-[250px] w-[946px] rounded md:rounded-xl">
          <div className="w-full px-4 flex items-center h-16">
            <h1 className="text-lg font-semibold">DATA REGARDING THE MAP</h1>
          </div>
          <hr className="w-full border-t border-gray-300" />
          <div className="px-4 py-4">
            <p className=" text-[#6C757D] ">
            The Tropical Cyclone map tracks each storm by its name, location (longitude and latitude), category, wind speed, pressure, direction, and last update. For instance, Cyclone Alpha at 125.5°E, 14.2°N is a Category 3 storm with 150 km/h winds and 965 hPa pressure, moving NW, last updated at 08:00. Cyclone Beta at 130.1°E, 16.8°N is Category 2 with 120 km/h winds and 980 hPa pressure, heading W, updated at 09:00. Cyclone Gamma at 128.3°E, 12.5°N is Category 1 with 90 km/h winds and 995 hPa pressure, moving NE, last recorded at 07:30.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 overflow-x-hidden overflow-y-auto scrollbar-hide h-[825px] no-scrollbar">
        <div className="flex-shrink-0">
          <div className="border-2 border-[#D9D9D9] w-full rounded-sm h-20 sm:h-28 lg:h-[217px] flex flex-col items-center justify-center">
            <p className="text-xs sm:text-sm lg:text-base font-medium text-gray-700 mb-1">
              Water Level (m)
            </p>
            <div ref={gaugeRef} className="w-full h-full" />
          </div>
          <div className="w-full text-center mt-2 text-sm text-gray-600 p-4">
            Sample Sentence
          </div>
        </div>

        <div className="flex-shrink-0">
          <div className="border-2 border-[#D9D9D9] w-full rounded-sm h-20 sm:h-28 lg:h-[217px] flex flex-col items-center justify-center">
            <p className="text-xs sm:text-sm lg:text-base font-medium text-gray-700 mb-1">
              Wave Height (ft)
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
             Wind Speed (km/h)
            </p>
            <div ref={windSpeed} className="w-full h-full" />
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
  );
}
