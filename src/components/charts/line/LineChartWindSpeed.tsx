import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface LineChartWindSpeedProps {
  labels: string[];
  windSpeedMS: number[];
  windSpeedKH: number[];
}

export default function LineChartWindSpeed({
  labels,
  windSpeedMS,
  windSpeedKH,
}: LineChartWindSpeedProps) {
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

    colors: ["#f97316", "#2563eb"],

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
          formatter: (val: number) => `${val} m/s`,
        },
        {
          formatter: (val: number) => `${val} km/h`,
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
          text: "Wind Speed (m/s)",
        },
        labels: {
          formatter: (val: number) => `${val} m/s`,
        },
      },
      {
        opposite: true,
        title: {
          text: "Wind Speed (km/h)",
        },
        labels: {
          formatter: (val: number) => `${val} km/h`,
        },
      },
    ],
  };

  const series = [
    {
      name: "Wind Speed (m/s)",
      data: windSpeedMS,
    },
    {
      name: "Wind Speed (km/h)",
      data: windSpeedKH,
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
