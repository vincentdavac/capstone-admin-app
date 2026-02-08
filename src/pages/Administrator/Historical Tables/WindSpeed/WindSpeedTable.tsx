import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";

import { useState } from "react";

interface WindReading {
  id: number; // internal key
  buoy_id: number;
  wind_speed_m_s: number;
  wind_speed_k_h: number;
  recorded_at: string;
}

const windSpeedData: WindReading[] = [
  {
    id: 1,
    buoy_id: 1,
    wind_speed_m_s: 5.4,
    wind_speed_k_h: 19.4,
    recorded_at: "2026-02-03 10:12:00",
  },
  {
    id: 2,
    buoy_id: 1,
    wind_speed_m_s: 7.8,
    wind_speed_k_h: 28.1,
    recorded_at: "2026-02-03 10:22:00",
  },
  {
    id: 3,
    buoy_id: 2,
    wind_speed_m_s: 12.6,
    wind_speed_k_h: 45.4,
    recorded_at: "2026-02-03 10:35:00",
  },
  {
    id: 4,
    buoy_id: 3,
    wind_speed_m_s: 3.2,
    wind_speed_k_h: 11.5,
    recorded_at: "2026-02-03 10:40:00",
  },
];

const ROWS_PER_PAGE = 10;

const WindSpeedTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(windSpeedData.length / ROWS_PER_PAGE);
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;

  const currentRows = windSpeedData.slice(startIndex, endIndex);

  return (
    <div className="mt-5 rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
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
                Buoy ID
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Wind Speed (m/s)
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Wind Speed (km/h)
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Recorded At
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05] text-center">
            {currentRows.map((row, index) => (
              <TableRow key={row.id}>
                {/* No. */}
                <TableCell className="px-5 py-4 text-theme-sm text-gray-500 dark:text-gray-400">
                  {startIndex + index + 1}
                </TableCell>

                {/* Buoy ID */}
                <TableCell className="px-5 py-4 text-theme-sm text-gray-800 dark:text-white/90">
                  {row.buoy_id}
                </TableCell>

                {/* Wind Speed m/s */}
                <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {row.wind_speed_m_s.toFixed(2)}
                </TableCell>

                {/* Wind Speed km/h */}
                <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {row.wind_speed_k_h.toFixed(1)}
                </TableCell>

                {/* Recorded At */}
                <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {row.recorded_at}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination (same UI) */}
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
                         text-gray-700
                         disabled:opacity-50 disabled:cursor-not-allowed
                         hover:bg-gray-100
                         dark:text-white dark:border-gray-700 dark:hover:bg-white/[0.05]
                         dark:disabled:text-gray-400 active:scale-[0.98] transition"
            >
              Previous
            </button>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 text-sm rounded-lg border border-gray-300
                         text-gray-700
                         disabled:opacity-50 disabled:cursor-not-allowed
                         hover:bg-gray-100
                         dark:text-white dark:border-gray-700 dark:hover:bg-white/[0.05]
                         dark:disabled:text-gray-400 active:scale-[0.98] transition"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WindSpeedTable;
