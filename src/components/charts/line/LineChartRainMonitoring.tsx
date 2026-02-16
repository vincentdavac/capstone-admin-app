import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface LineChartRainMonitoringProps {
  labels: string[];
  percentages: number[];
}

const LineChartRainMonitoring: React.FC<LineChartRainMonitoringProps> = ({
  labels,
  percentages,
}) => {
  const options: ApexOptions = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#465FFF"], // Line color for rain percentage
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line",
      toolbar: { show: false },
    },
    stroke: {
      curve: "smooth", // smoother line for rain trends
      width: 2,
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
      x: { format: "dd MMM yyyy HH:mm" },
      y: {
        formatter: (val) => `${val}%`,
      },
    },
    xaxis: {
      type: "category",
      categories: labels,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { rotate: -45, style: { fontSize: "11px", colors: "#6B7280" } },
    },
    yaxis: {
      labels: { style: { fontSize: "12px", colors: ["#6B7280"] } },
      title: { text: "Rainfall (%)", style: { color: "#465FFF" } },
      min: 0,
      max: 100,
    },
  };

  const series = [
    {
      name: "Rainfall (%)",
      data: percentages,
    },
  ];

  return (
    <div className="max-w-full overflow-x-auto custom-scrollbar">
      <div className="min-w-[1000px]">
        <Chart options={options} series={series} type="area" height={310} />
      </div>
    </div>
  );
};

export default LineChartRainMonitoring;
