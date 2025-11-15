// /components/Alert Management/AlertRow.tsx
import React from 'react';

export interface Alert {
  id: number;
  recorded_at?: string; 
  sensor_type?: string;
  alert_level?: 'White' | 'Blue' | 'Red' | string; 
  description?: string;
}

interface AlertRowProps {
  alert: Alert; // Pinalitan ang 'any' ng 'Alert'
  selectedAlertId: number | null;
  onSelect: (id: number) => void;
}

export const AlertRow: React.FC<AlertRowProps> = ({
  alert,
  selectedAlertId,
  onSelect,
}) => {
  const getAlertStyle = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'white':
        return 'bg-white text-gray-800 border border-gray-300 dark:bg-gray-100 dark:text-gray-800';
      case 'blue':
      case 'yellow':
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-800 dark:text-blue-100';
      case 'red':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-800 dark:text-red-100';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-300';
    }
  };

  const formattedDateTime = alert.recorded_at?.replace(' ', '\n') || 'N/A';

  return (
    <div
      className="grid text-sm bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-200 dark:border-gray-700"
      style={{
        gridTemplateColumns: '1fr 0.8fr 1fr 2.5fr 0.5fr',
      }}
    >
      {/* Date/Time */}
      <div className="p-3 whitespace-pre-line flex items-center text-xs text-gray-700 dark:text-gray-300">
        {formattedDateTime}
      </div>

      {/* Sensor Type */}
      <div className="p-3 flex items-center text-xs text-gray-700 dark:text-gray-300">
        {alert.sensor_type || 'N/A'}
      </div>

      {/* Alert Level */}
      <div className="p-3 flex items-center justify-center">
        <span
          className={`px-3 py-1 rounded-full text-[10px] font-medium border ${getAlertStyle(
            alert.alert_level || ''
          )}`}
        >
          {alert.alert_level || 'N/A'}
        </span>
      </div>

      {/* Alert Readings */}
      <div className="p-3 text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed flex items-center">
        {alert.description || 'No description'}
      </div>

      {/* Action (Radio Button for Selection) */}
      <div className="p-3 flex items-center justify-center">
        <input
          type="radio"
          name="selectedAlert"
          checked={selectedAlertId === alert.id}
          onChange={() => onSelect(alert.id)}
          className="h-4 w-4 text-[#453EFE] focus:ring-[#453EFE] border-gray-300 cursor-pointer"
        />
      </div>
    </div>
  );
};