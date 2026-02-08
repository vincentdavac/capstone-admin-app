import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function LineChartMS5837Data() {
  const options: ApexOptions = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: [
      "#3B82F6", // Water Depth (Blue)
      "#F97316", // Temperature (Orange)
    ],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "area",
      toolbar: { show: false },
    },
    stroke: {
      curve: "straight",
      width: [2, 2],
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    markers: {
      size: 0,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: { size: 6 },
    },
    grid: {
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    dataLabels: { enabled: false },
    tooltip: {
      enabled: true,
      x: { format: "dd MMM yyyy" },
    },
    xaxis: {
      type: "category",
      categories: [
        "10:00",
        "10:05",
        "10:10",
        "10:15",
        "10:20",
        "10:25",
        "10:30",
        "10:35",
        "10:40",
        "10:45",
        "10:50",
        "10:55",
      ],
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
    },
    yaxis: [
      {
        title: {
          text: "Water Depth (m)",
          style: { color: "#3B82F6" },
        },
        labels: {
          style: {
            fontSize: "12px",
            colors: "#3B82F6",
          },
        },
      },
      {
        opposite: true,
        title: {
          text: "Temperature (°C)",
          style: { color: "#F97316" },
        },
        labels: {
          style: {
            fontSize: "12px",
            colors: "#F97316",
          },
        },
      },
    ],
  };

  const series = [
    {
      name: "Water Depth (m)",
      data: [3.1, 3.3, 3.4, 3.6, 3.5, 3.7, 3.8, 4.0, 4.1, 4.0, 4.2, 4.3],
    },
    {
      name: "Temperature (°C)",
      data: [
        26.1, 26.2, 26.4, 26.3, 26.5, 26.6, 26.7, 26.8, 26.7, 26.9, 27.0, 27.1,
      ],
    },
  ];

  return (
    <div className="max-w-full overflow-x-auto custom-scrollbar">
      <div id="chartEight" className="min-w-[1000px]">
        <Chart options={options} series={series} type="area" height={310} />
      </div>
    </div>
  );
}
