import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { useState, useEffect } from "react";

/* ================= TYPES ================= */

interface MS5837Attributes {
  temperatureCelsius: string;
  temperatureFahrenheit: string;
  depthMeters: string;
  depthFeet: string;
  waterAltitude: string;
  recordedAt: string;
  recordedDate: string;
  recordedTime: string;
}

interface MS5837Data {
  id: number;
  attributes: MS5837Attributes;
}

interface Props {
  ms5837Data: MS5837Data[];
}

const ROWS_PER_PAGE = 10;

/* ================= COMPONENT ================= */

const MS5837DataTable: React.FC<Props> = ({ ms5837Data }) => {
  const [currentPage, setCurrentPage] = useState(1);

  /* Reset page when data changes */
  useEffect(() => {
    setCurrentPage(1);
  }, [ms5837Data]);

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
                Depth (m)
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
            {currentRows.length === 0 ? (
              <TableRow>
                <td colSpan={7} className="py-6 text-gray-400">
                  No MS5837 data found.
                </td>
              </TableRow>
            ) : (
              currentRows.map((row, index) => {
                const attr = row.attributes;

                return (
                  <TableRow key={row.id}>
                    {/* No */}
                    <TableCell className="px-5 py-4 text-theme-sm text-gray-500 dark:text-gray-400">
                      {startIndex + index + 1}
                    </TableCell>

                    {/* Temp °C */}
                    <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                      {Number(attr.temperatureCelsius).toFixed(2)}°C
                    </TableCell>

                    {/* Temp °F */}
                    <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                      {Number(attr.temperatureFahrenheit).toFixed(2)}°F
                    </TableCell>

                    {/* Depth m */}
                    <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                      {Number(attr.depthMeters).toFixed(2)} m
                    </TableCell>

                    {/* Depth ft */}
                    <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                      {Number(attr.depthFeet).toFixed(2)} ft
                    </TableCell>

                    {/* Water Altitude */}
                    <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                      {Number(attr.waterAltitude).toFixed(2)}
                    </TableCell>

                    {/* Recorded At */}
                    <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                      {`${row.attributes.recordedDate} ${row.attributes.recordedTime}`}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
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
