// /components/Alert Management/AlertRow.tsx
import React from "react";

export interface Alert {
  id: number;
  recorded_at?: string;
  sensor_type?: string;
  alert_level?: "White" | "Blue" | "Red" | string;
  description?: string;
}

interface AlertRowProps {
  alert: Alert; // Pinalitan ang 'any' ng 'Alert'
  selectedAlertId: number | null;
  sensorTypes: string | null;
}

export const AlertRow: React.FC<AlertRowProps> = ({
  alert,
  selectedAlertId,
  sensorTypes,
}) => {
  const getAlertStyle = (level: string) => {
    switch (level?.toLowerCase()) {
      case "white":
        return "bg-white text-gray-800 border border-gray-300 dark:bg-gray-100 dark:text-gray-800";
      case "blue":
      case "yellow":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-800 dark:text-blue-100";
      case "red":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-800 dark:text-red-100";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-300";
    }
  };

  const formattedDateTime = alert.recorded_at
    ? (() => {
        const dateObj = new Date(alert.recorded_at.replace(" ", "T"));
        const datePart = dateObj.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        const timePart = dateObj.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
        return `${datePart}, ${timePart}`;
      })()
    : "N/A";

  return (
    <div
      className="grid w-full text-xs bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-200 dark:border-gray-700 items-center"
      style={{ gridTemplateColumns: "1.2fr 1fr 1fr 2fr" }}>
      <div className="px-4 py-3 text-xs text-gray-700 dark:text-gray-300">
        {formattedDateTime}
      </div>
      <div className="px-4 py-3 text-xs text-gray-700 dark:text-gray-300">
        {alert.sensor_type || "N/A"}
      </div>
      <div className="px-4 py-3 flex justify-center">
        <span className={`px-3 py-1 rounded-full text-xsfont-medium border ${getAlertStyle(
            alert.alert_level || "",
          )}`}
        >
          {alert.alert_level || "N/A"}
        </span>
      </div>

      <div className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
        {alert.description || "No description"}
      </div>
    </div>
  );
};
