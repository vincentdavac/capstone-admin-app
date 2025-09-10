import { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function WaveHeight() {
  const waveHeight = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let waveHeightChart: echarts.ECharts | null = null;

    if (waveHeight.current) {
      waveHeightChart = echarts.init(waveHeight.current);

      waveHeightChart.setOption({
        legend: {
          data: ["Wave Height (m)"],
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
            name: "Wave Height (m)",
            data: [1.0, 1.5, 2.0, 2.5, 3.0, 3.5],
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
  }, []);

  return <div ref={waveHeight} className="w-full h-full" />;
}