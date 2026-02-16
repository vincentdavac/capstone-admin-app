import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";

import { useState } from "react";

interface AlertData {
  id: number;
  attributes: {
    buoyId: number;
    relayState: string;
    recordedDate: string;
    recordedTime: string;
  };
  buoy: {
    id: number;
    attributes: {
      buoyCode: string;
      riverName: string;
    };
  };
  triggeredBy: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

// ✅ Static Data (Based on your API format)
const alertData: AlertData[] = [
  {
    id: 1,
    attributes: {
      buoyId: 1,
      relayState: "on",
      recordedDate: "February 16, 2026",
      recordedTime: "12:48:13 AM",
    },
    buoy: {
      id: 1,
      attributes: {
        buoyCode: "BUOY-2026-1006",
        riverName: "Tullahan River",
      },
    },
    triggeredBy: {
      id: 2,
      firstName: "Barangay",
      lastName: "Account",
    },
  },
  {
    id: 2,
    attributes: {
      buoyId: 2,
      relayState: "off",
      recordedDate: "February 16, 2026",
      recordedTime: "01:15:22 AM",
    },
    buoy: {
      id: 2,
      attributes: {
        buoyCode: "BUOY-2026-1007",
        riverName: "Marikina River",
      },
    },
    triggeredBy: {
      id: 1,
      firstName: "System",
      lastName: "Auto",
    },
  },
];

const ROWS_PER_PAGE = 10;

const AlertDataTable = () => {
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

  const totalPages = Math.ceil(alertData.length / ROWS_PER_PAGE);
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;

  const currentRows = alertData.slice(startIndex, endIndex);

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
                Relay State
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Triggered By
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Recorded Date
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Recorded Time
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05] text-center">
            {currentRows.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell className="px-5 py-4 text-theme-sm text-gray-500 dark:text-gray-400">
                  {startIndex + index + 1}
                </TableCell>

                <TableCell className="px-5 py-4 text-theme-sm text-gray-800 dark:text-white/90">
                  {row.buoy.attributes.buoyCode}
                </TableCell>

                {/* Normalized River Name */}
                <TableCell className="px-5 py-4 text-theme-sm text-gray-800 dark:text-white/90">
                  {toPascalCase(row.buoy.attributes.riverName)}
                </TableCell>

                <TableCell
                  className={`px-5 py-4 text-theme-sm font-semibold ${
                    row.attributes.relayState === "on"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {row.attributes.relayState.toUpperCase()}
                </TableCell>

                {/* Normalized Triggered By Name */}
                <TableCell className="px-5 py-4 text-theme-sm text-gray-500 dark:text-gray-400">
                  {toPascalCase(row.triggeredBy.firstName)} {toPascalCase(row.triggeredBy.lastName)}
                </TableCell>

                <TableCell className="px-5 py-4 text-theme-sm text-gray-500 dark:text-gray-400">
                  {row.attributes.recordedDate}
                </TableCell>

                <TableCell className="px-5 py-4 text-theme-sm text-gray-500 dark:text-gray-400">
                  {row.attributes.recordedTime}
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

export default AlertDataTable;