import { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function waterDepth() {
  const waterDepthRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let waterDepthChart: echarts.ECharts | null = null;

    if (waterDepthRef.current) {
      waterDepthChart = echarts.init(waterDepthRef.current);

      waterDepthChart.setOption({
        legend: {
          data: ["Water Depth (m)"],
          top: 15,
          left: "center",
          itemWidth: 15,
          itemHeight: 10,
          textStyle: {
            fontSize: 11,
            color: "#6b7280",
          },
          itemStyle: {
            color: "#7dd3fc",
          },
        },
        xAxis: {
          type: "category",
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
          axisLabel: {
            show: true,
            fontSize: 10,
            color: "#6b7280",
            formatter: "{value}",
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
            name: "Water Depth (m)",
            data: [20, 20, 20, 20, 20, 20],
            type: "bar",
            itemStyle: {
              color: "#7dd3fc",
              borderColor: "#0891b2",
              borderWidth: 1,
            },
            barWidth: "50%",
          },
        ],
        grid: {
          top: 60,
          left: 40,
          right: 30,
          bottom: 40,
        },
        backgroundColor: "transparent",
      });

      const handleResize = () => {
        if (waterDepthChart) {
          waterDepthChart.resize();
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        if (waterDepthChart) {
          waterDepthChart.dispose();
        }
      };
    }
  }, []);

  return <div ref={waterDepthRef} className="w-full h-full" />;
}