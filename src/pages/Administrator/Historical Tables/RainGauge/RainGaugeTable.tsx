import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";

import { useState } from "react";

interface RainGauge {
  id: number; // internal key
  buoy_id: number;
  rainfall_mm: number;
  tip_count: number;
  created_at: string;
}

const rainGaugeData: RainGauge[] = [
  {
    id: 1,
    buoy_id: 1,
    rainfall_mm: 12.5,
    tip_count: 50,
    created_at: "2026-02-03 10:12:00",
  },
  {
    id: 2,
    buoy_id: 1,
    rainfall_mm: 3.2,
    tip_count: 13,
    created_at: "2026-02-03 10:22:00",
  },
  {
    id: 3,
    buoy_id: 2,
    rainfall_mm: 18.7,
    tip_count: 75,
    created_at: "2026-02-03 10:35:00",
  },
  {
    id: 4,
    buoy_id: 3,
    rainfall_mm: 0.8,
    tip_count: 3,
    created_at: "2026-02-03 10:40:00",
  },
];

const ROWS_PER_PAGE = 10;

const RainGaugeTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(rainGaugeData.length / ROWS_PER_PAGE);
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;

  const currentRows = rainGaugeData.slice(startIndex, endIndex);

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
                Rainfall (mm)
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Tip Count
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Created At
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

                {/* Rainfall */}
                <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {row.rainfall_mm.toFixed(2)} mm
                </TableCell>

                {/* Tip Count */}
                <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {row.tip_count}
                </TableCell>

                {/* Created At */}
                <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {row.created_at}
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

export default RainGaugeTable;
