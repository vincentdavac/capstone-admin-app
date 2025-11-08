import { useEffect, useRef, useState } from "react";

import * as echarts from "echarts";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ref, onValue } from "firebase/database";
import { database } from "../../firebaseCredentials/firebase";

export default function MapsWithHazard() {
  const [sstData, setSST] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [percentage, setPercentage] = useState(0);
  const gaugeRef = useRef(null);
  const humidityRef = useRef<HTMLDivElement | null>(null);
  const windSpeed = useRef(null);
  const atmosphericPressure = useRef(null);
  const waterLevel = useRef(null);
  const waterTemperature = useRef(null);
  const waterPressure = useRef(null);
  const rainGauge = useRef(null);

  useEffect(() => {
    const sstRef = ref(
      database,
      "BME280/SURROUNDING_TEMPERATURE"
    );

    const unsubscribe = onValue(
      sstRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const val = snapshot.val();
          setSST(val);
          console.log("Live data from Firebase:", val);
        } else {
          setSST(0);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const humidityDBRef = ref(database, "BME280/HUMIDITY");

    const unsubscribe = onValue(humidityDBRef, (snapshot) => {
      if (snapshot.exists()) {
        const val = Number(snapshot.val());
        console.log("humidity", val);

        setPercentage(isNaN(val) ? 0 : val);
      } else {
        setPercentage(0);
      }
    });

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    //  14.642250839841605, 120.93873906253934
    const map = L.map("map").setView(
      [14.642250839841605, 120.93873906253934],
      12
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([14.642250839841605, 120.93873906253934])
      .addTo(map)
      .bindPopup("<b>Coastal</b>")
      .openPopup();
    return () => {
      map.remove();
    };
  }, []);
  useEffect(() => {
    const charts: echarts.ECharts[] = [];
    const unsubscribers: (() => void)[] = [];
    if (humidityRef.current) {
      const container = humidityRef.current;
      const fillY = 15 + (170 - (percentage / 100) * 170);
      container.innerHTML = `
      <svg viewBox="0 0 200 200" style="width:100%;height:100%;max-width:200px;max-height:200px;margin:0 auto;">
        <defs>
          <clipPath id="circleClip"><circle cx="100" cy="100" r="85" /></clipPath>
          <pattern id="wave" x="0" y="0" width="400" height="200" patternUnits="userSpaceOnUse">
            <path d="M0,50 Q50,35 100,50 T200,50 T300,50 T400,50 V200 H0 Z" fill="#3b82f6" opacity="0.85">
              <animateTransform attributeName="transform" type="translate" from="0,0" to="-200,0" dur="3s" repeatCount="indefinite" />
            </path>
          </pattern>
        </defs>
        <circle cx="100" cy="100" r="90" fill="none" stroke="#3b82f6" stroke-width="5" />
        <circle cx="100" cy="100" r="85" fill="#f0f9ff" />
        <g clip-path="url(#circleClip)">
          <rect x="0" y="${fillY}" width="200" height="200" fill="url(#wave)">
            <animate attributeName="y" from="200" to="${fillY}" dur="2s" fill="freeze" />
          </rect>
        </g>
        <text x="100" y="112" text-anchor="middle" font-size="46" font-weight="bold" fill="#ffffff" style="text-shadow:0 2px 4px rgba(0,0,0,0.3)">
          ${percentage.toFixed(0)}%
        </text>
      </svg>`;
    }

    if (windSpeed.current) {
      const windSpeedGauge = echarts.init(windSpeed.current);
      windSpeedGauge.setOption({
        series: [
          {
            type: "gauge",
            radius: "110%",
            center: ["50%", "60%"],
            max: 185,
            progress: { show: true, width: 12 },
            axisLine: { lineStyle: { width: 12 } },
            axisTick: { show: false },
            splitLine: {
              distance: 0,
              length: 5,
              lineStyle: { color: "#000", width: 1 },
            },
            axisLabel: { distance: 15, fontSize: 8, color: "#000" },
            anchor: {
              show: true,
              showAbove: true,
              size: 8,
              itemStyle: { borderWidth: 3 },
            },
            title: { show: false },
            detail: {
              valueAnimation: true,
              fontSize: 13,
              offsetCenter: [0, "60%"],
              formatter: (value: number) => value.toFixed(0) + "km/h",
            },
            data: [{ value: 70 }],
          },
        ],
      });
      charts.push(windSpeedGauge);

      const unsubscribe = onValue(
        ref(database, "ANEMOMETER/WIND_SPEED_km_h"),
        (snapshot) => {
          if (snapshot.exists()) {
            const val = snapshot.val();
            windSpeedGauge.setOption({
              series: [{ data: [{ value: val }] }],
            });
          }
        }
      );
      unsubscribers.push(unsubscribe);
    }

    if (gaugeRef.current) {
      const gaugeChart = echarts.init(gaugeRef.current);
      const dynamicMax = sstData > 0 ? sstData * 1.2 : 3;
      gaugeChart.setOption({
        series: [
          {
            type: "gauge",
            startAngle: 180,
            endAngle: 0,
            center: ["50%", "75%"],
            radius: "110%",
            min: 0,
            max: dynamicMax,
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
              itemStyle: { color: "auto" },
            },
            axisTick: { length: 8, lineStyle: { color: "auto", width: 1.5 } },
            splitLine: { length: 12, lineStyle: { color: "auto", width: 3 } },
            axisLabel: {
              color: "#464646",
              fontSize: 10,
              distance: -30,
              rotate: "tangential",
              formatter: (value: number) => value + "°C",
            },
            detail: {
              fontSize: 13,
              fontWeight: "bold",
              offsetCenter: [0, "-25%"],
              valueAnimation: true,
              formatter: (value: number) => value.toFixed(2) + " °C",
              color: "inherit",
            },
            data: [{ value: 0 }],
          },
        ],
      });
      charts.push(gaugeChart);

      const unsubscribe = onValue(
        ref(database, "BME280/SURROUNDING_TEMPERATURE"),
        (snapshot) => {
          if (snapshot.exists()) {
            const val = snapshot.val();
            gaugeChart.setOption({
              series: [{ data: [{ value: val, name: "Surrounding Temp" }] }],
            });
          }
        }
      );
      unsubscribers.push(unsubscribe);
    }
    if (atmosphericPressure.current) {
      const pressureGauge = echarts.init(atmosphericPressure.current);
      pressureGauge.setOption({
        series: [
          {
            type: "gauge",
            radius: "110%",
            center: ["50%", "60%"],
            min: 0,
            max: 1000,
            progress: {
              show: true,
              width: 12,
              itemStyle: {
                color: "#58D9F9",
              },
            },
            axisLine: { lineStyle: { width: 12 } },
            axisTick: { show: false },
            splitLine: {
              distance: 0,
              length: 5,
              lineStyle: { color: "#000", width: 1 },
            },
            axisLabel: { distance: 15, fontSize: 8, color: "#000" },
            anchor: {
              show: true,
              showAbove: true,
              size: 8,
              itemStyle: { borderWidth: 3 },
            },
            title: { show: false },
            detail: {
              valueAnimation: true,
              fontSize: 13,
              offsetCenter: [0, "60%"],
              formatter: (value: number) => value.toFixed(1) + " hPa",
            },
            data: [{ value: 0 }],
          },
        ],
      });
      charts.push(pressureGauge);
      const unsubscribe = onValue(
        ref(database, "BME280/ATMOSPHERIC_PRESSURE"),
        (snapshot) => {
          if (snapshot.exists()) {
            const val = snapshot.val();
            pressureGauge.setOption({
              series: [{ data: [{ value: val }] }],
            });
          }
        }
      );
      unsubscribers.push(unsubscribe);
    }
    if (waterLevel.current) {
      const levelGauge = echarts.init(waterLevel.current);
      levelGauge.setOption({
        series: [
          {
            type: "gauge",
            center: ["50%", "55%"],
            radius: "110%",
            min: 1,
            max: 13.5,
            axisLine: {
              lineStyle: {
                width: 10,
                color: [
                  [0.3, "#67e0e3"],
                  [0.7, "#37a2da"],
                  [1, "#fd666d"],
                ],
              },
            },
            pointer: {
              itemStyle: {
                color: "auto",
              },
            },
            axisTick: {
              distance: -20,
              length: 6,
              lineStyle: {
                color: "#fff",
                width: 2,
              },
            },
            splitLine: {
              distance: -33,
              length: 20,
              lineStyle: {
                color: "#fff",
                width: 3,
              },
            },
            axisLabel: {
              color: "inherit",
              distance: 25,
              fontSize: 12,
            },
            detail: {
              valueAnimation: true,
              formatter: "{value} m",
              color: "inherit",
              fontSize: 12,
              offsetCenter: [0, "50%"],
            },
            data: [
              {
                value: 0,
              },
            ],
          },
        ],
      });
      charts.push(levelGauge);
      const unsubscribe = onValue(
        ref(database, "MS5837/WATER_LEVEL_METER"),
        (snapshot) => {
          if (snapshot.exists()) {
            const val = snapshot.val();
            levelGauge.setOption({
              series: [{ data: [{ value: val }] }],
            });
          }
        }
      );
      unsubscribers.push(unsubscribe);
    }
    if (waterTemperature.current) {
      const tempGauge = echarts.init(waterTemperature.current);
      tempGauge.setOption({
        tooltip: {
          formatter: "{a} <br/>{b} : {c}°C",
        },
        series: [
          {
            name: "Temperature",
            type: "gauge",
            center: ["50%", "55%"],
            radius: "110%",
            min: 0,
            max: 50,
            axisLine: {
              lineStyle: {
                width: 10,
              },
            },
            axisTick: {
              distance: -10,
              length: 5,
              lineStyle: {
                color: "#fff",
                width: 1,
              },
            },
            splitLine: {
              distance: -10,
              length: 15,
              lineStyle: {
                color: "#fff",
                width: 2,
              },
            },
            axisLabel: {
              distance: 20,
              fontSize: 10,
            },
            detail: {
              valueAnimation: true,
              formatter: "{value}°C",
              fontSize: 15,
              offsetCenter: [0, "60%"],
            },
            data: [
              {
                value: 0,
              },
            ],
          },
        ],
      });
      charts.push(tempGauge);
      const unsubscribe = onValue(
        ref(database, "MS5837/WATER_TEMPERATURE"),
        (snapshot) => {
          if (snapshot.exists()) {
            const val = snapshot.val();
            tempGauge.setOption({
              series: [{ data: [{ value: val }] }],
            });
          }
        }
      );
      unsubscribers.push(unsubscribe);
    }
    if (waterPressure.current) {
      const pressureGauge = echarts.init(waterPressure.current);
      pressureGauge.setOption({
        tooltip: {
          formatter: "{a} <br/>{b} : {c} hPa",
        },
        series: [
          {
            name: "Pressure",
            type: "gauge",
            center: ["50%", "55%"],
            radius: "110%",
            min: 10,
            max: 300,
            splitNumber: 10,
            axisLine: {
              lineStyle: {
                width: 10,
                color: [
                  [0.31, "#D3D3D3"], 
                  [0.655, "#37a2da"], 
                  [1, "#fd666d"],
                ],
              },
            },
            pointer: {
              itemStyle: {
                color: "auto",
              },
            },
            axisTick: {
              distance: -10,
              length: 5,
              lineStyle: {
                color: "#fff",
                width: 1,
              },
            },
            splitLine: {
              distance: -10,
              length: 15,
              lineStyle: {
                color: "#fff",
                width: 2,
              },
            },
            axisLabel: {
              color: "inherit",
              distance: 20,
              fontSize: 10,
            },
            detail: {
              valueAnimation: true,
              formatter: "{value} hPa",
              fontSize: 15,
              color: "inherit",
              offsetCenter: [0, "60%"],
            },
            data: [
              {
                value: 150,
              },
            ],
          },
        ],
      });
      charts.push(pressureGauge);
      const unsubscribe = onValue(
        ref(database, "MS5837/WATER_PRESSURE"),
        (snapshot) => {
          if (snapshot.exists()) {
            const val = snapshot.val();
            pressureGauge.setOption({
              series: [{ data: [{ value: val }] }],
            });
          }
        }
      );
      unsubscribers.push(unsubscribe);
    }
    if (rainGauge.current) {
      const rainGaugeChart = echarts.init(rainGauge.current);
      rainGaugeChart.setOption({
        tooltip: {
          formatter: "{a} <br/>{b} : {c} mm",
        },
        series: [
          {
            name: "Rainfall",
            type: "gauge",
            center: ["50%", "55%"],
            radius: "110%",
            min: 1,
            max: 10, 
            splitNumber: 9,
            axisLine: {
              lineStyle: {
                width: 10,
                color: [
                  [0.333, "#D3D3D3"],
                  [0.778, "#37a2da"],
                  [1, "#fd666d"],
                ],
              },
            },
            pointer: {
              itemStyle: {
                color: "auto",
              },
            },
            axisTick: {
              distance: -10,
              length: 5,
              lineStyle: {
                color: "#fff",
                width: 1,
              },
            },
            splitLine: {
              distance: -10,
              length: 15,
              lineStyle: {
                color: "#fff",
                width: 2,
              },
            },
            axisLabel: {
              color: "inherit",
              distance: 20,
              fontSize: 10,
              formatter: (value: number) => {
                if (Number.isInteger(value)) {
                  return value;
                }
                return "";
              },
            },
            detail: {
              valueAnimation: true,
              formatter: "{value} mm",
              fontSize: 15,
              color: "inherit",
              offsetCenter: [0, "60%"],
            },
            data: [
              {
                value: 0,
               
              },
            ],
          },
        ],
      });
      charts.push(rainGaugeChart);
      const unsubscribe = onValue(
        ref(database, "RAIN_GAUGE/FALL_COUNT_MILIMETERS"),
        (snapshot) => {
          if (snapshot.exists()) {
            const val = snapshot.val();
            rainGaugeChart.setOption({
              series: [{ data: [{ value: val }] }],
            });
          }
        }
      );
      unsubscribers.push(unsubscribe);
    }
    const handleResize = () => charts.forEach((chart) => chart.resize());
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      charts.forEach((chart) => chart.dispose());
      unsubscribers.forEach((unsub) => unsub());
    };
  }, [sstData, percentage]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 flex flex-col gap-4">
        <div className="border-2 border-[#D9D9D9] rounded-[15px] h-64 sm:h-80 lg:h-[632px] w-[946px]">
          <div id="map" className="w-full h-full rounded-xl" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-x-hidden overflow-y-auto scrollbar-hide h-[632px] no-scrollbar p-2">
        <div className="flex flex-col">
          <div className="border-2 border-[#D9D9D9] w-full rounded-sm h-20 sm:h-28 lg:h-[225px] flex flex-col items-center justify-center">
            <p className="text-xs sm:text-sm lg:text-base font-medium text-gray-700 mb-1 text-center leading-tight">
              Surroundings <br /> Temperature
            </p>
            <div ref={gaugeRef} className="w-full h-full" />
          </div>
          <div className="w-full text-center mt-2 text-sm text-gray-600 p-2">
            High Moisture (High humidity supports strong tropical cyclone
            development.)
          </div>
        </div>

        <div className="flex flex-col">
          <div className="border-2 border-[#D9D9D9] w-full rounded-sm h-20 sm:h-28 lg:h-[225px] flex flex-col items-center justify-center">
            <p className="text-xs sm:text-sm lg:text-base font-medium text-gray-700 mb-1">
              Humidity
            </p>
            <div ref={humidityRef} className="w-full h-full" />
          </div>
          <div className="w-full text-center mt-2 text-sm text-gray-600 p-2">
            High Moisture (High humidity supports strong tropical cyclone
            development.)
          </div>
        </div>

        <div className="flex flex-col">
          <div className="border-2 border-[#D9D9D9] w-full rounded-sm h-20 sm:h-28 lg:h-[225px] flex flex-col items-center justify-center">
            <p className="text-xs sm:text-sm lg:text-base font-medium text-gray-700 mb-1">
              Wind Speed (km/h)
            </p>
            <div ref={windSpeed} className="w-full h-full" />
          </div>
          <div className="w-full text-center mt-2 text-sm text-gray-600 p-2">
            High Moisture (High humidity supports strong tropical cyclone
            development.)
          </div>
        </div>

        <div className="flex flex-col">
          <div className="border-2 border-[#D9D9D9] w-full rounded-sm h-20 sm:h-28 lg:h-[225px] flex flex-col items-center justify-center">
            <p className="text-xs sm:text-sm lg:text-base font-medium text-gray-700 mb-1">
              Atmospheric Pressure
            </p>
            <div ref={atmosphericPressure} className="w-full h-full" />
          </div>
          <div className="w-full text-center mt-2 text-sm text-gray-600 p-2">
            Normal Pressure (Fair weather; High pressure system)
          </div>
        </div>

        <div className="flex flex-col">
          <div className="border-2 border-[#D9D9D9] w-full rounded-sm h-20 sm:h-28 lg:h-[225px] flex flex-col items-center justify-center">
            <p className="text-xs sm:text-sm lg:text-base font-medium text-gray-700 mb-1">
              Water level
            </p>
            <div ref={waterLevel} className="w-full h-full" />
          </div>
          <div className="w-full text-center mt-2 text-sm text-gray-600 p-2">
            High Moisture (High humidity supports strong tropical cyclone
            development.)
          </div>
        </div>

        <div className="flex flex-col">
          <div className="border-2 border-[#D9D9D9] w-full rounded-sm h-20 sm:h-28 lg:h-[225px] flex flex-col items-center justify-center">
            <p className="text-xs sm:text-sm lg:text-base font-medium text-gray-700 mb-1">
              Water Temperature
            </p>
            <div ref={waterTemperature} className="w-full h-full" />
          </div>
          <div className="w-full text-center mt-2 text-sm text-gray-600 p-2">
            Normal Pressure (Fair weather; High pressure system)
          </div>
        </div>

        <div className="flex flex-col">
          <div className="border-2 border-[#D9D9D9] w-full rounded-sm h-20 sm:h-28 lg:h-[225px] flex flex-col items-center justify-center">
            <p className="text-xs sm:text-sm lg:text-base font-medium text-gray-700 mb-1">
              Water Pressure
            </p>
            <div ref={waterPressure} className="w-full h-full" />
          </div>
          <div className="w-full text-center mt-2 text-sm text-gray-600 p-2">
            Normal Pressure (Fair weather; High pressure system)
          </div>
        </div>

        <div className="flex flex-col">
          <div className="border-2 border-[#D9D9D9] w-full rounded-sm h-20 sm:h-28 lg:h-[225px] flex flex-col items-center justify-center">
            <p className="text-xs sm:text-sm lg:text-base font-medium text-gray-700 mb-1">
             Rain Fall Count Milimeter
            </p>
            <div ref={rainGauge} className="w-full h-full" />
          </div>
          <div className="w-full text-center mt-2 text-sm text-gray-600 p-2">
            Normal Pressure (Fair weather; High pressure system)
          </div>
        </div>
      </div>
    </div>
  );
}
