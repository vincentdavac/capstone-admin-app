import { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function RainFall() {
  const rainfallRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rainfallChart: echarts.ECharts | null = null;

    if (rainfallRef.current) {
      rainfallChart = echarts.init(rainfallRef.current);

      rainfallChart.setOption({
        legend: {
          data: ["Rainfall (mm)"],
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
            min:0,
            max:250,
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
            name: "Rainfall (mm)",
            data: [55, 130, 150, 90, 230, 170],
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
        if (rainfallChart) {
          rainfallChart.resize();
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        if (rainfallChart) {
          rainfallChart.dispose();
        }
      };
    }
  }, []);

  return <div ref={rainfallRef} className="w-full h-full" />;
}