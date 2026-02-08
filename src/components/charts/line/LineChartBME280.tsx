import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function LineChartBME280() {
  const options: ApexOptions = {
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      labels: {
        colors: "#9CA3AF",
      },
    },
    colors: [
      "#EF4444", // Temperature
      "#3B82F6", // Humidity
      "#10B981", // Pressure
    ],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "area",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    markers: {
      size: 0,
      hover: { size: 5 },
    },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 4,
      yaxis: { lines: { show: true } },
    },
    dataLabels: { enabled: false },
    tooltip: {
      shared: true,
      x: { format: "dd MMM yyyy HH:mm" },
    },
    xaxis: {
      type: "datetime",
      labels: {
        style: {
          colors: "#9CA3AF",
          fontSize: "12px",
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: [
      {
        title: {
          text: "Temperature (°C)",
          style: { color: "#EF4444" },
        },
        labels: {
          style: { colors: "#EF4444" },
        },
      },
      {
        opposite: true,
        title: {
          text: "Humidity (%)",
          style: { color: "#3B82F6" },
        },
        labels: {
          style: { colors: "#3B82F6" },
        },
      },
      {
        opposite: true,
        title: {
          text: "Pressure (hPa)",
          style: { color: "#10B981" },
        },
        labels: {
          style: { colors: "#10B981" },
        },
      },
    ],
  };

  const series = [
    {
      name: "Temperature (°C)",
      data: [
        [1675419120000, 28.5],
        [1675419720000, 28.8],
        [1675420320000, 29.1],
        [1675420920000, 29.0],
      ],
    },
    {
      name: "Humidity (%)",
      data: [
        [1675419120000, 74],
        [1675419720000, 72],
        [1675420320000, 71],
        [1675420920000, 73],
      ],
    },
    {
      name: "Pressure (hPa)",
      data: [
        [1675419120000, 1012],
        [1675419720000, 1011.8],
        [1675420320000, 1011.6],
        [1675420920000, 1011.9],
      ],
    },
  ];

  return (
    <div className="max-w-full overflow-x-auto custom-scrollbar">
      <div id="chartBME280" className="min-w-[1000px]">
        <Chart options={options} series={series} type="line" height={310} />
      </div>
    </div>
  );
}
