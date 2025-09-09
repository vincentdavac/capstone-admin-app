import { useEffect, useRef } from "react";
import * as echarts from "echarts";
export default function historicalChart() {
  const sstRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const charts: echarts.ECharts[] = [];
    if (sstRef.current) {
      const waveChart = echarts.init(sstRef.current);

      waveChart.setOption({
        title: {
          text: "Sea Surface Temp(C)",
          textStyle: {
            fontSize: 10,
            fontWeight: "normal",
            color: "#374151",
          },
          left: "center",
          top: 5,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept"],
          axisLabel: {
            fontSize: 8,
            color: "#6b7280",
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            fontSize: 8,
            formatter: "{value}m",
            color: "#6b7280",
          },
        },
        series: [
          {
            data: [27.5,28.0,28.5,29.0,29.5,30.0,20.5,31.0],
            type: "line",
            areaStyle: {
              color: "rgba(59, 130, 246, 0.3)",
            },
            itemStyle: {
              color: "#3b82f6",
            },
            lineStyle: {
              color: "#3b82f6",
            },
          },
        ],
        grid: {
          top: 30,
          left: 25,
          right: 15,
          bottom: 20,
        },
      });
      charts.push(waveChart);
    }

    const handleResize = () => {
      charts.forEach((chart) => chart.resize());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      charts.forEach((chart) => chart.dispose());
    };
  }, []);
  return <div ref={sstRef} className="w-full h-full" />;
}
