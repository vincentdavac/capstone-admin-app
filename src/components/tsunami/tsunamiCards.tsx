import { useEffect, useRef } from "react";
import * as echarts from "echarts";

const Cards = () => {
  const gaugeRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);
  const WaterPressure = useRef<HTMLDivElement>(null);
  const windSpeed = useRef<HTMLDivElement>(null);
  const AirTemperature = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const charts: echarts.ECharts[] = [];
    if (AirTemperature.current) {
      const AirTemperatureGauge = echarts.init(AirTemperature.current);
      AirTemperatureGauge.setOption({
        series: [
          {
            type: "gauge",
            center: ["50%", "65%"],
            radius: "80%",
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 60,
            splitNumber: 6,
            itemStyle: {
              color: "#FFAB91",
            },
            progress: {
              show: true,
              width: 12,
            },
            pointer: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                width: 12,
              },
            },
            axisTick: {
              distance: -20,
              splitNumber: 5,
              lineStyle: {
                width: 1,
                color: "#999",
              },
            },
            splitLine: {
              distance: -24,
              length: 6,
              lineStyle: {
                width: 1.5,
                color: "#999",
              },
            },
            axisLabel: {
              distance: -12,
              color: "#999",
              fontSize: 10,
            },
            anchor: {
              show: false,
            },
            title: {
              show: false,
            },
            detail: {
              valueAnimation: true,
              offsetCenter: [0, "-5%"],
              fontSize: 14,
              fontWeight: "bold",
              formatter: "{value} °C",
              color: "#FF6B35",
            },
            data: [
              {
                value: 28.5,
              },
            ],
          },
          {
            type: "gauge",
            center: ["50%", "65%"],
            radius: "80%",
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 60,
            itemStyle: {
              color: "#FD7347",
            },
            progress: {
              show: true,
              width: 4,
            },
            pointer: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            detail: {
              show: false,
            },
            data: [
              {
                value: 28.5,
              },
            ],
          },
        ],
      });

      const handleResize = () => {
        if (!AirTemperature.current) return;
        AirTemperatureGauge.resize();
      };

      window.addEventListener("resize", handleResize);
      charts.push(AirTemperatureGauge);
    }

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

    if (WaterPressure.current) {
      const WatergaugeChart = echarts.init(WaterPressure.current);
      WatergaugeChart.setOption({
        series: [
          {
            type: "gauge",
            min: 0,
            max: 100,
            splitNumber: 10,
            radius: "75%",
            center: ["50%", "60%"],
            axisLine: {
              lineStyle: {
                color: [[1, "#f00"]],
                width: 1,
              },
            },
            splitLine: {
              distance: -12,
              length: 10,
              lineStyle: {
                color: "#f00",
                width: 1,
              },
            },
            axisTick: {
              // haba ng mga galamay sa gauge
              distance: -5,
              length: 5,
              lineStyle: {
                color: "#f00",
              },
            },
            axisLabel: {
              // label ng mga kamay
              distance: -21,
              color: "#f00",
              fontSize: 8,
            },
            anchor: {
              show: true,
              size: 12,
              itemStyle: {
                borderColor: "#000",
                borderWidth: 1,
              },
            },
            pointer: {
              offsetCenter: [0, "10%"],
              icon: "path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z",
              length: "80%",
              itemStyle: {
                color: "#000",
              },
            },
            detail: {
              valueAnimation: true,
              precision: 1,
              fontSize: 12,
              offsetCenter: [0, "70%"],
              color: "#000",
              fontWeight: "bold",
              formatter: function (value: number) {
                return value.toFixed(1) + "m";
              },
            },
            title: {
              offsetCenter: [0, "-30%"],
              fontSize: 5,
              color: "#666",
            },
            data: [
              {
                value: 58.46,
                name: "Water Level",
              },
            ],
          },
          {
            type: "gauge",
            min: 0,
            max: 60,
            splitNumber: 6,
            radius: "68%",
            center: ["50%", "60%"],
            axisLine: {
              lineStyle: {
                color: [[1, "#000"]],
                width: 1,
              },
            },
            splitLine: {
              distance: -2,
              length: 12,
              lineStyle: {
                color: "#000",
                width: 1,
              },
            },
            axisTick: {
              distance: 0,
              length: 6,
              lineStyle: {
                color: "#000",
              },
            },
            axisLabel: {
              distance: 1,
              fontSize: 8,
              color: "#000",
            },
            pointer: {
              show: false,
            },
            title: {
              show: false,
            },
            detail: {
              show: false,
            },
            anchor: {
              show: true,
              size: 8,
              itemStyle: {
                color: "#000",
              },
            },
            data: [],
          },
        ],
      });

      const handleResize = () => {
        if (!WaterPressure.current) return;
        WatergaugeChart.resize();
      };

      window.addEventListener("resize", handleResize);
      charts.push(WatergaugeChart);
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
                  [1 / 3, "#7CFFB2"], // 0–1m Green
                  [2 / 3, "#FDDD60"], // 1–2m Yellow
                  [2.5 / 3, "#FF9F40"], // 2–2.5m Orange
                  [1, "#ff1100ff"], // 2.5–3m Red
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
    // if (waveRef.current) {
    //   const waveChart = echarts.init(waveRef.current);

    //   waveChart.setOption({
    //     title: {
    //       text: "Wave Height (meters)",
    //       textStyle: {
    //         fontSize: 10,
    //         fontWeight: "normal",
    //         color: "#374151",
    //       },
    //       left: "center",
    //       top: 5,
    //     },
    //     xAxis: {
    //       type: "category",
    //       boundaryGap: false,
    //       data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    //       axisLabel: {
    //         fontSize: 8,
    //         color: "#6b7280",
    //       },
    //     },
    //     yAxis: {
    //       type: "value",
    //       axisLabel: {
    //         fontSize: 8,
    //         formatter: "{value}m",
    //         color: "#6b7280",
    //       },
    //     },
    //     series: [
    //       {
    //         data: [1, 2, 3, 4, 7, 5, 6],
    //         type: "line",
    //         areaStyle: {
    //           color: "rgba(59, 130, 246, 0.3)",
    //         },
    //         itemStyle: {
    //           color: "#3b82f6",
    //         },
    //         lineStyle: {
    //           color: "#3b82f6",
    //         },
    //       },
    //     ],
    //     grid: {
    //       top: 30,
    //       left: 25,
    //       right: 15,
    //       bottom: 20,
    //     },
    //   });

    //   charts.push(waveChart);
    // }
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3 sm:gap-0">
        <input
          type="text"
          placeholder="Search Buoy ID..."
          className="border rounded-lg px-3 py-2 w-full sm:w-60 lg:w-[946px] border-[#D9D9D9]h-12 sm:h-[61px] text-sm sm:text-base
       focus:ring-[#D9D9D9] focus:border-[#D9D9D9]"
        />
        <span className="text-gray-600 text-xs sm:text-sm lg:text-base font-medium text-center sm:text-right">
          REAL-TIME HAZARD STATUS OVERVIEW
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div
            className="border-2 border-[#D9D9D9]  rounded-sm h-64 sm:h-80 lg:h-[580px]"
            // ref={WaterPressure}
          ></div>
          <div className="border-2 border-[#D9D9D9]  rounded-sm h-48 sm:h-56 lg:h-[245px] mt-3"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
          <div className="border-2 border-[#D9D9D9] w-[495px] rounded-sm h-20 sm:h-28 lg:h-[217px]  flex flex-col items-center justify-center">
            <p className="text-xs sm:text-sm lg:text-base font-medium text-gray-700 mb-1">
              Water Level (m)
            </p>
            <div ref={gaugeRef} className="w-full h-full" />
          </div>
          {/* <div
            ref={waveRef}
            className="border-2 border-[#D9D9D9] rounded-sm h-20 sm:h-28 lg:h-[173px] w-full"
          /> */}

          {/* <div className="border-2 border-[#D9D9D9] rounded-sm h-20 sm:h-28 lg:h-[173px] w-full flex flex-col items-center justify-center">
            <p className="text-xs sm:text-sm lg:text-base font-medium text-gray-700 mb-1">
              Water Level (m)
            </p>
            <div ref={WaterPressure} className="w-full h-full mb-2" />
          </div>
          <div className="border-2 border-[#D9D9D9] rounded-sm h-20 sm:h-28 lg:h-[173px] w-full flex flex-col items-center justify-center">
            <p className="text-xs sm:text-sm lg:text-base font-medium text-gray-700 mb-1">
              Wind Speed km/h
            </p>
            <div ref={windSpeed} className="w-full h-full mb-2" />
          </div>
          <div className="border-2 border-[#D9D9D9] rounded-sm h-20 sm:h-28 lg:h-[173px] w-full flex flex-col items-center justify-center">
            <p className="text-xs sm:text-sm lg:text-base font-medium text-gray-700 mb-1">
              Wind Speed km/h
            </p>
            <div ref={AirTemperature} className="w-full h-full mb-2" />
          </div>
          <div className="border-2 border-[#D9D9D9] rounded-sm h-20 sm:h-28 lg:h-[173px] grid place-items-start justify-center">
            <p className="text-xs sm:text-sm lg:text-base font-medium text-gray-700 mt-2">
              Wind Speed (km/h)
            </p>
          </div>
          <div className="border-2 border-[#D9D9D9] rounded-sm h-20 sm:h-28 lg:h-[173px] grid place-items-start justify-center">
            <p className="text-xs sm:text-sm lg:text-base font-medium text-gray-700 mt-2">
              Wind Speed (km/h)
            </p>
          </div>
          <div className="border-2 border-[#D9D9D9] rounded-sm h-20 sm:h-28 lg:h-[173px] grid place-items-start justify-center">
            <p className="text-xs sm:text-sm lg:text-base font-medium text-gray-700 mt-2">
              Wind Speed (km/h)
            </p>
          </div> */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2 border-2 border-[#D9D9D9] rounded-sm h-16 sm:h-20 lg:h-24"></div>
        </div>
      </div>

      <div className="lg:col-span-2 flex flex-col gap-4">
        <div className="w-[1480px] h-[407px] bg-white shadow rounded-xl border border-gray-300 p-4">
          <div className="w-full px-4 pt-4 text-left mt-2">
            <h1 className="text-lg font-semibold mb-3">TROPICAL CYCLONE MONITORING TABLE</h1>
          </div>
          <hr className="w-full border-t border-gray-300"/>
          <div className="w-[1409px] h-[262px] overflow-hidden border rounded-xl shadow-sm mt-10 ml-3">
            <table className="table-auto w-full h-full text-sm text-center border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2">
                    Sea Surface Temperature (°C / °F)
                  </th>
                  <th className="px-4 py-2">Humidity (%)</th>
                  <th className="px-4 py-2">Atmospheric Pressure (mbar)</th>
                  <th className="px-4 py-2">Water Pressure (mbar)</th>
                  <th className="px-4 py-2">Water Temperature (Surface)</th>
                  <th className="px-4 py-2">Air Temperature (C/F)</th>
                  <th className="px-4 py-2">Wave (Axis / Rotation)</th>
                  <th className="px-4 py-2">Wind Speed (km/h or m/s)</th>
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

      <div className="lg:col-span-2 flex flex-col gap-4">
        <div className="border-2 border-[#D9D9D9]  rounded-sm h-48 sm:h-56 lg:h-[616px] mt-8"></div>
      </div>
    </div>
  );
};
export default Cards;
