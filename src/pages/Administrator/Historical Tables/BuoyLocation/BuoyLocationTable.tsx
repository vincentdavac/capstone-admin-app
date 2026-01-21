import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";

import Badge from "../../../../components/ui/badge/Badge";

interface BuoyLocation {
  id: number;
  buoy_code: string;
  latitude: number;
  longitude: number;
  status: "Active" | "Offline";
  last_reported: string;
}

const buoyLocations: BuoyLocation[] = [
  {
    id: 1,
    buoy_code: "BUOY-001",
    latitude: 14.5995,
    longitude: 120.9842,
    status: "Active",
    last_reported: "2026-01-20 14:32",
  },
  {
    id: 2,
    buoy_code: "BUOY-002",
    latitude: 14.676,
    longitude: 121.0437,
    status: "Offline",
    last_reported: "2026-01-19 09:10",
  },
];

const BuoyLocationTable = () => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Buoy Code
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Latitude
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Longitude
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Last Reported
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {buoyLocations.map((buoy) => (
              <TableRow key={buoy.id}>
                <TableCell className="px-5 py-4 text-theme-sm text-gray-800 dark:text-white/90">
                  {buoy.buoy_code}
                </TableCell>

                <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {buoy.latitude.toFixed(5)}
                </TableCell>

                <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {buoy.longitude.toFixed(5)}
                </TableCell>

                <TableCell className="px-4 py-3 text-theme-sm">
                  <Badge
                    size="sm"
                    color={buoy.status === "Active" ? "success" : "error"}
                  >
                    {buoy.status}
                  </Badge>
                </TableCell>

                <TableCell className="px-4 py-3 text-theme-sm text-gray-500 dark:text-gray-400">
                  {buoy.last_reported}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BuoyLocationTable;
