import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { fetchSensorData } from "../../api_hooks/windHooks";
export default function WindSpeedChart() {
  const windSpeedRef = useRef<HTMLDivElement>(null);
  const { wind } = fetchSensorData();
  useEffect(() => {
    let windChart: echarts.ECharts | null = null;
    if (!wind || wind.length === 0) return;

    const dates = wind.map((item: any) =>
      new Date(item.recorded_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
    );
    const sensorValues = wind.map((item: any) => item.wind_speed_k_h);
    if (windSpeedRef.current) {
      const minValue = Math.min(...sensorValues);
      const maxValue = Math.max(...sensorValues);
      const padding = 1;
      const yAxisMin = Math.max(0, Math.floor(minValue) - padding);
      const yAxisMax = Math.ceil(maxValue) + padding;

      windChart = echarts.init(windSpeedRef.current);
      windChart.setOption({
        legend: {
          data: ["Wind Speed (k_h)"],
          top: 15,
          left: "center",
          itemWidth: 15,
          itemHeight: 10,
          icon: "box",
          textStyle: {
            fontSize: 11,
            color: "#6b7280",
          },
          itemStyle: {
            color: "#3b82f6",
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: dates,
          axisLabel: {
            fontSize: 10,
            color: "#6b7280",
            formatter: function (value: any) {
              const parts = value.split(",");
              const datePart = parts.slice(0, 2).join(",");
              const timePart = parts[2] ? parts[2].trim() : "";
              return `${datePart}\n${timePart}`;
            },
          },
        },
        yAxis: {
          type: "value",
          min: yAxisMin,
          max: yAxisMax,
          axisLabel: {
            fontSize: 10,
            formatter: "{value}",
            color: "#6b7280",
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#e5e7eb",
              width: 1,
              type: "solid",
            },
          },
        },
        series: [
          {
            name: "Wind Speed (m/s)",
            data: sensorValues,
            type: "line",
            smooth: false,
            symbol: "circle",
            symbolSize: 6,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(59, 130, 246, 0.4)" },
                { offset: 1, color: "rgba(59, 130, 246, 0.1)" },
              ]),
            },
            itemStyle: {
              color: "#3b82f6",
              borderColor: "#3b82f6",
              borderWidth: 2,
            },
            lineStyle: {
              color: "#3b82f6",
              width: 2,
            },
          },
        ],
        grid: {
          top: 60,
          left: 45,
          right: 30,
          bottom: 40,
        },
        backgroundColor: "transparent",
      });

      const handleResize = () => {
        if (windChart) {
          windChart.resize();
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        if (windChart) {
          windChart.dispose();
        }
      };
    }
  }, [wind]);
  return <div ref={windSpeedRef} className="w-full h-full" />;
}
