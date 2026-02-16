import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function LineChartAlertStatus() {

  // 🔹 Static relay status sample data
  const staticData = [
    { recorded_at: "2026-02-16 08:00:00", relay_state: 0 },
    { recorded_at: "2026-02-16 09:00:00", relay_state: 1 },
    { recorded_at: "2026-02-16 10:00:00", relay_state: 1 },
    { recorded_at: "2026-02-16 11:00:00", relay_state: 0 },
    { recorded_at: "2026-02-16 12:00:00", relay_state: 1 },
    { recorded_at: "2026-02-16 13:00:00", relay_state: 0 },
  ];

  // Convert to ApexCharts format
  const formattedData = staticData.map((item) => ({
    x: new Date(item.recorded_at).getTime(),
    y: item.relay_state,
  }));

  const options: ApexOptions = {
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#FF4560"],
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
      name: "Alert Status",
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