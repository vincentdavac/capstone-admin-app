import LineChartRainGauge from "../../../../components/charts/line/LineChartRainGauge";
import ComponentCard from "../../../../components/common/ComponentCard";

/* ================= TYPES ================= */

export interface RainGaugeAttributes {
  buoyId: number;
  rainfallMm: string;
  tipCount: number;
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

export interface RainGauge {
  id: number;
  attributes: RainGaugeAttributes;
}

interface RainGaugeChartProps {
  rainGauge: RainGauge[];
}

/* ================= COMPONENT ================= */

const RainGaugeChart: React.FC<RainGaugeChartProps> = ({ rainGauge }) => {
  // Sort by recordedAt ascending (important for timeline)
  const sortedData = [...rainGauge].sort(
    (a, b) =>
      new Date(a.attributes.recordedAt).getTime() -
      new Date(b.attributes.recordedAt).getTime(),
  );

  // Transform data for chart
  const labels = sortedData.map(
    (item) => `${item.attributes.recordedDate} ${item.attributes.recordedTime}`,
  );

  const tipCounts = sortedData.map((item) => item.attributes.tipCount);

  const rainfalls = sortedData.map((item) =>
    parseFloat(item.attributes.rainfallMm),
  );

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
          <ComponentCard title="Rain Gauge">
            <div className="relative w-full h-[220px] sm:h-[280px] lg:h-[380px]">
              {rainGauge.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                  No rain gauge data available
                </div>
              ) : (
                <LineChartRainGauge
                  labels={labels}
                  rainCounts={tipCounts}
                  rainfalls={rainfalls}
                />
              )}
            </div>
          </ComponentCard>
        </div>
      </div>
    </div>
  );
};

export default RainGaugeChart;
