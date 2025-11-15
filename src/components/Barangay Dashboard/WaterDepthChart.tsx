import React, { useState } from 'react';
import { ChartPlaceholder } from './ChartPlaceholder'; // Import the placeholder component

interface SensorOptionProps { 
    label: string, 
    isChecked: boolean, 
    onClick: () => void 
}

const SensorOption: React.FC<SensorOptionProps> = ({ label, isChecked, onClick }) => (
    <label 
        className="flex items-center cursor-pointer whitespace-nowrap"
        onClick={onClick}
    >
      <div 
        className={`flex items-center justify-center w-4 h-4 rounded-full border-2 
          ${isChecked ? 'border-blue-600' : 'border-gray-500 dark:border-gray-400'} 
          transition-colors duration-200`}
      >
        {isChecked && (
          <div className="w-2 h-2 rounded-full bg-blue-600"></div>
        )}
      </div>
      <span className="ml-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">{label}</span>
    </label>
);

export const WaterDepthChart: React.FC = () => {
  
  const [selectedSensor, setSelectedSensor] = useState('Water Depth');
  const [selectedPeriod, setSelectedPeriod] = useState('Month');


  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:shadow-xl transition-colors duration-300">

      <div className="flex flex-col space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="flex flex-col gap-2">
            
            {/* First Row: 6 Main Sensors */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {[
                'Surroundings Temperature', 'Humidity', 'Atmospheric Pressure', 
                'Water Depth', 'Water Temperature', 'Wind Speed'
              ].map(label => (
                <SensorOption 
                  key={label}
                  label={label}
                  isChecked={selectedSensor === label}
                  onClick={() => setSelectedSensor(label)}
                />
              ))}
            </div>

            {/* Second Row: 3 Additional Sensors */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {[
                'Rain Gauge', 'Rain', 'Accelerometer and Gyroscope'
              ].map(label => (
                <SensorOption 
                  key={label}
                  label={label}
                  isChecked={selectedSensor === label}
                  onClick={() => setSelectedSensor(label)}
                />
              ))}
            </div>

          </div>

          {/* Date Range Buttons - Month is selected */}
          <div className="flex space-x-0 bg-gray-100 dark:bg-gray-700 p-0.5 rounded-lg self-start">
            {['Day', 'Week', 'Month'].map(period => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                  period === selectedPeriod 
                    ? 'bg-white text-gray-800 dark:bg-gray-100 dark:text-gray-800 shadow'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

      </div>

      <hr className="my-4 border-gray-200 dark:border-gray-700" />
      <div className="w-full h-[400px] relative"> 
        <ChartPlaceholder title={`${selectedSensor} (m)`} />
      </div>
    </div>
  );
};