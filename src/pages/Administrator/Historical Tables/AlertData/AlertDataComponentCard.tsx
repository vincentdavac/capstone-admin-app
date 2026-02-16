import React from "react";
import { Printer } from "lucide-react";

import AlertDataTable from "./AlertDataTable";
import AlertDataChart from "./AlertDataChart";
interface AlertDataComponentCardProps {
  className?: string;
}

const AlertDataComponentCard: React.FC<AlertDataComponentCardProps> = ({
  className = "",
}) => {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      {/* Card Header */}
      <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        {/* Title */}
        <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
          Historical Data
        </h3>

        {/* Actions */}
        <div className="flex flex-wrap items-end gap-4">
          {/* From Date & Time */}
          <div className=" gap-1">
            <label className="mr-2 text-xs font-medium text-gray-500 dark:text-gray-400">
              From
            </label>
            <input
              type="datetime-local"
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-500  dark:border-gray-700
      dark:bg-gray-900
      dark:text-white
      dark:[color-scheme:dark]"
            />
          </div>

          {/* To Date & Time */}
          <div className=" gap-1">
            <label className="mr-2 text-xs font-medium text-gray-500 dark:text-gray-400">
              To
            </label>
            <input
              type="datetime-local"
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-500  dark:border-gray-700
      dark:bg-gray-900
      dark:text-white
      dark:[color-scheme:dark]"
            />
          </div>

          {/* Print Button */}
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Printer size={16} />
            Print
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        <AlertDataChart />
        <AlertDataTable />
      </div>
    </div>
  );
};

export default AlertDataComponentCard;
