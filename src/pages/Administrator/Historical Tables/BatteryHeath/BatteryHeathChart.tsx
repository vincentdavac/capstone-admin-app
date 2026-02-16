import LineChartBatteryHealth from "../../../../components/charts/line/LineChartBatteryHealth";
import ComponentCard from "../../../../components/common/ComponentCard";

/* ================= TYPES ================= */

export interface BatteryHealthAttributes {
  buoyId: number;
  percentage: number;
  voltage: number;
  recordedAt: string;
  recordedDate: string;
  recordedTime: string;
  createdDate: string;
  createdTime: string;
  updatedDate: string;
  updatedTime: string;
  buoy: {
    id: number;
    attributes: {
      buoyCode: string;
      riverName: string;
      wallHeight: number;
      riverHectare: number;
      latitude: number;
      longitude: number;
      attachment: string;
      status: string;
      maintenanceAt: string | null;
      createdDate: string;
      createdTime: string;
      updatedDate: string;
      updatedTime: string;
    };
  };
}

export interface BatteryHealth {
  id: number;
  attributes: BatteryHealthAttributes;
}

interface BatteryHeathChartProps {
  batteryHealth: BatteryHealth[];
}

/* ================= COMPONENT ================= */

const BatteryHeathChart: React.FC<BatteryHeathChartProps> = ({
  batteryHealth,
}) => {
  // Sort by recordedAt ascending (important for proper timeline)
  const sortedData = [...batteryHealth].sort(
    (a, b) =>
      new Date(a.attributes.recordedAt).getTime() -
      new Date(b.attributes.recordedAt).getTime(),
  );

  // Transform data for chart
  const labels = sortedData.map(
    (item) => `${item.attributes.recordedDate} ${item.attributes.recordedTime}`,
  );

  const percentages = sortedData.map((item) => item.attributes.percentage);

  const voltages = sortedData.map((item) => item.attributes.voltage);

  return (
    <div className="w-full">
      <div
        className="
          dark:border-gray-700
          rounded-xl
          w-full
          shadow-lg
          overflow-hidden
          min-h-[260px]
          sm:min-h-[320px]
          lg:min-h-[445px]
        "
      >
        <div className="h-full w-full">
          <ComponentCard title="Battery Health">
            <div className="relative w-full h-[220px] sm:h-[280px] lg:h-[380px]">
              {batteryHealth.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                  No battery health data available
                </div>
              ) : (
                <LineChartBatteryHealth
                  labels={labels}
                  percentages={percentages}
                  voltages={voltages}
                />
              )}
            </div>
          </ComponentCard>
        </div>
      </div>
    </div>
  );
};

export default BatteryHeathChart;
