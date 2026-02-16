import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";

import { useState, useEffect } from "react";

/* ================= TYPES ================= */

export interface RainGaugeAttributes {
  buoyId: number;
  rainfallMm: string;
  tipCount: number;
  recordedAt: string;
  recordedDate: string;
  recordedTime: string;
  buoy: {
    id: number;
    attributes: {
      buoyCode: string;
      riverName: string;
    };
  };
}

export interface RainGauge {
  id: number;
  attributes: RainGaugeAttributes;
}

interface RainGaugeTableProps {
  rainGauge: RainGauge[];
}

const ROWS_PER_PAGE = 10;

/* ================= COMPONENT ================= */

const RainGaugeTable: React.FC<RainGaugeTableProps> = ({ rainGauge }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page when data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [rainGauge]);

  const totalPages = Math.ceil(rainGauge.length / ROWS_PER_PAGE);
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;

  const currentRows = rainGauge.slice(startIndex, endIndex);

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
                  No rain gauge data available
                </td>
              </TableRow>
            ) : (
              currentRows.map((row, index) => {
                const { attributes } = row;

                const rainfall = parseFloat(attributes.rainfallMm);

                // Optional intensity highlighting
                const isHeavyRain = rainfall >= 7.5;

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

                    {/* Rainfall */}
                    <TableCell
                      className={`px-4 py-3 text-theme-sm font-medium ${
                        isHeavyRain
                          ? "text-red-600 dark:text-red-400"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {rainfall.toFixed(2)} mm
                    </TableCell>

                    {/* Tip Count */}
                    <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                      {attributes.tipCount}
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

export default RainGaugeTable;
