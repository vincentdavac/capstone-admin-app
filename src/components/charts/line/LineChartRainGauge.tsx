import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface LineChartRainGaugeProps {
  labels: string[];
  rainCounts: number[];
  rainfalls: number[];
}

export default function LineChartRainGauge({
  labels,
  rainCounts,
  rainfalls,
}: LineChartRainGaugeProps) {
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

    colors: ["#2563eb", "#0ea5e9"],

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
          formatter: (val: number) => `${val} tips`,
        },
        {
          formatter: (val: number) => `${val} mm`,
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
          text: "Tip Count",
        },
        labels: {
          formatter: (val: number) => `${val}`,
        },
      },
      {
        opposite: true,
        title: {
          text: "Rainfall (mm)",
        },
        labels: {
          formatter: (val: number) => `${val} mm`,
        },
      },
    ],
  };

  const series = [
    {
      name: "Tip Count",
      data: rainCounts,
    },
    {
      name: "Rainfall (mm)",
      data: rainfalls,
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
