/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { ref, onValue } from "firebase/database";
import { database, auth } from "../../firebaseCredentials/firebase";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import { signInAnonymously } from "firebase/auth";
import { RefObject } from "@fullcalendar/core/preact.js";

export default function MapsWithHazard() {
  const [sstData, setSST] = useState<number>(0);
  const [percentage, setPercentage] = useState(0);
  const gaugeRef = useRef<HTMLDivElement | null>(null);
  const humidityRef = useRef<HTMLDivElement | null>(null);
  const windSpeed = useRef<HTMLDivElement | null>(null);
  const atmosphericPressure = useRef<HTMLDivElement | null>(null);
  const waterLevel = useRef<HTMLDivElement | null>(null);
  const waterTemperature = useRef<HTMLDivElement | null>(null);
  const waterPressure = useRef<HTMLDivElement | null>(null);
  const rainGauge = useRef<HTMLDivElement | null>(null);
  const { user } = useContext(AppContext)!;
  const buoyCode = user?.barangay?.buoys?.[0]?.buoyCode;
  console.log("Buoy Code:", buoyCode);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("Authentication", user);
      } else {
        signInAnonymously(auth);
      }
    });

    return unsubscribe;
  }, []);

  // --- Helper Functions for Styling ---
  const renderHumidity = (
    container: HTMLDivElement,
    isDark: boolean,
    percent: number
  ) => {
    // In-adjust ang fillY calculation para sa mas malaking radius
    const fillY = 10 + (180 - (percent / 100) * 180);
    const circleFill = isDark ? "#1f2937" : "#f0f9ff";
    const circleStroke = isDark ? "#60a5fa" : "#3b82f6";

    // Pinalaki ang max-width/height at in-adjust ang circle radius (r) mula 85/90 patungong 95/98
    container.innerHTML = `
      <svg viewBox="0 0 200 200" style="width:100%;height:100%;max-width:290px;max-height:290px;margin:0 auto;">
          <defs>
            <clipPath id="circleClip"><circle cx="100" cy="100" r="95" /></clipPath>
            <pattern id="wave" x="0" y="0" width="400" height="200" patternUnits="userSpaceOnUse">
              <path d="M0,50 Q50,35 100,50 T200,50 T300,50 T400,50 V200 H0 Z" fill="#3b82f6" opacity="0.85">
                <animateTransform attributeName="transform" type="translate" from="0,0" to="-200,0" dur="3s" repeatCount="indefinite" />
              </path>
            </pattern>
          </defs>
          <circle cx="100" cy="100" r="98" fill="none" stroke="${circleStroke}" stroke-width="4" />
          <circle cx="100" cy="100" r="95" fill="${circleFill}" /> 
          <g clip-path="url(#circleClip)">
            <rect x="0" y="${fillY}" width="200" height="200" fill="url(#wave)">
              <animate attributeName="y" from="200" to="${fillY}" dur="2s" fill="freeze" />
            </rect>
          </g>
          <text x="100" y="115" text-anchor="middle" font-size="52" font-weight="bold" fill="#ffffff" style="text-shadow:0 2px 4px rgba(0,0,0,0.5)">
            ${percent.toFixed(0)}%
          </text>
      </svg>`;
  };

  const toNumberOrZero = (value: any): number => {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  };

  const updateEChartsOptions = (
    chart: echarts.ECharts,
    seriesOptions: any,
    isDark: boolean,
    dynamicMax?: number
  ) => {
    const textColor = isDark ? "#ccc" : "#464646";
    const axisLineColor = isDark ? "#9ca3af" : "#fff";
    let newOptions: echarts.EChartsOption = { series: [] };

    if (seriesOptions.type === "gauge" && seriesOptions.center[1] === "75%") {
      newOptions = {
        series: [
          {
            ...seriesOptions,
            max: dynamicMax,
            axisLabel: { ...seriesOptions.axisLabel, color: textColor },
          },
        ],
      };
    } else if (
      seriesOptions.type === "gauge" &&
      seriesOptions.center[1] === "60%"
    ) {
      newOptions = {
        series: [
          {
            ...seriesOptions,
            axisLabel: { ...seriesOptions.axisLabel, color: textColor },
            splitLine: {
              ...seriesOptions.splitLine,
              lineStyle: { color: textColor, width: 1 },
            },
          },
        ],
      };
    } else if (
      seriesOptions.type === "gauge" &&
      seriesOptions.center[1] === "55%"
    ) {
      newOptions = {
        series: [
          {
            ...seriesOptions,
            axisTick: {
              ...seriesOptions.axisTick,
              lineStyle: {
                color: axisLineColor,
                width: seriesOptions.axisTick.lineStyle.width,
              },
            },
            splitLine: {
              ...seriesOptions.splitLine,
              lineStyle: {
                color: axisLineColor,
                width: seriesOptions.splitLine.lineStyle.width,
              },
            },
            axisLabel: { ...seriesOptions.axisLabel, color: textColor },
          },
        ],
      };
    }
    chart.setOption(newOptions);
  };

  // --- Data Fetching ---
  useEffect(() => {
    const sstRef = ref(database, `/${buoyCode}/BME280/SURROUNDING_TEMPERATURE`);
    const unsubscribe = onValue(sstRef, (snapshot) => {
      if (snapshot.exists()) setSST(snapshot.val());
    });
    return () => unsubscribe();
  }, [buoyCode]);

  useEffect(() => {
    const humidityDBRef = ref(database, `/${buoyCode}/BME280/HUMIDITY`);
    const unsubscribe = onValue(humidityDBRef, (snapshot) => {
      if (snapshot.exists()) {
        const val = Number(snapshot.val());
        setPercentage(isNaN(val) ? 0 : val);
      }
    });
    return () => unsubscribe();
  }, [buoyCode]);

  // --- Charts Initialization and Theme Logic ---
  useEffect(() => {
    const charts: echarts.ECharts[] = [];
    const unsubscribers: (() => void)[] = [];

    const applyStyles = () => {
      const isDark = document.documentElement.classList.contains("dark");
      charts.forEach((chart, index) => {
        const option = chart.getOption() as echarts.EChartsOption;
        if (option && option.series) {
          const seriesData = Array.isArray(option.series)
            ? option.series[0]
            : option.series;
          updateEChartsOptions(
            chart,
            seriesData,
            isDark,
            index === 0 ? (sstData > 0 ? sstData * 1.2 : 3) : undefined
          );
        }
      });
      if (humidityRef.current)
        renderHumidity(humidityRef.current, isDark, percentage);
    };

    // Initialize Wind Speed
    if (windSpeed.current) {
      const chart = echarts.init(windSpeed.current);
      chart.setOption({
        series: [
          {
            type: "gauge",
            radius: "110%",
            center: ["50%", "60%"],
            max: 185,
            progress: { show: true, width: 12 },
            axisLine: {
              lineStyle: {
                width: 12,
                color: [
                  [0.31, "#D3D3D3"],
                  [0.655, "#0076E8"],
                  [1, "#E32F20"],
                ],
              },
            },
            axisTick: { show: false },
            splitLine: { distance: 0, length: 5, lineStyle: { width: 1 } },
            axisLabel: { distance: 15, fontSize: 8 },
            detail: {
              fontSize: 13,
              offsetCenter: [0, "60%"],
              formatter: "{value}km/h",
            },
            data: [{ value: 0 }],
          },
        ],
      });
      charts.push(chart);
      unsubscribers.push(
        onValue(
          ref(database, `/${buoyCode}/ANEMOMETER/WIND_SPEED_km_h`),
          (s) => {
            const value = s.exists() ? toNumberOrZero(s.val()) : 0;

            chart.setOption({
              series: [{ data: [{ value }] }],
            });
          }
        )
      );
    }
    if (gaugeRef.current) {
      const chart = echarts.init(gaugeRef.current);
      chart.setOption({
        series: [
          {
            type: "gauge",
            center: ["50%", "55%"],
            radius: "110%",
            axisLine: {
              lineStyle: {
                width: 10,
                color: [
                  [0.31, "#D3D3D3"],
                  [0.655, "#0076E8"],
                  [1, "#E32F20"],
                ],
              },
            },
            axisLabel: { distance: 20, fontSize: 10 },
            detail: {
              formatter: "{value} °C",
              fontSize: 15,
              offsetCenter: [0, "60%"],
            },

            data: [{ value: 0 }],
          },
        ],
      });

      charts.push(chart);

      unsubscribers.push(
        onValue(
          ref(database, `/${buoyCode}/BME280/SURROUNDING_TEMPERATURE`),
          (s) => {
            const value = s.exists() ? toNumberOrZero(s.val()) : 0;

            chart.setOption({
              series: [{ data: [{ value }] }],
            });
          }
        )
      );
    }

    // Initialize Atmospheric Pressure
    if (atmosphericPressure.current) {
      const chart = echarts.init(atmosphericPressure.current);
      chart.setOption({
        series: [
          {
            type: "gauge",
            radius: "110%",
            center: ["50%", "60%"],
            min: 0,
            max: 1000,
            axisLine: {
              lineStyle: {
                width: 10,
                color: [
                  [0.31, "#D3D3D3"],
                  [0.655, "#0076E8"],
                  [1, "#E32F20"],
                ],
              },
            },
            axisLabel: { distance: 15, fontSize: 8 },
            detail: {
              fontSize: 13,
              offsetCenter: [0, "60%"],
              formatter: "{value} hPa",
            },
            data: [{ value: 0 }],
          },
        ],
      });
      charts.push(chart);
      unsubscribers.push(
        onValue(
          ref(database, `/${buoyCode}/BME280/ATMOSPHERIC_PRESSURE`),
          (s) => {
            const value = s.exists() ? toNumberOrZero(s.val()) : 0;

            chart.setOption({
              series: [{ data: [{ value }] }],
            });
          }
        )
      );
    }

    // Initialize Water Level
    if (waterLevel.current) {
      const chart = echarts.init(waterLevel.current);
      chart.setOption({
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
                  [0.31, "#D3D3D3"],
                  [0.655, "#0076E8"],
                  [1, "#E32F20"],
                ],
              },
            },
            axisLabel: { distance: 25, fontSize: 12 },
            detail: {
              formatter: "{value} m",
              fontSize: 12,
              offsetCenter: [0, "50%"],
            },
            data: [{ value: 0 }],
          },
        ],
      });
      charts.push(chart);
      unsubscribers.push(
        onValue(ref(database, `/${buoyCode}/MS5837/WATER_LEVEL_METER`), (s) => {
          const value = s.exists() ? toNumberOrZero(s.val()) : 0;

          chart.setOption({
            series: [{ data: [{ value }] }],
          });
        })
      );
    }

    // Initialize Water Temperature
    if (waterTemperature.current) {
      const chart = echarts.init(waterTemperature.current);
      chart.setOption({
        series: [
          {
            type: "gauge",
            center: ["50%", "55%"],
            radius: "110%",
            min: 0,
            max: 50,
            axisLine: {
              lineStyle: {
                width: 10,
                color: [
                  [0.31, "#D3D3D3"],
                  [0.655, "#0076E8"],
                  [1, "#E32F20"],
                ],
              },
            },
            axisLabel: { distance: 20, fontSize: 10 },
            detail: {
              formatter: "{value}°C",
              fontSize: 15,
              offsetCenter: [0, "60%"],
            },
            data: [{ value: 0 }],
          },
        ],
      });
      charts.push(chart);
      unsubscribers.push(
        onValue(ref(database, `/${buoyCode}/MS5837/WATER_TEMPERATURE`), (s) => {
          const value = s.exists() ? toNumberOrZero(s.val()) : 0;

          chart.setOption({
            series: [{ data: [{ value }] }],
          });
        })
      );
    }

    // Initialize Water Pressure
    if (waterPressure.current) {
      const chart = echarts.init(waterPressure.current);
      chart.setOption({
        series: [
          {
            type: "gauge",
            center: ["50%", "55%"],
            radius: "110%",
            min: 10,
            max: 300,
            axisLine: {
              lineStyle: {
                width: 10,
                color: [
                  [0.31, "#D3D3D3"],
                  [0.655, "#0076E8"],
                  [1, "#E32F20"],
                ],
              },
            },
            axisLabel: { distance: 20, fontSize: 10 },
            detail: {
              formatter: "{value} hPa",
              fontSize: 15,
              offsetCenter: [0, "60%"],
            },
            data: [{ value: 0 }],
          },
        ],
      });
      charts.push(chart);
      unsubscribers.push(
        onValue(ref(database, `/${buoyCode}/MS5837/WATER_PRESSURE`), (s) => {
          const value = s.exists() ? toNumberOrZero(s.val()) : 0;

          chart.setOption({
            series: [{ data: [{ value }] }],
          });
        })
      );
    }

    // Initialize Rain Gauge
    if (rainGauge.current) {
      const chart = echarts.init(rainGauge.current);
      chart.setOption({
        series: [
          {
            type: "gauge",
            center: ["50%", "55%"],
            radius: "110%",
            min: 1,
            max: 10,
            axisLine: {
              lineStyle: {
                width: 10,
                color: [
                  [0.31, "#D3D3D3"],
                  [0.655, "#0076E8"],
                  [1, "#E32F20"],
                ],
              },
            },
            axisLabel: { distance: 20, fontSize: 10 },
            detail: {
              formatter: "{value} mm",
              fontSize: 15,
              offsetCenter: [0, "60%"],
            },
            data: [{ value: 0 }],
          },
        ],
      });
      charts.push(chart);
      unsubscribers.push(
        onValue(
          ref(database, `/${buoyCode}/RAIN_GAUGE/FALL_COUNT_MILIMETERS`),
          (s) => {
            const value = s.exists() ? toNumberOrZero(s.val()) : 0;

            chart.setOption({
              series: [{ data: [{ value }] }],
            });
          }
        )
      );
    }

    applyStyles();

    const observer = new MutationObserver(() => applyStyles());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const handleResize = () => charts.forEach((c) => c.resize());
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      charts.forEach((c) => c.dispose());
      observer.disconnect();
      unsubscribers.forEach((u) => u());
    };
  }, [sstData, percentage, buoyCode]);

  const SensorCard = ({
    title,
    valueRef,
    footerText,
  }: {
    title: string;
    valueRef: RefObject<HTMLDivElement | null>;
    footerText: string;
  }) => (
    <div className="flex flex-col p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1 text-center">
        {title}
      </h3>
      <div ref={valueRef} className="w-full h-48 sm:h-56 lg:h-64 flex-grow flex items-center justify-center" />
      <div className="w-full text-center mt-1 pt-1 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400 italic leading-snug">
          {footerText}
        </p>
      </div>
    </div>
  );

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 pb-4">
        <SensorCard
          title="Surroundings Temperature (°C)"
          valueRef={gaugeRef}
          footerText="Monitoring surrounding air temperature."
        />
        <SensorCard
          title="Humidity (%)"
          valueRef={humidityRef}
          footerText="High humidity supports tropical cyclone development."
        />
        <SensorCard
          title="Wind Speed (km/h)"
          valueRef={windSpeed}
          footerText="Monitoring wind speed for storm conditions."
        />
        <SensorCard
          title="Atmospheric Pressure (hPa)"
          valueRef={atmosphericPressure}
          footerText="Normal Pressure indicates fair weather."
        />
        <SensorCard
          title="Water Level (m)"
          valueRef={waterLevel}
          footerText="Elevated levels can indicate surge risks."
        />
        <SensorCard
          title="Water Temperature (°C)"
          valueRef={waterTemperature}
          footerText="Critical factor for tropical cyclone formation."
        />
        <SensorCard
          title="Water Pressure (hPa)"
          valueRef={waterPressure}
          footerText="Used to infer water depth and level."
        />
        <SensorCard
          title="Rainfall Count (mm)"
          valueRef={rainGauge}
          footerText="Heavy rain contributes to potential flooding."
        />
      </div>
    </div>
  );
}