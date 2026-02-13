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

  // --- Fixed Humidity Wave Effect Function ---
  const renderHumidity = (
    container: HTMLDivElement,
    isDark: boolean,
    percent: number,
  ) => {
    const fillY = 200 - (percent / 100) * 200;
    const circleFill = isDark ? "#1f2937" : "#f0f9ff";
    const circleStroke = "#2185C5";

    container.innerHTML = `
      <svg viewBox="0 0 200 200" style="width:100%;height:100%;max-width:290px;max-height:290px;margin:0 auto;">
          <defs>
            <clipPath id="circleClip"><circle cx="100" cy="100" r="95" /></clipPath>
            <pattern id="wave" x="0" y="0" width="400" height="200" patternUnits="userSpaceOnUse">
              <path d="M0,20 Q50,0 100,20 T200,20 T300,20 T400,20 V200 H0 Z" fill="#2185C5" opacity="0.85">
                <animateTransform attributeName="transform" type="translate" from="0,0" to="-200,0" dur="2s" repeatCount="indefinite" />
              </path>
            </pattern>
          </defs>
          <circle cx="100" cy="100" r="98" fill="none" stroke="${circleStroke}" stroke-width="4" />
          <circle cx="100" cy="100" r="95" fill="${circleFill}" /> 
          <g clip-path="url(#circleClip)">
            <rect x="0" y="${fillY - 15}" width="400" height="220" fill="url(#wave)">
              <animate attributeName="y" from="200" to="${fillY - 15}" dur="1.5s" fill="freeze" />
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
    dynamicMax?: number,
  ) => {
    const textColor = isDark ? "#ccc" : "#464646";
    const axisLineColor = isDark ? "#9ca3af" : "#fff";
    let newOptions: echarts.EChartsOption = { series: [] };

    if (seriesOptions.type === "gauge" && seriesOptions.startAngle === 200) {
      newOptions = {
        series: [
          {
            axisTick: { lineStyle: { color: isDark ? "#666" : "#999" } },
            splitLine: { lineStyle: { color: isDark ? "#666" : "#999" } },
            axisLabel: { color: isDark ? "#aaa" : "#999" },
          },
          {},
        ],
      };
    } else if (
      seriesOptions.type === "gauge" &&
      seriesOptions.center &&
      seriesOptions.center[1] === "75%"
    ) {
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
      seriesOptions.center &&
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
      seriesOptions.center &&
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
            index === 0 ? (sstData > 0 ? sstData * 1.2 : 3) : undefined,
          );
        }
      });
      if (humidityRef.current)
        renderHumidity(humidityRef.current, isDark, percentage);
    };

    // 1. Surroundings Temperature
    if (gaugeRef.current) {
      const chart = echarts.init(gaugeRef.current);
      chart.setOption({
        series: [
          {
            type: "gauge",
            center: ["50%", "65%"],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 100,
            splitNumber: 10,
            itemStyle: { color: "#FFAB91" },
            progress: {
              show: true,
              width: 15,
              itemStyle: { color: "#FFAB91" },
            },
            pointer: { show: false },
            axisLine: { lineStyle: { width: 15, color: [[1, "#EBEFF4"]] } },
            axisTick: {
              distance: -40,
              splitNumber: 5,
              lineStyle: { width: 1, color: "#999" },
            },
            splitLine: {
              distance: -42,
              length: 10,
              lineStyle: { width: 2, color: "#999" },
            },
            axisLabel: { distance: -15, color: "#999", fontSize: 12 },
            detail: {
              valueAnimation: true,
              offsetCenter: [0, "-5%"],
              fontSize: 17,
              fontWeight: "bold",
              color: "#FFAB91",
              formatter: (value: number) => {
                const fahrenheit = (value * 9) / 5 + 32;
                return `${value.toFixed(2)} °C\n{f|${fahrenheit.toFixed(1)} °F}`;
              },
              rich: {
                f: {
                  fontSize: 17,
                  color: "#FFAB91",
                  padding: [10, 0],
                  fontWeight: "bold",
                },
              },
            },
            data: [{ value: 0 }],
          },
          {
            type: "gauge",
            center: ["50%", "65%"],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 100,
            itemStyle: { color: "#FD7347" },
            progress: { show: true, width: 4 },
            pointer: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: { show: false },
            detail: { show: false },
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
              series: [{ data: [{ value }] }, { data: [{ value }] }],
            });
          },
        ),
      );
    }

// 2. Wind Speed
    if (windSpeed.current) {
      const chart = echarts.init(windSpeed.current);
      chart.setOption({
        series: [
          {
            type: "gauge",
            startAngle: 225,
            endAngle: -45,
            min: 0,
            max: 150,
            splitNumber: 10,
            radius: "100%", 
            center: ["50%", "50%"],
            axisLine: {
              lineStyle: {
                width: 10,
                color: [[1, "#EBEFF4"]],
              },
            },
            progress: {
              show: true,
              width: 10,
              itemStyle: {
                color: "#4B70E2",
              },
            },
            pointer: {
              icon: "path://M12.8,0.7l12,40.1H0.8L12.8,0.7z",
              length: "60%",
              width: 6,
              offsetCenter: [0, "5%"],
              itemStyle: {
                color: "#4B70E2",
              },
            },
            axisTick: {
              distance: 10,
              length: 8,
              lineStyle: {
                color: "#999",
                width: 1,
              },
            },
            splitLine: {
              distance: 10,
              length: 15,
              lineStyle: {
                color: "#999",
                width: 2,
              },
            },
            axisLabel: {
              distance: 25,
              color: "#999",
              fontSize: 11,
            },
            anchor: {
              show: true,
              showAbove: true,
              size: 18,
              itemStyle: {
                borderWidth: 4,
                borderColor: "#4B70E2",
                color: "#fff",
              },
            },
            detail: {
              valueAnimation: true,
              fontSize: 22,
              fontWeight: "bold",
              offsetCenter: [0, "85%"],
              formatter: "{value} km/h",
              color: "#333",
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
            chart.setOption({ series: [{ data: [{ value }] }] });
          },
        ),
      );
    }

    // 3. Atmospheric Pressure
    if (atmosphericPressure.current) {
      const chart = echarts.init(atmosphericPressure.current);
      chart.setOption({
        series: [
          {
            type: "gauge",
            min: 900,
            max: 1100,
            radius: "90%",
            center: ["50%", "65%"],
            startAngle: 210,
            endAngle: -30,
            splitNumber: 10,
            axisLine: { lineStyle: { color: [[1, "#ff0000"]], width: 2 } },
            splitLine: { distance: -10, length: 12, lineStyle: { color: "#ff0000", width: 2 } },
            axisTick: { distance: -6, length: 6, lineStyle: { color: "#ff0000" } },
            axisLabel: { distance: -35, color: "#ff0000", fontSize: 11, fontWeight: "bold" },
            pointer: { 
                icon: "path://M12.8,0.7l12,40.1H0.8L12.8,0.7z", 
                length: "75%", 
                width: 4, 
                itemStyle: { color: "#000" } 
            },
            anchor: { show: true, showAbove: true, size: 8, itemStyle: { color: "#000" } },
            detail: { 
                valueAnimation: true, 
                formatter: "{value} hPa", 
                color: "#333", 
                fontSize: 18, 
                fontWeight: "bold", 
                offsetCenter: [0, "40%"] 
            },
            data: [{ value: 1013 }]
          },
          {
            type: "gauge",
            min: 900,
            max: 1100,
            radius: "82%",
            center: ["50%", "65%"], 
            startAngle: 210,
            endAngle: -30,
            splitNumber: 10,
            axisLine: { lineStyle: { color: [[1, "#000"]], width: 2 } },
            splitLine: { distance: -2, length: 10, lineStyle: { color: "#000", width: 2 } },
            axisTick: { distance: 2, length: 5, lineStyle: { color: "#000" } },
            axisLabel: { distance: 6, color: "#000", fontSize: 9, fontWeight: "bold" },
            pointer: { show: false },
            detail: { show: false }
          }
        ],
      });
      charts.push(chart);
      unsubscribers.push(
        onValue(
          ref(database, `/${buoyCode}/BME280/ATMOSPHERIC_PRESSURE`),
          (s) => {
            const value = s.exists() ? toNumberOrZero(s.val()) : 0;
            chart.setOption({ series: [{ data: [{ value }] }, { data: [{ value }] }] });
          },
        ),
      );
    }

// 4. Water Level (Updated to 15ft Max)
    if (waterLevel.current) {
      const chart = echarts.init(waterLevel.current);
      chart.setOption({
        series: [
          {
            type: "gauge",
            center: ["50%", "85%"], 
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 15, 
            splitNumber: 5, 
            radius: "100%", 
            axisLine: {
              lineStyle: {
                width: 6,
                color: [
                  [0.33, "#7BFFB3"], // 0-5 ft (Safe/Green)
                  [0.66, "#FFD747"], // 5-10 ft (Warning/Yellow)
                  [1, "#FF5252"],    // 10-15 ft (Danger/Red)
                ],
              },
            },
            pointer: {
              icon: "path://M12.8,0.7l12,40.1H0.8L12.8,0.7z",
              length: "15%",
              width: 13,
              offsetCenter: [0, "-55%"], 
              itemStyle: { color: "#7BFFB3" },
            },
            axisTick: {
              distance: 10,
              length: 10,
              lineStyle: { color: "auto", width: 1 },
            },
            splitLine: {
              distance: 10,
              length: 15,
              lineStyle: { color: "auto", width: 2 },
            },
            axisLabel: {
              distance: -50, 
              color: "#666",
              fontSize: 10,
              formatter: "{value} ft", 
            },
            detail: {
              valueAnimation: true,
              fontSize: 22,
              fontWeight: "bold",
              offsetCenter: [0, "-40%"],
              formatter: "{value} ft",
              color: "#7BFFB3",
            },
            title: {
              offsetCenter: [0, "-10%"],
              fontSize: 14,
              color: "#666",
            },
            data: [{ value: 0, name: "Water Level" }],
          },
        ],
      });
      charts.push(chart);
      unsubscribers.push(
        onValue(ref(database, `/${buoyCode}/MS5837/WATER_LEVEL_FEET`), (s) => {
          const value = s.exists() ? toNumberOrZero(s.val()) : 0;
          
          let currentColor = "#7BFFB3"; 
          if (value > 5) currentColor = "#FFD747"; 
          if (value > 10) currentColor = "#FF5252"; 

          chart.setOption({
            series: [
              {
                data: [{ value, name: "Water Level" }],
                detail: { color: currentColor },
                pointer: { itemStyle: { color: currentColor } },
              },
            ],
          });
        }),
      );
    }

    // 5. Water Temperature
    if (waterTemperature.current) {
      const chart = echarts.init(waterTemperature.current);
      chart.setOption({
        series: [
          {
            type: "gauge",
            center: ["50%", "65%"],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 100,
            splitNumber: 10,
            itemStyle: { color: "#FFAB91" },
            progress: {
              show: true,
              width: 15,
              itemStyle: { color: "#FFAB91" },
            },
            pointer: { show: false },
            axisLine: { lineStyle: { width: 15, color: [[1, "#EBEFF4"]] } },
            axisTick: {
              distance: -40,
              splitNumber: 5,
              lineStyle: { width: 1, color: "#999" },
            },
            splitLine: {
              distance: -42,
              length: 10,
              lineStyle: { width: 2, color: "#999" },
            },
            axisLabel: { distance: -15, color: "#999", fontSize: 12 },
            detail: {
              valueAnimation: true,
              offsetCenter: [0, "-5%"],
              fontSize: 17,
              fontWeight: "bold",
              color: "#FFAB91",
              formatter: (value: number) => {
                const fahrenheit = (value * 9) / 5 + 32;
                return `${value.toFixed(2)} °C\n{f|${fahrenheit.toFixed(1)} °F}`;
              },
              rich: {
                f: {
                  fontSize: 17,
                  color: "#FFAB91",
                  padding: [10, 0],
                  fontWeight: "bold",
                },
              },
            },
            data: [{ value: 0 }],
          },
          {
            type: "gauge",
            center: ["50%", "65%"],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 100,
            itemStyle: { color: "#FD7347" },
            progress: { show: true, width: 4 },
            pointer: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: { show: false },
            detail: { show: false },
            data: [{ value: 0 }],
          },
        ],
      });
      charts.push(chart);
      unsubscribers.push(
        onValue(ref(database, `/${buoyCode}/MS5837/WATER_TEMPERATURE`), (s) => {
          const value = s.exists() ? toNumberOrZero(s.val()) : 0;
          chart.setOption({ 
            series: [{ data: [{ value }] }, { data: [{ value }] }] 
          });
        }),
      );
    }

    // 6. Water Pressure 
    if (waterPressure.current) {
      const chart = echarts.init(waterPressure.current);
      chart.setOption({
        series: [
          {
            type: "gauge",
            min: 900,
            max: 1100,
            radius: "90%", 
            center: ["50%", "65%"], 
            startAngle: 210,
            endAngle: -30,
            splitNumber: 10,
            axisLine: { lineStyle: { color: [[1, "#0076E8"]], width: 2 } }, 
            splitLine: { distance: -10, length: 12, lineStyle: { color: "#0076E8", width: 2 } },
            axisTick: { distance: -6, length: 6, lineStyle: { color: "#0076E8" } },
            axisLabel: { distance: -35, color: "#0076E8", fontSize: 11, fontWeight: "bold" },
            pointer: { 
                icon: "path://M12.8,0.7l12,40.1H0.8L12.8,0.7z", 
                length: "75%", 
                width: 4, 
                itemStyle: { color: "#000" } 
            },
            anchor: { show: true, showAbove: true, size: 8, itemStyle: { color: "#000" } },
            detail: { 
                valueAnimation: true, 
                formatter: "{value} hPa", 
                color: "#333", 
                fontSize: 18, 
                fontWeight: "bold", 
                offsetCenter: [0, "40%"] 
            },
            data: [{ value: 1013 }]
          },
          {
            type: "gauge",
            min: 900,
            max: 1100,
            radius: "82%", 
            center: ["50%", "65%"], 
            startAngle: 210,
            endAngle: -30,
            splitNumber: 10,
            axisLine: { lineStyle: { color: [[1, "#000"]], width: 2 } },
            splitLine: { distance: -2, length: 10, lineStyle: { color: "#000", width: 2 } },
            axisTick: { distance: 2, length: 5, lineStyle: { color: "#000" } },
            axisLabel: { distance: 6, color: "#000", fontSize: 9, fontWeight: "bold" },
            pointer: { show: false },
            detail: { show: false }
          }
        ],
      });
      charts.push(chart);
      unsubscribers.push(
        onValue(ref(database, `/${buoyCode}/MS5837/WATER_PRESSURE`), (s) => {
          const value = s.exists() ? toNumberOrZero(s.val()) : 0;
          chart.setOption({ 
            series: [{ data: [{ value }] }, { data: [{ value }] }] 
          });
        }),
      );
    }

    // 7. Rain Gauge
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
            chart.setOption({ series: [{ data: [{ value }] }] });
          },
        ),
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
      <div
        ref={valueRef}
        className="w-full h-48 sm:h-56 lg:h-64 flex-grow flex items-center justify-center"
      />
      <div className="w-full text-center mt-1 pt-1 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400 italic leading-snug">
          {footerText}
        </p>
      </div>
    </div>
  );

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900  transition-colors duration-300">
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
          title="Water Level (ft)"
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