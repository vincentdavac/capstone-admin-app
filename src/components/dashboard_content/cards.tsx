import { ArrowUpIcon, GroupIcon } from "../../icons";
import Badge from "../ui/badge/Badge";
const dashboardCards = () => {
  return (
    <div className="p-8 flex items-start justify-start pl-1">
      <div className="flex gap-4 md:gap-6">
        <div className="rounded-lg text-gray-800 text-xl font-semibold border p-6 w-[360px] h-[204px] bg-[#FFFFFF] border-[#D9D9D9]">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl mb-4">
            <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between">
            <div>
              <span className="text-sm text-gray-500">Total Users</span>
              <h4 className="mt-2 font-bold text-gray-800 text-2xl">3,782</h4>
            </div>
            <Badge color="success">
              <ArrowUpIcon />
              11.01%
            </Badge>
          </div>
        </div>

        <div className="rounded-lg text-gray-800 text-xl font-semibold border p-6 w-[360px] h-[204px] bg-[#FFFFFF] border-[#D9D9D9]">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl mb-4">
            <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between">
            <div>
              <span className="text-sm text-gray-500">Deployed Buoys</span>
              <h4 className="mt-2 font-bold text-gray-800 text-2xl">3,782</h4>
            </div>
            <Badge color="success">
              <ArrowUpIcon />
              11.01%
            </Badge>
          </div>
        </div>

        <div className="rounded-lg text-gray-800 text-xl font-semibold border p-6 w-[360px] h-[204px] bg-[#FFFFFF] border-[#D9D9D9]">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl mb-4">
            <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between">
            <div>
              <span className="text-sm text-gray-500">Pending Concerns</span>
              <h4 className="mt-2 font-bold text-gray-800 text-2xl">3,782</h4>
            </div>
            <Badge color="success">
              <ArrowUpIcon />
              11.01%
            </Badge>
          </div>
        </div>

        <div className="rounded-lg text-gray-800 text-xl font-semibold border p-6 w-[360px] h-[204px] bg-[#FFFFFF] border-[#D9D9D9]">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl mb-4">
            <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between">
            <div>
              <span className="text-sm text-gray-500">Posted Alerts</span>
              <h4 className="mt-2 font-bold text-gray-800 text-2xl">3,782</h4>
            </div>
            <Badge color="success">
              <ArrowUpIcon />
              11.01%
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};
export default dashboardCards;
