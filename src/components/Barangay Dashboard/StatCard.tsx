// /components/Barangay Dashboard/StatCard.tsx
import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  trend?: string;
  icon: React.ReactNode;
  status?: 'Normal';
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, trend, icon, status }) => (
  // 1. Inayos ang padding sa 'p-6' (Mas malaki)
  <div className="flex flex-col p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:shadow-xl transition-colors duration-300 h-full"> 
    
    {/* ROW 1: Icon Box (Top-Left) */}
    {/* Pinalaki ang padding ng icon container (p-3) at ang icon size (w-6 h-6) */}
    <div className="p-3 bg-gray-100 rounded-lg text-gray-500 dark:bg-gray-700 dark:text-gray-300 mb-4 self-start"> 
      {React.isValidElement(icon)
        ? React.cloneElement(icon as React.ReactElement<React.SVGProps<SVGSVGElement>>, { className: "w-6 h-6" }) // w-6 h-6
        : icon}
    </div>
    
    {/* ROW 2: Title (Text only) */}
    {/* Pinalaki ang title size sa text-base */}
    <p className="text-base text-gray-500 dark:text-gray-400 mb-1">{title}</p>

    {/* ROW 3: Value, Trend, at Status (All on one line, justify-between) */}
    <div className="flex items-end justify-between">
      
      {/* Value (Big Text - text-3xl) */}
      <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
      
      <div className="flex items-center space-x-2">
        {/* Trend Percentage */}
        {trend && trend !== '-' && (
          // Pinalaki ang trend size sa text-sm
          <div className="flex items-center text-sm font-semibold text-green-500 dark:text-green-400"> 
            <svg className="w-3 h-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            {trend}
          </div>
        )}

        {/* Status Badge */}
        {status === 'Normal' && (
          // Pinalaki ang padding at font size ng status badge
          <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100">
            Normal
          </span>
        )}
      </div>
    </div>
  </div>
);