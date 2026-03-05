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
  // const [percentage, setPercentage] = useState(0);
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
    const textColor = isDark ? "#EBEFF4" : "#464646";
    const subTextColor = isDark ? "#9ca3af" : "#999";

    chart.setOption({
      series: [
        {
          axisLabel: { color: subTextColor },
          detail: { color: textColor },
          splitLine: { lineStyle: { color: subTextColor } },
          axisTick: { lineStyle: { color: subTextColor } },
          max: dynamicMax !== undefined ? dynamicMax : seriesOptions.max
        }
      ]
    });
  };

  useEffect(() => {
    const sstRef = ref(database, `/${buoyCode}/BME280/SURROUNDING_TEMPERATURE`);
    const unsubscribe = onValue(sstRef, (snapshot) => {
      if (snapshot.exists()) setSST(snapshot.val());
    });
    return () => unsubscribe();
  }, [buoyCode]);

  useEffect(() => {
    const charts: echarts.ECharts[] = [];
    const unsubscribers: (() => void)[] = [];

    const applyStyles = () => {
      const isDark = document.documentElement.classList.contains("dark");
      charts.forEach((chart) => {
        const option = chart.getOption() as echarts.EChartsOption;
        if (option && option.series) {
          const seriesData = Array.isArray(option.series)
            ? option.series[0]
            : option.series;

          updateEChartsOptions(
            chart,
            seriesData,
            isDark,
            undefined
          );
        }
      });
    };
    // 1. Surroundings Temperature (ECharts Gauge)
    if (gaugeRef.current) {
      const chart = echarts.init(gaugeRef.current);
      const GAUGE_MAX = 100;

      const getTemperatureColor = (val: number) => {
        if (val < 27) return "#EBEFF4"; // Green: Below 27
        if (val <= 32) return "#EBEFF4"; // Green: 27 - 32
        if (val <= 41) return "#3498db"; // Blue: 33 - 41
        if (val <= 51) return "#e74c3c"; // Red: 42 - 51
        return "#e74c3c"; // Red: > 52
      };

      chart.setOption({
        series: [
          {
            type: "gauge",
            startAngle: 225,
            endAngle: -45,
            min: 0,
            max: GAUGE_MAX,
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
              itemStyle: { color: "#989898" }, 
            },
            pointer: {
              icon: "path://M12.8,0.7l12,40.1H0.8L12.8,0.7z",
              length: "60%",
              width: 6,
              offsetCenter: [0, "5%"],
              itemStyle: { color: "#000" }, 
            },
            axisTick: {
              distance: 10,
              length: 8,
              lineStyle: { color: "#BDBDBD", width: 1 },
            },
            splitLine: {
              distance: 10,
              length: 15,
              lineStyle: { color: "#BDBDBD", width: 2 },
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
                borderColor: "#000",
                color: "#fff",
              },
            },
            detail: {
              valueAnimation: true,
              fontSize: 15,
              fontWeight: "bold",
              offsetCenter: [0, "85%"],
              color: "#333",
              formatter: (value: number) => {
                return `${value.toFixed(2)} °C\n`;
              },
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
            let activeColor = "#989898"; // Default progress color
            let isThreshold = false;

            if (s.exists()) {
              const tempColor = getTemperatureColor(value);
              if (tempColor !== "#EBEFF4") {
                activeColor = tempColor;
                isThreshold = true;
              }
            }

            const isDark = document.documentElement.classList.contains("dark");
            const pointerColor = isThreshold ? activeColor : (isDark ? "#EBEFF4" : "#000000");

            chart.setOption({
              series: [
                {
                  data: [{ value }],
                  progress: { itemStyle: { color: activeColor } },
                  pointer: { itemStyle: { color: pointerColor } },
                  anchor: { itemStyle: { borderColor: pointerColor } },
                },
              ],
            });
          },
        ),
      );
    }

    // 2. Humidity (ECharts Gauge)
    if (humidityRef.current) {
      const chart = echarts.init(humidityRef.current);
      const GAUGE_MAX = 100;

      // Color logic based STRICTLY on provided text readings
      const getHumidityColor = (val: number) => {
        if (val < 25) return "#EBEFF4"; // white
        if (val <= 29) return "#3498db"; // Blue
        if (val <= 59) return "#EBEFF4"; // Green
        if (val <= 69) return "#3498db"; // Blue
        return "#e74c3c"; // Red
      };

      chart.setOption({
        series: [
          {
            type: "gauge",
            startAngle: 225,
            endAngle: -45,
            min: 0,
            max: GAUGE_MAX,
            splitNumber: 10,
            radius: "100%",
            center: ["50%", "50%"],
            axisLine: {
              lineStyle: {
                width: 10,
                color: [[1, "#EBEFF4"]], // Background is White
              },
            },
            progress: {
              show: true,
              width: 10,
              itemStyle: { color: "#989898" }, // Progress is Grey
            },
            pointer: {
              icon: "path://M12.8,0.7l12,40.1H0.8L12.8,0.7z",
              length: "60%",
              width: 6,
              offsetCenter: [0, "5%"],
              itemStyle: { color: "#000" },
            },
            axisTick: {
              distance: 10,
              length: 8,
              lineStyle: { color: "#BDBDBD", width: 1 },
            },
            splitLine: {
              distance: 10,
              length: 15,
              lineStyle: { color: "#BDBDBD", width: 2 },
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
                borderColor: "#000",
                color: "#fff",
              },
            },
            detail: {
              valueAnimation: true,
              fontSize: 15,
              fontWeight: "bold",
              offsetCenter: [0, "85%"],
              formatter: "{value}%",
              color: "#333",
            },
            data: [{ value: 0 }],
          },
        ],
      });

      charts.push(chart);
      unsubscribers.push(
        onValue(ref(database, `/${buoyCode}/BME280/HUMIDITY`), (s) => {
          const value = s.exists() ? toNumberOrZero(s.val()) : 0;
          let activeColor = "#989898";
          let isThreshold = false;

          if (s.exists()) {
            const humColor = getHumidityColor(value);
            if (humColor !== "#EBEFF4") {
              activeColor = humColor;
              isThreshold = true;
            }
          }

          const isDark = document.documentElement.classList.contains("dark");
          const pointerColor = isThreshold ? activeColor : (isDark ? "#EBEFF4" : "#000000");

          chart.setOption({
            series: [
              {
                data: [{ value }],
                progress: { itemStyle: { color: activeColor } },
                pointer: { itemStyle: { color: pointerColor } },
                anchor: { itemStyle: { borderColor: pointerColor } },
              },
            ],
          });
        }),
      );
    }
    // 3. Wind Speed
    if (windSpeed.current) {
      const chart = echarts.init(windSpeed.current);
      const GAUGE_MAX = 400; 

      chart.setOption({
        series: [
          {
            type: "gauge",
            startAngle: 225,
            endAngle: -45,
            min: 0,
            max: GAUGE_MAX,
            splitNumber: 8, 
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
              itemStyle: { color: "#989898" },
            },
            pointer: {
              icon: "path://M12.8,0.7l12,40.1H0.8L12.8,0.7z",
              length: "60%",
              width: 6,
              offsetCenter: [0, "5%"],
              itemStyle: { color: "#000" },
            },
            axisTick: {
              distance: 10,
              length: 8,
              lineStyle: { color: "#BDBDBD", width: 1 },
            },
            splitLine: {
              distance: 10,
              length: 15,
              lineStyle: { color: "#BDBDBD", width: 2 },
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
                borderColor: "#000",
                color: "#fff",
              },
            },
            detail: {
              valueAnimation: true,
              fontSize: 15,
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
            let activeColor = "#989898";
            let isThreshold = false;

            if (s.exists()) {
              if (value > 61 && value <= 117) { activeColor = "#3498db"; isThreshold = true; }
              else if (value > 117) { activeColor = "#e74c3c"; isThreshold = true; }
            }

            const isDark = document.documentElement.classList.contains("dark");
            const pointerColor = isThreshold ? activeColor : (isDark ? "#EBEFF4" : "#000000");

            chart.setOption({
              series: [
                {
                  data: [{ value }],
                  progress: { itemStyle: { color: activeColor } },
                  pointer: { itemStyle: { color: pointerColor } },
                  anchor: { itemStyle: { borderColor: pointerColor } },
                },
              ],
            });
          },
        ),
      );
    }

    // 4. Atmospheric Pressure
    if (atmosphericPressure.current) {
      const chart = echarts.init(atmosphericPressure.current);
      const GAUGE_MIN = 900;
      const GAUGE_MAX = 1100;

      const getPressureColor = (val: number) => {
        if (val < 1006) return "#EBEFF4";
        if (val <= 1009) return "#3498db";
        return "#EBEFF4";
      };

      chart.setOption({
        series: [
          {
            type: "gauge",
            startAngle: 225,
            endAngle: -45,
            min: GAUGE_MIN,
            max: GAUGE_MAX,
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
              itemStyle: { color: "#989898" },
            },
            pointer: {
              icon: "path://M12.8,0.7l12,40.1H0.8L12.8,0.7z",
              length: "60%",
              width: 6,
              offsetCenter: [0, "5%"],
              itemStyle: { color: "#000" },
            },
            axisTick: {
              distance: 10,
              length: 8,
              lineStyle: { color: "#BDBDBD", width: 1 },
            },
            splitLine: {
              distance: 10,
              length: 15,
              lineStyle: { color: "#BDBDBD", width: 2 }, 
            },
            axisLabel: {
              distance: 25,
              color: "#999",
              fontSize: 11,
              formatter: "{value}",
            },
            anchor: {
              show: true,
              showAbove: true,
              size: 18,
              itemStyle: {
                borderWidth: 4,
                borderColor: "#000",
                color: "#fff",
              },
            },
            detail: {
              valueAnimation: true,
              fontSize: 15,
              fontWeight: "bold",
              offsetCenter: [0, "85%"],
              formatter: "{value} hPa",
              color: "#333",
            },
            data: [{ value: 1013 }],
          },
        ],
      });

      charts.push(chart);
      unsubscribers.push(
        onValue(
          ref(database, `/${buoyCode}/BME280/ATMOSPHERIC_PRESSURE`),
          (s) => {
            const value = s.exists() ? toNumberOrZero(s.val()) : 0;
            let activeColor = "#989898";
            let isThreshold = false;

            if (s.exists()) {
              const pressColor = getPressureColor(value);
              if (pressColor !== "#EBEFF4") {
                activeColor = pressColor;
                isThreshold = true;
              }
            }

            const isDark = document.documentElement.classList.contains("dark");
            const pointerColor = isThreshold ? activeColor : (isDark ? "#EBEFF4" : "#000000");

            chart.setOption({
              series: [
                {
                  data: [{ value }],
                  progress: { itemStyle: { color: activeColor } },
                  pointer: { itemStyle: { color: pointerColor } },
                  anchor: { itemStyle: { borderColor: pointerColor } },
                },
              ],
            });
          },
        ),
      );
    }

    // 5. Water Level (Dynamic based on River Wall Height)
    if (waterLevel.current) {
      const chart = echarts.init(waterLevel.current);
      const configRef = ref(database, `/${buoyCode}/CONFIG/WALL_HEIGHT_FEET`);
      const waterRef = ref(database, `/${buoyCode}/MS5837/WATER_LEVEL_FEET`);

      unsubscribers.push(
        onValue(configRef, (configSnapshot) => {
          const wallHeight = configSnapshot.exists()
            ? toNumberOrZero(configSnapshot.val())
            : 15;

          chart.setOption({
            series: [
              {
                type: "gauge",
                max: wallHeight,
                startAngle: 225,
                endAngle: -45,
                splitNumber: 5,
                radius: "100%",
                center: ["50%", "50%"],
                axisLine: { lineStyle: { width: 10, color: [[1, "#EBEFF4"]], } },
                progress: {
                  show: true,
                  width: 10,
                  itemStyle: { color: "#989898" },
                },
                pointer: {
                  icon: "path://M12.8,0.7l12,40.1H0.8L12.8,0.7z",
                  length: "60%",
                  width: 6,
                  offsetCenter: [0, "5%"],
                  itemStyle: { color: "#000" },
                },
                axisTick: {
                  distance: 10,
                  length: 8,
                  lineStyle: { color: "#BDBDBD", width: 1 },
                },
                splitLine: {
                  distance: 10,
                  length: 15,
                  lineStyle: { color: "#BDBDBD", width: 2 },
                },
                axisLabel: {
                  distance: 25,
                  color: "#999",
                  fontSize: 11,
                  formatter: "{value} ft",
                },
                anchor: {
                  show: true,
                  showAbove: true,
                  size: 18,
                  itemStyle: {
                    borderWidth: 4,
                    borderColor: "#000",
                    color: "#fff",
                  },
                },
                detail: {
                  valueAnimation: true,
                  fontSize: 15,
                  fontWeight: "bold",
                  offsetCenter: [0, "85%"],
                  formatter: "{value} ft",
                  color: "#333",
                },
                data: [{ value: 0 }],
              },
            ],
          });

          unsubscribers.push(
            onValue(waterRef, (waterSnapshot) => {
              const value = waterSnapshot.exists()
                ? toNumberOrZero(waterSnapshot.val())
                : 0;

              const percentage = (value / wallHeight) * 100;
              let activeColor = "#989898";
              let isThreshold = false;

              if (waterSnapshot.exists()) {
                if (percentage > 40 && percentage < 100) { activeColor = "#3498db"; isThreshold = true; }
                else if (percentage >= 100) { activeColor = "#e74c3c"; isThreshold = true; }
              }

              const isDark = document.documentElement.classList.contains("dark");
              const pointerColor = isThreshold ? activeColor : (isDark ? "#EBEFF4" : "#000000");

              chart.setOption({
                series: [
                  {
                    max: wallHeight,
                    data: [{ value }],
                    progress: { itemStyle: { color: activeColor } },
                    pointer: { itemStyle: { color: pointerColor } },
                    anchor: { itemStyle: { borderColor: pointerColor } },
                  },
                ],
              });
            }),
          );
        }),
      );

      charts.push(chart);
    }

    // 6. Water Temperature
    if (waterTemperature.current) {
      const chart = echarts.init(waterTemperature.current);
      const GAUGE_MAX = 100;

      const getWaterColor = (val: number) => {
        if (val < 20) return "#EBEFF4";
        if (val <= 25) return "#3498db";
        if (val <= 30) return "#2ecc71";
        return "#e74c3c";
      };

      chart.setOption({
        series: [
          {
            type: "gauge",
            startAngle: 225,
            endAngle: -45,
            min: 0,
            max: GAUGE_MAX,
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
              itemStyle: { color: "#989898" },
            },
            pointer: {
              icon: "path://M12.8,0.7l12,40.1H0.8L12.8,0.7z",
              length: "60%",
              width: 6,
              offsetCenter: [0, "5%"],
              itemStyle: { color: "#000" },
            },
            axisTick: {
              distance: 10,
              length: 8,
               lineStyle: { color: "#BDBDBD", width: 1 },
            },
            splitLine: {
              distance: 10,
              length: 15,
              lineStyle: { color: "#BDBDBD", width: 2 },
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
                borderColor: "#000",
                color: "#fff",
              },
            },
            detail: {
              valueAnimation: true,
              fontSize: 15,
              fontWeight: "bold",
              offsetCenter: [0, "85%"],
              color: "#333",
              formatter: (value: number) => {
                return `${value.toFixed(2)} °C`;
              },
            },
            data: [{ value: 0 }],
          },
        ],
      });

      charts.push(chart);
      unsubscribers.push(
        onValue(ref(database, `/${buoyCode}/MS5837/WATER_TEMPERATURE`), (s) => {
          const value = s.exists() ? toNumberOrZero(s.val()) : 0;
          let activeColor = "#989898";
          let isThreshold = false;

          if (s.exists()) {
            const wTempColor = getWaterColor(value);
            if (wTempColor !== "#EBEFF4") {
              activeColor = wTempColor;
              isThreshold = true;
            }
          }

          const isDark = document.documentElement.classList.contains("dark");
          const pointerColor = isThreshold ? activeColor : (isDark ? "#EBEFF4" : "#000000");

          chart.setOption({
            series: [
              {
                data: [{ value }],
                progress: { itemStyle: { color: activeColor } },
                pointer: { itemStyle: { color: pointerColor } },
                anchor: { itemStyle: { borderColor: pointerColor } },
              },
            ],
          });
        }),
      );
    }

    // 7. Water Pressure
    if (waterPressure.current) {
      const chart = echarts.init(waterPressure.current);
      const GAUGE_MIN = 0;
      const GAUGE_MAX = 400;

      const getWaterPressureColor = (val: number) => {
        if (val < 100) return "#EBEFF4";
        if (val <= 200) return "#3498db";
        return "#e74c3c";
      };

      chart.setOption({
        series: [
          {
            type: "gauge",
            startAngle: 225,
            endAngle: -45,
            min: GAUGE_MIN,
            max: GAUGE_MAX,
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
              itemStyle: { color: "#989898" },
            },
            pointer: {
              icon: "path://M12.8,0.7l12,40.1H0.8L12.8,0.7z",
              length: "60%",
              width: 6,
              offsetCenter: [0, "5%"],
              itemStyle: { color: "#000" },
            },
            axisTick: {
              distance: 10,
              length: 8,
              lineStyle: { color: "#BDBDBD", width: 1 },
            },
            splitLine: {
              distance: 10,
              length: 15,
              lineStyle: { color: "#BDBDBD", width: 2 },
            },
            axisLabel: {
              distance: 25,
              color: "#999",
              fontSize: 11,
              formatter: "{value}",
            },
            anchor: {
              show: true,
              showAbove: true,
              size: 18,
              itemStyle: {
                borderWidth: 4,
                borderColor: "#000",
                color: "#fff",
              },
            },
            detail: {
              valueAnimation: true,
              fontSize: 15,
              fontWeight: "bold",
              offsetCenter: [0, "85%"],
              formatter: "{value} hPa",
              color: "#333",
            },
            data: [{ value: 0 }],
          },
        ],
      });

      charts.push(chart);
      unsubscribers.push(
        onValue(
          ref(database, `/${buoyCode}/MS5837/WATER_PRESSURE`),
          (s) => {
            const value = s.exists() ? toNumberOrZero(s.val()) : 0;
            let activeColor = "#989898";
            let isThreshold = false;

            if (s.exists()) {
              const wPressColor = getWaterPressureColor(value);
              if (wPressColor !== "#EBEFF4") {
                activeColor = wPressColor;
                isThreshold = true;
              }
            }

            const isDark = document.documentElement.classList.contains("dark");
            const pointerColor = isThreshold ? activeColor : (isDark ? "#EBEFF4" : "#000000");

            chart.setOption({
              series: [
                {
                  data: [{ value }],
                  progress: { itemStyle: { color: activeColor } },
                  pointer: { itemStyle: { color: pointerColor } },
                  anchor: { itemStyle: { borderColor: pointerColor } },
                },
              ],
            });
          },
        ),
      );
    }
    // 8. Rain Gauge
    if (rainGauge.current) {
      const chart = echarts.init(rainGauge.current);
      const GAUGE_MAX = 11;

      const getRainColor = (val: number) => {
        if (val < 3) return "#EBEFF4";
        if (val <= 7) return "#3498db";
        return "#e74c3c";
      };

      chart.setOption({
        series: [
          {
            type: "gauge",
            startAngle: 225,
            endAngle: -45,
            min: 0,
            max: GAUGE_MAX,
            splitNumber: 11,
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
              itemStyle: { color: "#989898" },
            },
            pointer: {
              icon: "path://M12.8,0.7l12,40.1H0.8L12.8,0.7z",
              length: "60%",
              width: 6,
              offsetCenter: [0, "5%"],
              itemStyle: { color: "#000" },
            },
            axisTick: {
              distance: 10,
              length: 8,
              lineStyle: { color: "#BDBDBD", width: 1 }, 
            },
            splitLine: {
              distance: 10,
              length: 15,
              lineStyle: { color: "#BDBDBD", width: 2 }, 
            },
            axisLabel: {
              distance: 25,
              color: "#999",
              fontSize: 11,
              formatter: "{value}",
            },
            anchor: {
              show: true,
              showAbove: true,
              size: 18,
              itemStyle: {
                borderWidth: 4,
                borderColor: "#000",
                color: "#fff",
              },
            },
            detail: {
              valueAnimation: true,
              fontSize: 15,
              fontWeight: "bold",
              offsetCenter: [0, "85%"],
              formatter: "{value} mm/h",
              color: "#333",
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
            let activeColor = "#989898";
            let isThreshold = false;

            if (s.exists()) {
              const rColor = getRainColor(value);
              if (rColor !== "#EBEFF4") {
                activeColor = rColor;
                isThreshold = true;
              }
            }

            const isDark = document.documentElement.classList.contains("dark");
            const pointerColor = isThreshold ? activeColor : (isDark ? "#EBEFF4" : "#000000");

            chart.setOption({
              series: [
                {
                  data: [{ value }],
                  progress: { itemStyle: { color: activeColor } },
                  pointer: { itemStyle: { color: pointerColor } },
                  anchor: { itemStyle: { borderColor: pointerColor } },
                },
              ],
            });
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
  }, [sstData, buoyCode]);

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
      <h3 className="text-m font-semibold text-gray-800 dark:text-gray-100 mb-1 text-center">
        {title}
      </h3>
      <div
        ref={valueRef}
        className="w-full h-54 sm:h-60 lg:h-68 flex-grow flex items-center justify-center"
      />
      <div className="w-full text-center mt-1 pt-1  border-gray-200 dark:border-gray-700">
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
          title="Water Level"
          valueRef={waterLevel}
          footerText=""
        />
        <SensorCard
          title="Rainfall Count"
          valueRef={rainGauge}
          footerText=""
        />
        <SensorCard
          title="Surroundings Temperature"
          valueRef={gaugeRef}
          footerText=""
        />
        <SensorCard
          title="Water Temperature"
          valueRef={waterTemperature}
          footerText=""
        />
        <SensorCard
          title="Humidity"
          valueRef={humidityRef}
          footerText=""
        />
        <SensorCard
          title="Wind Speed"
          valueRef={windSpeed}
          footerText=""
        />
        <SensorCard
          title="Atmospheric Pressure"
          valueRef={atmosphericPressure}
          footerText=""
        />
        <SensorCard
          title="Water Pressure"
          valueRef={waterPressure}
          footerText=""
        />
      </div>
    </div>
  );
}