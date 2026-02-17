import React, { useMemo } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export interface DepthData {
  id: number;
  buoy_id: number;
  depth_ft: number;
  recorded_at: string;
}

interface Props {
  data: DepthData[];
}

const LineChartWaterDepth: React.FC<Props> = ({ data }) => {
  // Transform API data for ApexCharts
  const chartData = useMemo(() => {
    return {
      categories: data.map((item) => item.recorded_at),
      series: [
        {
          name: "Water Depth (ft)",
          data: data.map((item) => item.depth_ft),
        },
      ],
    };
  }, [data]);

  const options: ApexOptions = {
    legend: {
      show: false,
    },
    colors: ["#2563EB"], // blue
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.05,
        stops: [0, 90, 100],
      },
    },
    markers: {
      size: 4,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      borderColor: "#E5E7EB",
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (val: number) => `${val} ft`,
      },
    },
    xaxis: {
      categories: chartData.categories,
      labels: {
        rotate: -45,
        style: {
          fontSize: "11px",
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (val: number) => `${Math.round(val)} ft`,
        style: {
          fontSize: "12px",
          colors: ["#6B7280"],
        },
      },
    },
  };

  return (
    <div className="max-w-full overflow-x-auto custom-scrollbar">
      <div id="chartWaterDepth" className="min-w-[1000px]">
        <Chart
          options={options}
          series={chartData.series}
          type="area"
          height={310}
        />
      </div>
    </div>
  );
};

export default LineChartWaterDepth;
