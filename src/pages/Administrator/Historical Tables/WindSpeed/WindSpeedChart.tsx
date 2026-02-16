import LineChartWindSpeed from "../../../../components/charts/line/LineChartWindSpeed";
import ComponentCard from "../../../../components/common/ComponentCard";

/* ================= TYPES ================= */

export interface WindSpeedAttributes {
  buoyId: number;
  windSpeedM_s: string;
  windSpeedK_h: string;
  reportStatus: string | null;
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

export interface WindSpeed {
  id: number;
  attributes: WindSpeedAttributes;
}

interface WindSpeedChartProps {
  windSpeed: WindSpeed[];
}

/* ================= COMPONENT ================= */

const WindSpeedChart: React.FC<WindSpeedChartProps> = ({ windSpeed }) => {
  // Sort by recordedAt ascending (important for proper timeline)
  const sortedData = [...windSpeed].sort(
    (a, b) =>
      new Date(a.attributes.recordedAt).getTime() -
      new Date(b.attributes.recordedAt).getTime(),
  );

  // Transform data for chart
  const labels = sortedData.map(
    (item) => `${item.attributes.recordedDate} ${item.attributes.recordedTime}`,
  );

  const windSpeedMS = sortedData.map((item) =>
    Number(item.attributes.windSpeedM_s),
  );

  const windSpeedKH = sortedData.map((item) =>
    Number(item.attributes.windSpeedK_h),
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
          <ComponentCard title="Wind Speed">
            <div className="relative w-full h-[220px] sm:h-[280px] lg:h-[380px]">
              {windSpeed.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                  No wind speed data available
                </div>
              ) : (
                <LineChartWindSpeed
                  labels={labels}
                  windSpeedMS={windSpeedMS}
                  windSpeedKH={windSpeedKH}
                />
              )}
            </div>
          </ComponentCard>
        </div>
      </div>
    </div>
  );
};

export default WindSpeedChart;
