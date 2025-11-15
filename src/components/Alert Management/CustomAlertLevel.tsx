import React from 'react';

type AlertLevel = "White" | "Blue" | "Red";

interface CustomAlertLevelProps {
    level: AlertLevel;
    colorClass: string;
    isSelected: boolean;
    onSelect: (level: AlertLevel) => void;
}

export const CustomAlertLevel: React.FC<CustomAlertLevelProps> = ({ level, colorClass, isSelected, onSelect }) => {
    return (
      <label 
          className={`relative flex items-center w-[140px] h-[40px] rounded-full px-3 cursor-pointer transition-all border 
              ${isSelected
                  ? "border-gray-800 bg-gray-100 dark:border-white dark:bg-gray-700"
                  : "border-gray-300 hover:border-gray-500 dark:border-gray-600 dark:hover:border-gray-400"
              }
          `}
          onClick={() => onSelect(level)}
      >
          <input
              type="radio"
              name="level"
              value={level}
              checked={isSelected}
              readOnly
              className="absolute opacity-0 w-0 h-0" 
          />
          
          {/* Custom Radio Button/Dot */}
          <span 
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all mr-2 
              ${isSelected ? `border-red-600` : `border-gray-400 dark:border-gray-500`}
          `}>
              {/* Inner Dot */}
              <span className={`w-3 h-3 rounded-full ${isSelected ? 'bg-red-600' : 'bg-transparent'}`}></span>
          </span>

          {/* Label Text */}
          <span className={`flex-1 text-center font-normal ${colorClass}`}>
              {level}
          </span>
      </label>
    );
  };