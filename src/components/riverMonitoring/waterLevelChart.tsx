import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { fetchSensorData } from "../../api_hooks/humidityHooks";
export default function WaterLevelChart() {
  const waterLevel = useRef<HTMLDivElement>(null);
  const { humidity } = fetchSensorData()
  useEffect(() => {
     if (!humidity || humidity.length === 0) return;

    const dates = humidity.map((item: any) =>
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
    const sensorValues = humidity.map(
      (item: any) => item.humidity
    );
    const charts: echarts.ECharts[] = [];
    if (waterLevel.current) {
      const waveChart = echarts.init(waterLevel.current);
  
        waveChart.setOption({
          title: {
            text: "Humidity",
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
            axisLabel: {
              fontSize: 8,
              formatter: "{value}%",
              color: "#6b7280",
            },
          },
          series: [
            {
              data: sensorValues,
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
  }, [humidity]);
  return <div ref={waterLevel} className="w-full h-full" />;
}
