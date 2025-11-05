import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { fetchSensorData } from "../../api_hooks/rainHooks";
export default function WaveHeight() {
  const waveHeight = useRef<HTMLDivElement>(null);
  const { rain } = fetchSensorData();
  useEffect(() => {
    let waveHeightChart: echarts.ECharts | null = null;
    if (!rain || rain.length === 0) return;

    const dates = rain.map((item: any) =>
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
    const sensorValues = rain.map((item: any) => item.percentage);
    console.log("testlagn to",sensorValues);
    
    if (waveHeight.current) {
      waveHeightChart = echarts.init(waveHeight.current);
      const minValue = Math.min(...sensorValues);
      const maxValue = Math.max(...sensorValues);
      const yAxisMin = Math.floor(minValue);
      const yAxisMax = Math.ceil(maxValue);
      waveHeightChart.setOption({
        legend: {
          data: ["Rain (Boolean)"],
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
          interval: 1,
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
            name: "Wave Height (m)",
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
        if (waveHeightChart) {
          waveHeightChart.resize();
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        if (waveHeightChart) {
          waveHeightChart.dispose();
        }
      };
    }
  }, [rain]);

  return <div ref={waveHeight} className="w-full h-full" />;
}
