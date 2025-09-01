
import { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function MapsWithHazard() {
    const gaugeRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const charts: echarts.ECharts[] = [];
    if (gaugeRef.current) {
          const gaugeChart = echarts.init(gaugeRef.current);
    
          gaugeChart.setOption({
            series: [
              {
                type: "gauge",
                startAngle: 180,
                endAngle: 0,
                center: ["50%", "93%"],
                radius: "170%",
                min: 0,
                max: 3,
                splitNumber: 6,
                axisLine: {
                  lineStyle: {
                    width: 6,
                    color: [
                      [1 / 3, "#7CFFB2"], // 0–1m Green
                      [2 / 3, "#FDDD60"], // 1–2m Yellow
                      [2.5 / 3, "#FF9F40"], // 2–2.5m Orange
                      [1, "#ff1100ff"], // 2.5–3m Red
                    ],
                  },
                },
    
                pointer: {
                  icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
                  length: "10%",
                  width: 14,
                  offsetCenter: [0, "-45%"],
                  itemStyle: {
                    color: "auto",
                  },
                },
    
                axisTick: {
                  length: 8,
                  lineStyle: {
                    color: "auto",
                    width: 1.5,
                  },
                },
    
                splitLine: {
                  length: 12,
                  lineStyle: {
                    color: "auto",
                    width: 3,
                  },
                },
    
                axisLabel: {
                  color: "#464646",
                  fontSize: 12,
                  distance: -30,
                  rotate: "tangential",
                  formatter: function (value: number) {
                    return value + "m"; 
                  },
                },
    
                title: {
                  offsetCenter: [0, "-5%"],
                  fontSize: 10,
                },
    
                detail: {
                  fontSize: 16,
                  fontWeight: "bold",
                  offsetCenter: [0, "-25%"],
                  valueAnimation: true,
                  formatter: function (value: number) {
                    return value.toFixed(2) + " m"; 
                  },
                  color: "inherit",
                },
    
                data: [
                  {
                    value: 1, 
                    name: "Water Level",
                  },
                ],
              },
            ],
          });
    
          charts.push(gaugeChart);
        }
        const handleResize = () => {
      charts.forEach((chart) => chart.resize());
    };

    window.addEventListener("resize", handleResize);

    // Cleanup both charts
    return () => {
      window.removeEventListener("resize", handleResize);
      charts.forEach((chart) => chart.dispose());
    };
  }, []);
    return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="border-2 border-[#D9D9D9]  rounded-sm h-64 sm:h-80 lg:h-[580px]"></div>
          <div className="border-2 border-[#D9D9D9]  rounded-sm h-48 sm:h-56 lg:h-[245px] mb-3">
            
          </div>
        </div>
        
        <div className="flex flex-row flex-wrap gap-3 sm:gap-3 lg:gap-1">
          <div className="border-2 border-[#D9D9D9] w-[495px] rounded-sm h-20 sm:h-28 lg:h-[217px]  flex flex-col items-center justify-center">
            <p className="text-xs sm:text-sm lg:text-base font-medium text-gray-700 mb-1">
              Water Level (m)
            </p>
            <div ref={gaugeRef} className="w-full h-full" />
          </div>
            <span>Sample Sentence</span>
          <div className="border-2 border-[#D9D9D9] w-[495px] rounded-sm h-20 sm:h-28 lg:h-[217px]  flex flex-col items-center justify-center">
            <p className="text-xs sm:text-sm lg:text-base font-medium text-gray-700 mb-1">
              Water Level (m)
            </p>
          </div>
            <span>Sample Sentence</span>
          <div className="border-2 border-[#D9D9D9] w-[495px] rounded-sm h-20 sm:h-28 lg:h-[217px]  flex flex-col items-center justify-center">
            <p className="text-xs sm:text-sm lg:text-base font-medium text-gray-700 mb-1">
              Water Level (m)
            </p>
          </div>
          <span>Sample Sentence</span>
    </div>
    </div>
  );
}




