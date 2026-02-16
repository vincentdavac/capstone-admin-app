import React from "react";
import LineChartRainMonitoring from "../../../../components/charts/line/LineChartRainMonitoring";
import ComponentCard from "../../../../components/common/ComponentCard";
import { RainSensorReading } from "./RainMonitoringComponentCard"; // adjust import if needed

interface RainMonitoringChartProps {
  rainData: RainSensorReading[];
}

const RainMonitoringChart: React.FC<RainMonitoringChartProps> = ({
  rainData,
}) => {
  // Sort data by recordedAt ascending
  const sortedData = [...rainData].sort(
    (a, b) =>
      new Date(a.attributes.recordedAt).getTime() -
      new Date(b.attributes.recordedAt).getTime(),
  );

  // Transform data for chart
  const labels = sortedData.map(
    (item) => `${item.attributes.recordedDate} ${item.attributes.recordedTime}`,
  );
  const percentages = sortedData.map((item) => item.attributes.percentage);

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
          <ComponentCard title="Rain Monitoring">
            <div className="relative w-full h-[220px] sm:h-[280px] lg:h-[380px]">
              {rainData.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                  No rain sensor data available
                </div>
              ) : (
                <LineChartRainMonitoring
                  labels={labels}
                  percentages={percentages}
                />
              )}
            </div>
          </ComponentCard>
        </div>
      </div>
    </div>
  );
};

export default RainMonitoringChart;
