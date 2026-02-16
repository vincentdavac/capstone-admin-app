import React from "react";
import LineChartMS5837Data from "../../../../components/charts/line/LineChartMS5837Data";
import ComponentCard from "../../../../components/common/ComponentCard";
import { MS5837Data } from "./MS5837DataComponentCard";

interface MS5837DataChartProps {
  ms5837Data: MS5837Data[];
}

const MS5837DataChart: React.FC<MS5837DataChartProps> = ({ ms5837Data }) => {
  // Sort data by recordedAt ascending for proper timeline
  const sortedData = [...ms5837Data].sort(
    (a, b) =>
      new Date(a.attributes.recordedAt).getTime() -
      new Date(b.attributes.recordedAt).getTime(),
  );

  // Map chart labels and series
  const labels = sortedData.map(
    (item) => `${item.attributes.recordedDate} ${item.attributes.recordedTime}`,
  );

  const temperatureC = sortedData.map((item) =>
    parseFloat(item.attributes.temperatureCelsius),
  );
  const temperatureF = sortedData.map((item) =>
    parseFloat(item.attributes.temperatureFahrenheit),
  );
  const depthMeters = sortedData.map((item) =>
    parseFloat(item.attributes.depthMeters),
  );
  const depthFeet = sortedData.map((item) =>
    parseFloat(item.attributes.depthFeet),
  );
  const waterPressure = sortedData.map((item) =>
    parseFloat(item.attributes.waterPressure),
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
          <ComponentCard title="MS5837 Sensor Data">
            <div className="relative w-full h-[220px] sm:h-[280px] lg:h-[380px]">
              {ms5837Data.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                  No MS5837 data available
                </div>
              ) : (
                <LineChartMS5837Data
                  labels={labels}
                  temperatureC={temperatureC}
                  temperatureF={temperatureF}
                  depthMeters={depthMeters}
                  depthFeet={depthFeet}
                  waterPressure={waterPressure}
                />
              )}
            </div>
          </ComponentCard>
        </div>
      </div>
    </div>
  );
};

export default MS5837DataChart;
