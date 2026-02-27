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
    } else if (
      seriesOptions.type === "gauge" &&
      seriesOptions.startAngle === 225
    ) {
      // Handles both Wind Speed and Humidity gauges
      newOptions = {
        series: [
          {
            axisTick: { lineStyle: { color: isDark ? "#666" : "#999" } },
            splitLine: { lineStyle: { color: isDark ? "#666" : "#999" } },
            axisLabel: { color: isDark ? "#aaa" : "#999" },
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
    };
    // 1. Surroundings Temperature (ECharts Gauge)
    if (gaugeRef.current) {
      const chart = echarts.init(gaugeRef.current);
      const GAUGE_MAX = 100;

      const getTemperatureColor = (val: number) => {
        if (val < 27) return "#2ecc71"; // Green: Below 27
        if (val <= 32) return "#2ecc71"; // Green: 27 - 32
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
              itemStyle: { color: "#EBEFF4" },
            },
            pointer: {
              icon: "path://M12.8,0.7l12,40.1H0.8L12.8,0.7z",
              length: "60%",
              width: 6,
              offsetCenter: [0, "5%"],
              itemStyle: { color: "#EBEFF4" },
            },
            axisTick: {
              distance: 10,
              length: 8,
              lineStyle: { color: "#999", width: 1 },
            },
            splitLine: {
              distance: 10,
              length: 15,
              lineStyle: { color: "#999", width: 2 },
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
                borderColor: "#EBEFF4",
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
            let activeColor = "#EBEFF4";

            if (s.exists()) {
              activeColor = getTemperatureColor(value);
            }

            chart.setOption({
              series: [
                {
                  data: [{ value }],
                  progress: { itemStyle: { color: activeColor } },
                  pointer: { itemStyle: { color: activeColor } },
                  anchor: { itemStyle: { borderColor: activeColor } },
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
        if (val < 25) return "#e74c3c"; // Red
        if (val <= 29) return "#3498db"; // Blue
        if (val <= 59) return "#2ecc71"; // Green
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
                color: [[1, "#EBEFF4"]], // Neutral background
              },
            },
            progress: {
              show: true,
              width: 10,
              itemStyle: { color: "#EBEFF4" },
            },
            pointer: {
              icon: "path://M12.8,0.7l12,40.1H0.8L12.8,0.7z",
              length: "60%",
              width: 6,
              offsetCenter: [0, "5%"],
              itemStyle: { color: "#EBEFF4" },
            },
            axisTick: {
              distance: 10,
              length: 8,
              lineStyle: { color: "#999", width: 1 },
            },
            splitLine: {
              distance: 10,
              length: 15,
              lineStyle: { color: "#999", width: 2 },
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
                borderColor: "#EBEFF4",
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
          let activeColor = "#EBEFF4";

          if (s.exists()) {
            activeColor = getHumidityColor(value);
          }

          chart.setOption({
            series: [
              {
                data: [{ value }],
                progress: { itemStyle: { color: activeColor } },
                pointer: { itemStyle: { color: activeColor } },
                anchor: { itemStyle: { borderColor: activeColor } },
              },
            ],
          });
        }),
      );
    }
    // 3. Wind Speed
    if (windSpeed.current) {
      const chart = echarts.init(windSpeed.current);
      const GAUGE_MAX = 200;

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
              itemStyle: { color: "#EBEFF4" },
            },
            pointer: {
              icon: "path://M12.8,0.7l12,40.1H0.8L12.8,0.7z",
              length: "60%",
              width: 6,
              offsetCenter: [0, "5%"],
              itemStyle: { color: "#EBEFF4" },
            },
            axisTick: {
              distance: 10,
              length: 8,
              lineStyle: { color: "#999", width: 1 },
            },
            splitLine: {
              distance: 10,
              length: 15,
              lineStyle: { color: "#999", width: 2 },
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
                borderColor: "#EBEFF4",
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
            let activeColor = "#EBEFF4";
            if (s.exists()) {
              if (value <= 61) activeColor = "#2ecc71";
              else if (value <= 117) activeColor = "#3498db";
              else activeColor = "#e74c3c";
            }
            chart.setOption({
              series: [
                {
                  data: [{ value }],
                  progress: { itemStyle: { color: activeColor } },
                  pointer: { itemStyle: { color: activeColor } },
                  anchor: { itemStyle: { borderColor: activeColor } },
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

  // Corrected logic based on provided pressure thresholds
  const getPressureColor = (val: number) => {
    if (val < 1006) return "#e74c3c";
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
          itemStyle: { color: "#EBEFF4" },
        },
        pointer: {
          icon: "path://M12.8,0.7l12,40.1H0.8L12.8,0.7z",
          length: "60%",
          width: 6,
          offsetCenter: [0, "5%"],
          itemStyle: { color: "#EBEFF4" },
        },
        axisTick: {
          distance: 10,
          length: 8,
          lineStyle: { color: "#999", width: 1 },
        },
        splitLine: {
          distance: 10,
          length: 15,
          lineStyle: { color: "#999", width: 2 },
        },
        axisLabel: {
          distance: 25,
          color: "#999",
          fontSize: 11,
          formatter: "{value}",
        },
        // Styled Anchor
        anchor: {
          show: true,
          showAbove: true,
          size: 18,
          itemStyle: {
            borderWidth: 4,
            borderColor: "#EBEFF4",
            color: "#fff",
          },
        },
        // Styled Text Detail
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
        let activeColor = "#EBEFF4";

        if (s.exists()) {
          activeColor = getPressureColor(value);
        }

        chart.setOption({
          series: [
            {
              data: [{ value }],
              progress: { itemStyle: { color: activeColor } },
              pointer: { itemStyle: { color: activeColor } },
              anchor: { itemStyle: { borderColor: activeColor } },
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
                axisLine: { lineStyle: { width: 10, color: [[1, "#EBEFF4"]] } },
                progress: {
                  show: true,
                  width: 10,
                  itemStyle: { color: "#EBEFF4" },
                },
                pointer: {
                  icon: "path://M12.8,0.7l12,40.1H0.8L12.8,0.7z",
                  length: "60%",
                  width: 6,
                  offsetCenter: [0, "5%"],
                  itemStyle: { color: "#EBEFF4" },
                },
                axisTick: {
                  distance: 10,
                  length: 8,
                  lineStyle: { color: "#999", width: 1 },
                },
                splitLine: {
                  distance: 10,
                  length: 15,
                  lineStyle: { color: "#999", width: 2 },
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
                    borderColor: "#EBEFF4",
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

              let activeColor = "#EBEFF4";
              if (waterSnapshot.exists()) {
                if (percentage <= 40) {
                  activeColor = "#2ecc71"; // Green
                } else if (percentage < 100) {
                  activeColor = "#3498db"; // Blue
                } else {
                  activeColor = "#e74c3c"; // Red
                }
              }

              chart.setOption({
                series: [
                  {
                    max: wallHeight,
                    data: [{ value }],
                    progress: { itemStyle: { color: activeColor } },
                    pointer: { itemStyle: { color: activeColor } },
                    anchor: { itemStyle: { borderColor: activeColor } },
                    detail: { color: "#333" },
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
      const GAUGE_MAX = 50;

      const getWaterColor = (val: number) => {
        if (val < 20) return "#e74c3c";
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
              itemStyle: { color: "#EBEFF4" },
            },
            pointer: {
              icon: "path://M12.8,0.7l12,40.1H0.8L12.8,0.7z",
              length: "60%",
              width: 6,
              offsetCenter: [0, "5%"],
              itemStyle: { color: "#EBEFF4" },
            },
            axisTick: {
              distance: 10,
              length: 8,
              lineStyle: { color: "#999", width: 1 },
            },
            splitLine: {
              distance: 10,
              length: 15,
              lineStyle: { color: "#999", width: 2 },
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
                borderColor: "#EBEFF4",
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
              rich: {
                f: {
                  fontSize: 15,
                  color: "#333",
                  padding: [5, 0],
                  fontWeight: "bold",
                },
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
          let activeColor = "#EBEFF4";

          if (s.exists()) {
            activeColor = getWaterColor(value);
          }

          chart.setOption({
            series: [
              {
                data: [{ value }],
                progress: { itemStyle: { color: activeColor } },
                pointer: { itemStyle: { color: activeColor } },
                anchor: { itemStyle: { borderColor: activeColor } },
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
  const GAUGE_MAX = 400; // Adjusted max to fit range 0-300+

  // Updated logic based on provided pressure thresholds
  const getWaterPressureColor = (val: number) => {
    if (val < 100) return "#2ecc71"; // Green: Minor flooding (<100)
    if (val <= 200) return "#3498db"; // Blue: Noticeable surge (100 - 200)
    return "#e74c3c"; // Red: Severe/Extreme (>200)
  };

  chart.setOption({
    series: [
      {
        type: "gauge",
        // Styling from surroundings temperature
        startAngle: 225,
        endAngle: -45,
        min: GAUGE_MIN,
        max: GAUGE_MAX,
        splitNumber: 10,
        radius: "100%",
        center: ["50%", "50%"],
        
        // Styled Line
        axisLine: {
          lineStyle: {
            width: 10,
            color: [[1, "#EBEFF4"]], // Default gray line
          },
        },
        // Styled Progress
        progress: {
          show: true,
          width: 10,
          itemStyle: { color: "#EBEFF4" },
        },
        // Styled Pointer
        pointer: {
          icon: "path://M12.8,0.7l12,40.1H0.8L12.8,0.7z",
          length: "60%",
          width: 6,
          offsetCenter: [0, "5%"],
          itemStyle: { color: "#EBEFF4" },
        },
        axisTick: {
          distance: 10,
          length: 8,
          lineStyle: { color: "#999", width: 1 },
        },
        splitLine: {
          distance: 10,
          length: 15,
          lineStyle: { color: "#999", width: 2 },
        },
        axisLabel: {
          distance: 25,
          color: "#999",
          fontSize: 11,
          formatter: "{value}",
        },
        // Styled Anchor
        anchor: {
          show: true,
          showAbove: true,
          size: 18,
          itemStyle: {
            borderWidth: 4,
            borderColor: "#EBEFF4",
            color: "#fff",
          },
        },
        // Styled Text Detail
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
        let activeColor = "#EBEFF4";

        if (s.exists()) {
          activeColor = getWaterPressureColor(value);
        }

        chart.setOption({
          series: [
            {
              data: [{ value }],
              progress: { itemStyle: { color: activeColor } },
              pointer: { itemStyle: { color: activeColor } },
              anchor: { itemStyle: { borderColor: activeColor } },
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
      const GAUGE_MAX = 20;

      const getRainColor = (val: number) => {
        if (val < 4) return "#2ecc71";
        if (val <= 8) return "#3498db";
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
              itemStyle: { color: "#EBEFF4" },
            },
            pointer: {
              icon: "path://M12.8,0.7l12,40.1H0.8L12.8,0.7z",
              length: "60%",
              width: 6,
              offsetCenter: [0, "5%"],
              itemStyle: { color: "#EBEFF4" },
            },
            axisTick: {
              distance: 10,
              length: 8,
              lineStyle: { color: "#999", width: 1 },
            },
            splitLine: {
              distance: 10,
              length: 15,
              lineStyle: { color: "#999", width: 2 },
            },
            axisLabel: {
              distance: 25,
              color: "#999",
              fontSize: 11,
              formatter: "{value}",
            },
            // Styled Anchor
            anchor: {
              show: true,
              showAbove: true,
              size: 18,
              itemStyle: {
                borderWidth: 4,
                borderColor: "#EBEFF4",
                color: "#fff",
              },
            },
            // Styled Text Detail
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
            let activeColor = "#EBEFF4";

            if (s.exists()) {
              activeColor = getRainColor(value);
            }

            chart.setOption({
              series: [
                {
                  data: [{ value }],
                  progress: { itemStyle: { color: activeColor } },
                  pointer: { itemStyle: { color: activeColor } },
                  anchor: { itemStyle: { borderColor: activeColor } },
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
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1 text-center">
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
