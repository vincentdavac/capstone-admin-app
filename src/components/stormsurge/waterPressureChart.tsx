import { useEffect, useRef } from "react";
import * as echarts from "echarts";
export default function waterPressures() {
  const waterPressure = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const charts: echarts.ECharts[] = [];
    if (waterPressure.current) {
      const waterpressureChart = echarts.init(waterPressure.current);

      waterpressureChart.setOption({
        title: {
          text: "Water Pressure (kPA)",
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
          data: ["Mar", "Apr", "May", "Jun", "Jul", "Aug"],
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
            data: [1003,1005,1007,1009,1011],
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
      charts.push(waterpressureChart);
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
  return <div ref={waterPressure} className="w-full h-full" />;
}
