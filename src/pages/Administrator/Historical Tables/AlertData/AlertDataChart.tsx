import React from "react";
import LineChartAlertStatus from "../../../../components/charts/line/LineChartAlertStatus";
import ComponentCard from "../../../../components/common/ComponentCard";

export interface RelayStatusAttributes {
  buoyId: number;
  relayState: string; // "on" | "off"
  recordedAt: string;
  recordedDate: string;
  recordedTime: string;
}

export interface RelayStatus {
  id: number;
  attributes: RelayStatusAttributes;
  buoy: {
    id: number;
    attributes: {
      buoyCode: string;
      riverName: string;
    };
  };
  triggeredBy: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

interface AlertDataChartProps {
  relayStatuses: RelayStatus[];
}

const AlertDataChart: React.FC<AlertDataChartProps> = ({ relayStatuses }) => {
  // Sort by recordedAt ascending
  const sortedData = [...relayStatuses].sort(
    (a, b) =>
      new Date(a.attributes.recordedAt).getTime() -
      new Date(b.attributes.recordedAt).getTime(),
  );

  // Transform for chart
  const labels = sortedData.map(
    (item) => `${item.attributes.recordedDate} ${item.attributes.recordedTime}`,
  );

  // Map relayState to numeric for charting: "on" = 1, "off" = 0
  const relayStates = sortedData.map((item) =>
    item.attributes.relayState.toLowerCase() === "on" ? 1 : 0,
  );

  return (
    <div className="w-full">
      <div className="dark:border-gray-700 rounded-xl w-full shadow-lg overflow-hidden min-h-[260px] sm:min-h-[320px] lg:min-h-[445px]">
        <div className="h-full w-full">
          <ComponentCard title="Relay Status">
            <div className="relative w-full h-[220px] sm:h-[280px] lg:h-[380px]">
              {relayStatuses.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                  No relay status data available
                </div>
              ) : (
                <LineChartAlertStatus
                  labels={labels}
                  relayStates={relayStates}
                />
              )}
            </div>
          </ComponentCard>
        </div>
      </div>
    </div>
  );
};

export default AlertDataChart;
