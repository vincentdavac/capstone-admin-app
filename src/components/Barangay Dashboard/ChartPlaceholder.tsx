import React from 'react';

interface ChartPlaceholderProps { 
    title: string 
}

export const ChartPlaceholder: React.FC<ChartPlaceholderProps> = ({ title }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      {/* Chart Title Label Box */}
      <div className="text-center mb-4">
        <div className="inline-flex items-center px-2 py-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
          <div className="w-4 h-2 bg-blue-600 rounded-full mr-2"></div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>
      </div>
      
      {/* Placeholder para sa React Chart. Ang height ay kukunin mula sa parent container. */}
      <div className="w-full flex-1 flex items-center justify-center border border-dashed border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700">
        <p className="text-gray-400 dark:text-gray-500">
          {`REACT CHART COMPONENT HERE (e.g., <LineChart data={chartData} />)`}
        </p>
      </div>
    </div>
  );
};