import { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function Magnitude() {
  const magnitudeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let magnitudeRefChart: echarts.ECharts | null = null;

    if (magnitudeRef.current) {
      magnitudeRefChart = echarts.init(magnitudeRef.current);
      magnitudeRefChart.setOption({
        legend: {
          data: ["Magnitude"],
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
          value:[1,2,3,4,5,6,7,8,9],
        //   min: 1,
        //   max: 9,
          axisLabel: {
            fontSize: 10,
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
            name: "Magnitude",
            data: [1, 1.1, 1.3, 1.4, 1.5, 2.0],
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
        if (magnitudeRefChart) {
          magnitudeRefChart.resize();
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        if (magnitudeRefChart) {
          magnitudeRefChart.dispose();
        }
      };
    }
  }, []);

  return <div ref={magnitudeRef} className="w-full h-full" />;
}
