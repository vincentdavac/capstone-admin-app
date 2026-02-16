import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface LineChartMS5837DataProps {
  labels: string[];
  temperatureC: number[];
  temperatureF: number[];
  depthMeters: number[];
  depthFeet: number[];
  waterPressure: number[];
}

export default function LineChartMS5837Data({
  labels,
  temperatureC,
  // temperatureF,
  // depthMeters,
  depthFeet,
  waterPressure,
}: LineChartMS5837DataProps) {
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
    colors: [
      "#3B82F6", // Depth Meters
      "#F97316", // Temperature °C
      "#22C55E", // Water Pressure
    ],
    stroke: {
      curve: "smooth",
      width: [2, 2, 2],
    },
    markers: {
      size: 3,
      strokeWidth: 2,
      hover: { size: 6 },
    },
    dataLabels: { enabled: false },
    grid: {
      borderColor: "#e5e7eb",
      strokeDashArray: 4,
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: [
        { formatter: (val) => `${val} m` }, // Depth
        { formatter: (val) => `${val} °C` }, // Temp C
        { formatter: (val) => `${val} kPa` }, // Water Pressure (example unit)
      ],
    },
    xaxis: {
      categories: labels,
      type: "category",
      labels: {
        rotate: -45,
        style: { fontSize: "11px" },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: [
      {
        title: { text: "Depth (ft)" },
        labels: { formatter: (val) => `${val} ft` },
      },
      {
        opposite: true,
        title: { text: "Temperature (°C)" },
        labels: { formatter: (val) => `${val} °C` },
      },
      {
        opposite: true,
        title: { text: "Water Pressure" },
        labels: { formatter: (val) => `${val}` },
      },
    ],
  };

  const series = [
    { name: "Depth (ft)", data: depthFeet },
    { name: "Temperature (°C)", data: temperatureC },
    { name: "Water Pressure", data: waterPressure },
  ];

  return (
    <div className="max-w-full overflow-x-auto custom-scrollbar">
      <div className="min-w-[1000px]">
        <Chart options={options} series={series} type="line" height={310} />
      </div>
    </div>
  );
}
