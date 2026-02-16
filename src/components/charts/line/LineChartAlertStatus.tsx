import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface LineChartAlertStatusProps {
  labels: string[]; // e.g., ["Feb 16, 2026 08:00", ...]
  relayStates: number[]; // 0 = OFF, 1 = ON
}

export default function LineChartAlertStatus({
  labels,
  relayStates,
}: LineChartAlertStatusProps) {
  // Convert labels + relayStates to ApexCharts series format
  const formattedData = labels.map((label, idx) => ({
    x: new Date(label).getTime(),
    y: relayStates[idx],
  }));

  const options: ApexOptions = {
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#FF4560"], // Red line for alerts
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: 2,
      curve: "smooth",
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.4,
        opacityTo: 0,
      },
    },
    markers: {
      size: 4,
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      x: {
        format: "dd MMM yyyy HH:mm",
      },
      y: {
        formatter: function (value) {
          return value === 1 ? "ON" : "OFF";
        },
      },
    },
    xaxis: {
      type: "datetime",
      title: {
        text: "Recorded Time",
      },
    },
    yaxis: {
      min: 0,
      max: 1,
      tickAmount: 1,
      labels: {
        formatter: function (value) {
          return value === 1 ? "ON" : "OFF";
        },
      },
      title: {
        text: "Relay State",
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  };

  const series = [
    {
      name: "Relay Status",
      data: formattedData,
    },
  ];

  return (
    <div className="max-w-full overflow-x-auto custom-scrollbar">
      <div className="min-w-[1000px]">
        <Chart options={options} series={series} type="area" height={310} />
      </div>
    </div>
  );
}
