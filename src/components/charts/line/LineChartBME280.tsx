import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

/* ===== Props Interface ===== */
interface LineChartBME280Props {
  labels: string[]; // formatted timestamps or dates
  temperatures: number[]; // °C
  humidities: number[]; // %
  pressures: number[]; // hPa
}

export default function LineChartBME280({
  labels,
  temperatures,
  humidities,
  pressures,
}: LineChartBME280Props) {
  /* ===== Chart Options ===== */
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
      labels: { colors: "#9CA3AF" },
    },
    colors: ["#EF4444", "#3B82F6", "#10B981"],
    stroke: {
      curve: "smooth",
      width: [3, 3, 3],
    },
    markers: {
      size: 4,
      strokeWidth: 2,
      hover: { size: 7 },
    },
    dataLabels: { enabled: false },
    grid: { borderColor: "#E5E7EB", strokeDashArray: 4 },
    tooltip: { shared: true, intersect: false },
    xaxis: {
      categories: labels,
      type: "category",
      labels: { rotate: -45, style: { fontSize: "11px" } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: [
      {
        seriesName: "Temperature (°C)",
        title: { text: "Temperature (°C)", style: { color: "#EF4444" } },
        labels: { style: { colors: "#EF4444" } },
      },
      {
        seriesName: "Humidity (%)",
        opposite: true,
        title: { text: "Humidity (%)", style: { color: "#3B82F6" } },
        labels: { style: { colors: "#3B82F6" } },
      },
      {
        seriesName: "Pressure (hPa)",
        opposite: true,
        title: { text: "Pressure (hPa)", style: { color: "#10B981" } },
        labels: { style: { colors: "#10B981" } },
      },
    ],
  };

  /* ===== Series ===== */
  const series = [
    { name: "Temperature (°C)", data: temperatures },
    { name: "Humidity (%)", data: humidities },
    { name: "Pressure (hPa)", data: pressures },
  ];

  /* ===== Empty State ===== */
  if (!labels || labels.length === 0) {
    return (
      <div className="h-[310px] flex items-center justify-center text-gray-400">
        No BME280 data available
      </div>
    );
  }

  return (
    <div className="max-w-full overflow-x-auto custom-scrollbar">
      <div className="min-w-[1000px]">
        <Chart options={options} series={series} type="line" height={310} />
      </div>
    </div>
  );
}
