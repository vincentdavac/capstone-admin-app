import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface AlertChartProps {
  alerts: any[];
  sensorTypes: string | null;
}

const AlertChart = ({ alerts }: AlertChartProps) => {
  const hourSlots: string[] = [];
  for (let h = 0; h < 24; h++) {
    const ampm = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    hourSlots.push(`${hour12}:00 ${ampm}`);
  }
  const uniqueSensors = [...new Set(alerts.map((alert) => alert.sensor_type))];
  const seriesData = uniqueSensors.map((sensorId) => {
    const sensorAlerts = alerts.filter(
      (alert) => alert.sensor_type === sensorId,
    );
    const groupedByHour = sensorAlerts.reduce(
      (acc: Record<string, number>, alert) => {
        const d = new Date(alert.recorded_at.replace(" ", "T"));
        const h = d.getHours();
        const ampm = h >= 12 ? "PM" : "AM";
        const hour12 = h % 12 === 0 ? 12 : h % 12;
        const key = `${hour12}:00 ${ampm}`;
        acc[key] = (acc[key] ?? 0) + 1;
        return acc;
      },
      {},
    );

    return {
      name: sensorId ?? "Unknown Sensor",
      data: hourSlots.map((slot) => groupedByHour[slot] ?? 0),
    };
  });

  const options: ApexOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
      stacked: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    markers: {
      size: 4,
    },
    xaxis: {
      categories: hourSlots,
      labels: {
        style: { fontSize: "10px" },
        rotate: -45,
      },
      tickAmount: 24,
    },
    legend: {
      position: "top",
    },
    tooltip: {
      shared: true,
      intersect: false,
      x: {
        formatter: (val: number) => {
          const slot = hourSlots[val - 1];
          const matchingAlert = alerts.find((a) => {
            const d = new Date(a.recorded_at.replace(" ", "T"));
            const h = d.getHours();
            const ampm = h >= 12 ? "PM" : "AM";
            const hour12 = h % 12 === 0 ? 12 : h % 12;
            return `${hour12}:00 ${ampm}` === slot;
          });
          if (!matchingAlert) return slot;
          const d = new Date(matchingAlert.recorded_at.replace(" ", "T"));
          const dateStr = d.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          });

          return `${dateStr} ${slot}`;
        },
      },
      y: { title: { formatter: (name) => `${name}:` } },
    },
    dataLabels: { enabled: false },
    colors: ["#453EFE","#FF4560","#00E396","#FEB019","#775DD0","#FF52A0", "#5B532C",],
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex gap-2">Alert Count</div>
      </div>
      <Chart options={options} series={seriesData} type="line" height={300} />
    </div>
  );
};

export default AlertChart;
