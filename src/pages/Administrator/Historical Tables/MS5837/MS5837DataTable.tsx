import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { useState } from "react";

interface MS5837Data {
  id: number; // internal key
  temperature_celsius: number;
  temperature_fahrenheit: number;
  depth_ft: number;
  depth_m: number;
  water_altitude: number;
  recorded_at: string;
}

const ms5837Data: MS5837Data[] = [
  {
    id: 1,
    temperature_celsius: 26.4,
    temperature_fahrenheit: 79.5,
    depth_ft: 12.3,
    depth_m: 3.75,
    water_altitude: 1.2,
    recorded_at: "2026-02-03 10:12:00",
  },
  {
    id: 2,
    temperature_celsius: 26.8,
    temperature_fahrenheit: 80.2,
    depth_ft: 14.1,
    depth_m: 4.3,
    water_altitude: 1.4,
    recorded_at: "2026-02-03 10:22:00",
  },
];

const ROWS_PER_PAGE = 10;

const MS5837DataTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(ms5837Data.length / ROWS_PER_PAGE);
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;

  const currentRows = ms5837Data.slice(startIndex, endIndex);

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
                Temp (°C)
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Temp (°F)
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Depth (ft)
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Depth (m)
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Water Altitude
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

                {/* Temp °C */}
                <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {row.temperature_celsius.toFixed(1)}°C
                </TableCell>

                {/* Temp °F */}
                <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {row.temperature_fahrenheit.toFixed(1)}°F
                </TableCell>

                {/* Depth ft */}
                <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {row.depth_ft.toFixed(2)} ft
                </TableCell>

                {/* Depth m */}
                <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {row.depth_m.toFixed(2)} m
                </TableCell>

                {/* Water Altitude */}
                <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {row.water_altitude.toFixed(2)}
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

export default MS5837DataTable;
