import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface LineChartBatteryHealthProps {
  labels: string[];
  percentages: number[];
  voltages: number[];
}

export default function LineChartBatteryHealth({
  labels,
  percentages,
  voltages,
}: LineChartBatteryHealthProps) {
  const options: ApexOptions = {
    chart: {
      type: "line",
      height: 310,
      fontFamily: "Outfit, sans-serif",
      toolbar: { show: false },
      zoom: { enabled: true },
    },

    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
    },

    colors: ["#22c55e", "#3b82f6"],

    stroke: {
      curve: "smooth",
      width: [3, 3],
    },

    markers: {
      size: 4,
      strokeWidth: 2,
      hover: {
        size: 7,
      },
    },

    dataLabels: {
      enabled: false,
    },

    grid: {
      borderColor: "#e5e7eb",
      strokeDashArray: 4,
    },

    tooltip: {
      shared: true,
      intersect: false,
      y: [
        {
          formatter: (val) => `${val}%`,
        },
        {
          formatter: (val) => `${val} V`,
        },
      ],
    },

    xaxis: {
      categories: labels,
      type: "category",
      labels: {
        rotate: -45,
        style: {
          fontSize: "11px",
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },

    yaxis: [
      {
        title: {
          text: "Battery (%)",
        },
        min: 0,
        max: 100,
        labels: {
          formatter: (val) => `${val}%`,
        },
      },
      {
        opposite: true,
        title: {
          text: "Voltage (V)",
        },
        labels: {
          formatter: (val) => `${val}V`,
        },
      },
    ],
  };

  const series = [
    {
      name: "Battery Percentage",
      data: percentages,
    },
    {
      name: "Voltage",
      data: voltages,
    },
  ];

  return (
    <div className="max-w-full overflow-x-auto custom-scrollbar">
      <div className="min-w-[800px]">
        <Chart options={options} series={series} type="line" height={310} />
      </div>
    </div>
  );
}
