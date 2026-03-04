import React from "react";
import { AlertRow } from "./AlertRow";
import { Printer } from "lucide-react";
import AlertChart from "./alertChart";
import { useState } from "react";
interface RecentAlertsTableProps {
  loading: boolean;
  error: any;
  alertsGet: any[];
  selectedAlertId: number | null;
  handleSelectAlert: (id: number, sensors: string) => void;
  sensorTypes: string | null;
}

export const RecentAlertsTable: React.FC<RecentAlertsTableProps> = ({
  loading,
  error,
  selectedAlertId,
  sensorTypes,
  alertsGet,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [dateError, setDateError] = useState<string>("");

  const itemsPerPage = 8;

  const filteredAlerts = (alertsGet || []).filter((alert: any) => {
    const recordedAt = new Date(alert.recorded_at.replace(" ", "T"));
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(new Date(toDate).getTime() + 59 * 1000) : null;

    if (from && to) {
      return recordedAt >= from && recordedAt <= to;
    }
    if (from) return recordedAt >= from;
    if (to) return recordedAt <= to;
    return true;
  });

  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAlerts = filteredAlerts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const validateDates = (from: string, to: string) => {
    if (from && to && new Date(from) > new Date(to)) {
      setDateError("");
    } else {
      setDateError("");
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="w-full max-w-9xl mx-auto rounded-lg shadow-sm overflow-hidden">
        <div className="flex flex-col gap-2 p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-normal text-gray-500 dark:text-white">
              Alert Historical Data
            </h3>

            <div className="flex flex-row items-center gap-3">
              <div className="flex flex-row items-center gap-2">
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  From
                </label>
                <input
                  type="datetime-local"
                  value={fromDate}
                  onChange={(e) => {
                    setFromDate(e.target.value);
                    setCurrentPage(1);
                    validateDates(e.target.value, toDate);
                  }}
                  className="w-56 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
              </div>

              <div className="flex flex-row items-center gap-2">
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  To
                </label>
                <input
                  type="datetime-local"
                  value={toDate}
                  onChange={(e) => {
                    setToDate(e.target.value);
                    setCurrentPage(1);
                    validateDates(fromDate, e.target.value);
                  }}
                  min={fromDate}
                  className="w-56 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />
              </div>
              <button
                type="button"
                className="h-[42px] flex items-center gap-2 rounded-lg bg-[#453EFE] px-5 text-sm font-medium text-white hover:bg-blue-700 transition"
              >
                <Printer size={16} />
                Generate Report
              </button>
            </div>
          </div>

          {dateError && (
            <div className="flex justify-end">
              <p className="text-xs text-red-500">{dateError}</p>
            </div>
          )}
        </div>

        <div className="rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <AlertChart alerts={filteredAlerts} sensorTypes={sensorTypes} />
        </div>

        <div className="mt-5 rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div
            className="grid w-full text-left text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700"
            style={{ gridTemplateColumns: "1.2fr 1fr 1fr 2fr" }}
          >
            <div className="px-4 py-3">Date/Time</div>
            <div className="px-4 py-3">Sensor Type</div>
            <div className="px-4 py-3 text-center">CCDRRMO Alert Level</div>
            <div className="px-4 py-3">Alert Readings</div>
          </div>

          <div className="w-full">
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
                />
              ))
            ) : (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No alerts found.
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700 space-y-2 sm:space-y-0">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredAlerts.length)} of{" "}
            {filteredAlerts.length} Entries
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50"
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
              className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
