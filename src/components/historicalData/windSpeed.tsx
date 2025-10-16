import { useEffect, useRef } from "react";
import * as echarts from "echarts";
export default function WindSpeedChart() {
  const windSpeedRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let windChart: echarts.ECharts | null = null;
    if (windSpeedRef.current) {
       windChart = echarts.init(windSpeedRef.current);
       windChart.setOption({
         legend: {
           data: ["Wind Speed (m/s)"],
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
           min: 4.0,
           max: 8.0,
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
             name: "Wind Speed (m/s)",
             data: [4.0,5.1,6.8,8.0,6.0,5.0],
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
   }, []);
  return <div ref={windSpeedRef} className="w-full h-full" />;
}
