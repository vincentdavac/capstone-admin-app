import { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function WaterLevelChart() {
  const waterTemp = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let waterTempChart: echarts.ECharts | null = null;

    if (waterTemp.current) {
      waterTempChart = echarts.init(waterTemp.current);
      waterTempChart.setOption({
        legend: {
          data: ["Water Temperature (°C)"],
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
          data: ["Mar", "Apr", "May", "Jun", "Jul", "Aug"],
          axisLabel: {
            fontSize: 11,
            color: "#6b7280",
            margin: 10,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          min: 25.0,
          max: 28.0,
          interval: 0.5,
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
            name: "Water Temperature (°C)",
            data: [25.2, 25.8, 26.5, 27.2, 27.7, 27.3],
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
        if (waterTempChart) {
          waterTempChart.resize();
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        if (waterTempChart) {
          waterTempChart.dispose();
        }
      };
    }
  }, []);

  return <div ref={waterTemp} className="w-full h-full" />;
}