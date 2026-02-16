import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { useState } from "react";
import { BME280Reading } from "./BME280DataChart"; // import the same interface

/* ===== Props ===== */
interface BME280TableProps {
  bmeData: BME280Reading[];
}

const ROWS_PER_PAGE = 10;

const BME280Table: React.FC<BME280TableProps> = ({ bmeData }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(bmeData.length / ROWS_PER_PAGE);
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;

  const currentRows = bmeData.slice(startIndex, endIndex);

  if (!bmeData || bmeData.length === 0) {
    return (
      <div className="h-[200px] flex items-center justify-center text-gray-400">
        No BME280 data available
      </div>
    );
  }

  return (
    <div className="mt-5 rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] text-center">
            <TableRow>
              <TableCell
                className="px-5 py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                isHeader
              >
                No.
              </TableCell>
              <TableCell
                className="px-5 py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                isHeader
              >
                Buoy Code
              </TableCell>
              <TableCell
                className="px-5 py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                isHeader
              >
                Temp (°C)
              </TableCell>
              <TableCell
                className="px-5 py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                isHeader
              >
                Temp (°F)
              </TableCell>
              <TableCell
                className="px-5 py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                isHeader
              >
                Humidity (%)
              </TableCell>
              <TableCell
                className="px-5 py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                isHeader
              >
                Pressure (mbar)
              </TableCell>
              <TableCell
                className="px-5 py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                isHeader
              >
                Pressure (hPa)
              </TableCell>
              <TableCell
                className="px-5 py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                isHeader
              >
                Altitude (m)
              </TableCell>
              <TableCell
                className="px-5 py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400"
                isHeader
              >
                Recorded At
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05] text-center">
            {currentRows.map((row, index) => {
              const { attributes } = row;
              return (
                <TableRow key={row.id}>
                  <TableCell className="px-5 py-4 text-theme-sm text-gray-500 dark:text-gray-400">
                    {startIndex + index + 1}
                  </TableCell>

                  <TableCell className="px-5 py-4 text-theme-sm text-gray-800 dark:text-white/90">
                    {attributes.buoy.attributes.buoyCode}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                    {attributes.temperature.celsius.toFixed(1)}°C
                  </TableCell>

                  <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                    {attributes.temperature.fahrenheit.toFixed(1)}°F
                  </TableCell>

                  <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                    {attributes.humidity.toFixed(1)}%
                  </TableCell>

                  <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                    {attributes.pressure.mbar.toFixed(1)}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                    {attributes.pressure.hpa.toFixed(1)}
                  </TableCell>

                  <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                    {attributes.altitude.toFixed(1)} m
                  </TableCell>

                  <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                    {attributes.recordedDate} {attributes.recordedTime}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
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

export default BME280Table;
