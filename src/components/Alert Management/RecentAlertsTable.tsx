/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { AlertRow } from './AlertRow'; 

interface RecentAlertsTableProps {
    loading: boolean;
    error: any;
    currentAlerts: any[];
    filteredAlerts: any[];
    itemsPerPage: number;
    currentPage: number;
    totalPages: number;
    selectedAlertId: number | null;
    startIndex: number;
    setCurrentPage: (page: number) => void;
    handleSelectAlert: (id: number,sensors: string) => void;
    sensorTypes: string | null;
    handleBroadcast: () => void; 
}

export const RecentAlertsTable: React.FC<RecentAlertsTableProps> = ({
    loading,
    error,
    currentAlerts,
    filteredAlerts,
    itemsPerPage,
    currentPage,
    totalPages,
    selectedAlertId,
    startIndex,
    setCurrentPage,
    handleSelectAlert,
    handleBroadcast,
    sensorTypes
}) => {
    
    const handleBroadcastClick = () => {
        console.log('Broadcast Alert clicked!');
        handleBroadcast();
        alert('Broadcasting Alert...');
        
    };

    return (
      <div className="space-y-4 lg:pl-8">
        <div className="flex justify-between items-center">
          {/* Recent Alerts Title */}
          <h3 className="text-xl font-normal text-gray-500 dark:text-white">
            Recent Alerts
          </h3>
          <div className="flex items-center gap-3">
            <select className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
              <option>Last 24 hours</option>
              <option>Last 7 days</option>
            </select>
          </div>
        </div>
        
        {/* Table Container */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-x-auto">
          <div className="min-w-full">
            <div
              className="grid text-left text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700"
              style={{ gridTemplateColumns: "1fr 0.8fr 1fr 2.5fr 0.5fr" }}
            >
              <div className="p-3">Date/Time</div>
              <div className="p-3">Sensor Type</div>
              <div className="p-3 text-center">CCDRRMD Alert Level</div>
              <div className="p-3">Alert Readings</div>
              <div className="p-3 text-center">Action</div>
            </div>

            {/* Table Body (Alerts/Loading/No Alerts) */}
            <div>
              {loading ? (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  Loading alerts...
                </div>
              ) : error ? (
                <div className="p-4 text-center text-red-500">
                  Error loading alerts
                </div>
              ) : currentAlerts.length > 0 ? (
                currentAlerts.map((alert: any) => (
                  <AlertRow
                    key={alert.id}
                    alert={alert}
                    selectedAlertId={selectedAlertId}
                    sensorTypes={sensorTypes}
                    onSelect={handleSelectAlert}
                  />
                ))
              ) : (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No alerts found.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-2 space-y-2 sm:space-y-0">
          {/* Showing Entries Text */}
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredAlerts.length)}{" "}
            of {filteredAlerts.length} Entries
          </div>

          <div className="flex flex-col space-y-2 items-end"> 
             {/* 1. Broadcast Alert Button */}
             <button
                onClick={handleBroadcastClick} 
                 disabled={!selectedAlertId}
                className="flex items-center space-x-2 px-4 py-2 bg-[#453EFE] text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-150"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 rotate-45"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                </svg>
                <span>Broadcast Alert</span>
            </button>
            
            {/* 2. Pagination Number Buttons */}
            <div className="flex space-x-1 sm:space-x-2">
              <button
                onClick={() =>
                  setCurrentPage(Math.max(1, currentPage - 1))
                }
                disabled={currentPage === 1}
                className="px-2 sm:px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50"
              >
                Previous
              </button>
              {[...Array(Math.min(totalPages, 5))].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 text-sm rounded ${
                    currentPage === i + 1
                      ? "bg-[#453EFE] text-white"
                      : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="px-2 sm:px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};