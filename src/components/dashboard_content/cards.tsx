import { ArrowUpIcon, Buoy, ManageUsers } from "../../icons";
import { MapPinHouse, Megaphone } from "lucide-react";

import Badge from "../ui/badge/Badge";

const DashboardCards = () => {
  return (
    <div className="w-full flex items-start justify-start pl-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
        {/* Card 1: Registered Barangays */}
        <div className="rounded-lg border p-6 h-[204px] bg-white dark:bg-gray-800 border-[#D9D9D9] dark:border-gray-700">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl mb-4">
            <ManageUsers className="size-6 text-gray-800 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Registered Barangays
              </span>
              <h4 className="mt-2 text-2xl font-bold text-gray-800 dark:text-white">
                10
              </h4>
            </div>
            <Badge color="success">
              <ArrowUpIcon />
              11.01%
            </Badge>
          </div>
        </div>

        {/* Card 2: Deployed Buoy Devices */}
        <div className="rounded-lg border p-6 h-[204px] bg-white dark:bg-gray-800 border-[#D9D9D9] dark:border-gray-700">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl mb-4">
            <Buoy className="size-6 text-gray-800 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Deployed Buoy Devices
              </span>
              <h4 className="mt-2 text-2xl font-bold text-gray-800 dark:text-white">
                3,782
              </h4>
            </div>
            <Badge color="success">
              <ArrowUpIcon />
              11.01%
            </Badge>
          </div>
        </div>

        {/* Card 3: Active Barangays */}
        <div className="rounded-lg border p-6 h-[204px] bg-white dark:bg-gray-800 border-[#D9D9D9] dark:border-gray-700">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl mb-4">
            <MapPinHouse className="size-6 text-gray-800 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Active Barangays
              </span>
              <h4 className="mt-2 text-2xl font-bold text-gray-800 dark:text-white">
                3,782
              </h4>
            </div>
            <Badge color="success">
              <ArrowUpIcon />
              11.01%
            </Badge>
          </div>
        </div>

        {/* Card 4: Barangay Alerts Posted */}
        <div className="rounded-lg border p-6 h-[204px] bg-white dark:bg-gray-800 border-[#D9D9D9] dark:border-gray-700">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl mb-4">
            <Megaphone  className="size-6 text-gray-800 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Barangay Alerts Posted
              </span>
              <h4 className="mt-2 text-2xl font-bold text-gray-800 dark:text-white">
                3,782
              </h4>
            </div>
            <Badge color="warning">
              <ArrowUpIcon />
              11.01%
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
