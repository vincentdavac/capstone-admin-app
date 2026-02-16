import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";

import { useState, useEffect } from "react";
import Badge from "../../../../components/ui/badge/Badge";

/* ============================
    Interfaces
============================ */

export interface BuoyAttributes {
  buoyCode: string;
  riverName: string;
  wallHeight: number;
  riverHectare: number;
  latitude: number;
  longitude: number;
  attachment: string;
  status: string;
  maintenanceAt: string | null;
  createdDate: string;
  createdTime: string;
  updatedDate: string;
  updatedTime: string;
}

export interface GpsReadingAttributes {
  buoyId: number;
  latitude: number;
  longitude: number;
  recordedAt: string;
  recordedDate: string;
  recordedTime: string;
  createdDate: string;
  createdTime: string;
  updatedDate: string;
  updatedTime: string;
  buoy: {
    id: number;
    attributes: BuoyAttributes;
  };
}

export interface GpsReading {
  id: number;
  attributes: GpsReadingAttributes;
}

interface Props {
  gpsReadings: GpsReading[];
}

const ROWS_PER_PAGE = 10;

const BuoyLocationTable = ({ gpsReadings }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  // 🛠 Helper function for Pascal Casing (Normalization)
  const toPascalCase = (str: string) => {
    if (!str) return "";
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  /* Reset page when new data is fetched */
  useEffect(() => {
    setCurrentPage(1);
  }, [gpsReadings]);

  const totalPages = Math.ceil(gpsReadings.length / ROWS_PER_PAGE);

  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;

  const currentRows = gpsReadings.slice(startIndex, endIndex);

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
                River Name
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Latitude
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Longitude
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Wall Height (ft)
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                River Hectare
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Status
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
                <td colSpan={9} className="py-6 text-gray-500 text-center">
                  No GPS records found for selected date range.
                </td>
              </TableRow>
            ) : (
              currentRows.map((reading, index) => {
                const attr = reading.attributes;
                const buoy = attr.buoy.attributes;

                return (
                  <TableRow key={reading.id}>
                    <TableCell className="px-5 py-4 text-theme-sm text-gray-500 dark:text-gray-400">
                      {startIndex + index + 1}
                    </TableCell>

                    <TableCell className="px-5 py-4 font-medium text-gray-800 dark:text-white/90">
                      {buoy.buoyCode}
                    </TableCell>

                    {/* Normalized River Name */}
                    <TableCell className="px-5 py-4 text-gray-600 dark:text-gray-300">
                      {toPascalCase(buoy.riverName)}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 dark:text-gray-400">
                      {attr.latitude.toFixed(6)}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 dark:text-gray-400">
                      {attr.longitude.toFixed(6)}
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 dark:text-gray-400">
                      {buoy.wallHeight} m
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 dark:text-gray-400">
                      {buoy.riverHectare}
                    </TableCell>

                    <TableCell className="px-4 py-3">
                      <Badge
                        size="sm"
                        color={
                          buoy.status.toLowerCase() === "active"
                            ? "success"
                            : "error"
                        }
                      >
                        {/* Normalized Status */}
                        {toPascalCase(buoy.status)}
                      </Badge>
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-500 dark:text-gray-400">
                      {attr.recordedDate} – {attr.recordedTime}
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

export default BuoyLocationTable;