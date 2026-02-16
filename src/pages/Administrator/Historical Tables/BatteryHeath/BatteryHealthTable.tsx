import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";

import { useState, useEffect } from "react";

/* ================= TYPES ================= */

export interface BatteryHealthAttributes {
  buoyId: number;
  percentage: number;
  voltage: number;
  recordedAt: string;
  recordedDate: string;
  recordedTime: string;
  createdDate: string;
  createdTime: string;
  updatedDate: string;
  updatedTime: string;
  buoy: {
    id: number;
    attributes: {
      buoyCode: string;
      riverName: string;
    };
  };
}

export interface BatteryHealth {
  id: number;
  attributes: BatteryHealthAttributes;
}

interface BatteryHealthTableProps {
  batteryHealth: BatteryHealth[];
}

const ROWS_PER_PAGE = 10;

/* ================= COMPONENT ================= */

const BatteryHealthTable: React.FC<BatteryHealthTableProps> = ({
  batteryHealth,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [batteryHealth]);

  const totalPages = Math.ceil(batteryHealth.length / ROWS_PER_PAGE);
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;

  const currentRows = batteryHealth.slice(startIndex, endIndex);

  return (
    <div className="mt-5 rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* ================= HEADER ================= */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] text-center">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                No.
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Buoy Code
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                River
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Battery %
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Voltage
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Recorded At
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* ================= BODY ================= */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05] text-center">
            {currentRows.length === 0 ? (
              <TableRow>
                <td
                  colSpan={6}
                  className="px-5 py-6 text-gray-500 dark:text-gray-400"
                >
                  No battery health data available
                </td>
              </TableRow>
            ) : (
              currentRows.map((row, index) => {
                const { attributes } = row;

                const isLowBattery = attributes.percentage <= 20;

                return (
                  <TableRow key={row.id}>
                    {/* No. */}
                    <TableCell className="px-5 py-4 text-theme-sm text-gray-500 dark:text-gray-400">
                      {startIndex + index + 1}
                    </TableCell>

                    {/* Buoy Code */}
                    <TableCell className="px-5 py-4 text-theme-sm text-gray-800 dark:text-white/90">
                      {attributes.buoy.attributes.buoyCode}
                    </TableCell>

                    {/* River */}
                    <TableCell className="px-5 py-4 text-theme-sm text-gray-500 dark:text-gray-400">
                      {attributes.buoy.attributes.riverName}
                    </TableCell>

                    {/* Battery % */}
                    <TableCell
                      className={`px-4 py-3 text-theme-sm font-medium ${
                        isLowBattery
                          ? "text-red-600 dark:text-red-400"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {attributes.percentage}%
                    </TableCell>

                    {/* Voltage */}
                    <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                      {attributes.voltage.toFixed(2)} V
                    </TableCell>

                    {/* Recorded At */}
                    <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                      {attributes.recordedDate} {attributes.recordedTime}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* ================= PAGINATION ================= */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 dark:border-white/[0.05]">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </span>

          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-4 py-2 text-sm rounded-lg border border-gray-300
                         disabled:opacity-50 disabled:cursor-not-allowed
                         hover:bg-gray-100 dark:hover:bg-white/[0.05]"
            >
              Previous
            </button>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 text-sm rounded-lg border border-gray-300
                         disabled:opacity-50 disabled:cursor-not-allowed
                         hover:bg-gray-100 dark:hover:bg-white/[0.05]"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BatteryHealthTable;
