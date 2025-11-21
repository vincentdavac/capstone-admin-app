import { ArrowUpIcon, GroupIcon } from "../../icons";
import { fetchUserCounts } from "../../api_hooks/countUsers";
import Badge from "../ui/badge/Badge";
const dashboardCards = () => {
  const { counts, loading, error } = fetchUserCounts();
  return (
    // Siguraduhin na ang pangunahing lalagyan ay gumagamit ng buong lapad
    <div className="w-full flex items-start justify-start pl-1">
      {/* Conditional rendering para sa loading at error states */}
      {loading && <p className="dark:text-white">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {counts && (
        // BINAGO: Gumamit ng Grid layout (grid-cols-4 sa malaking screen, grid-cols-2 sa katamtaman)
        // Ito ay magsisiguro na 4 cards ang magkakatabi kung malaki ang screen.
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
          
          {/* Card 1: Ang grid na ang bahala sa lapad, kaya tinanggal ang w-full/sm:w-[360px] */}
          <div className="rounded-lg text-gray-800 dark:text-white text-xl font-semibold border p-6 h-[204px] bg-white dark:bg-gray-800 border-[#D9D9D9] dark:border-gray-700">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl mb-4">
              <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Total Users</span>
                <h4 className="mt-2 font-bold text-gray-800 dark:text-white text-2xl">{counts.data}</h4>
              </div>
              <Badge color="success">
                <ArrowUpIcon />
                11.01%
              </Badge>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-lg text-gray-800 dark:text-white text-xl font-semibold border p-6 h-[204px] bg-white dark:bg-gray-800 border-[#D9D9D9] dark:border-gray-700">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl mb-4">
              <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Deployed Buoys</span>
                <h4 className="mt-2 font-bold text-gray-800 dark:text-white text-2xl">3,782</h4>
              </div>
              <Badge color="success">
                <ArrowUpIcon />
                11.01%
              </Badge>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-lg text-gray-800 dark:text-white text-xl font-semibold border p-6 h-[204px] bg-white dark:bg-gray-800 border-[#D9D9D9] dark:border-gray-700">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl mb-4">
              <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Pending Concerns</span>
                <h4 className="mt-2 font-bold text-gray-800 dark:text-white text-2xl">3,782</h4>
              </div>
              <Badge color="success">
                <ArrowUpIcon />
                11.01%
              </Badge>
            </div>
          </div>

          {/* Card 4 */}
          <div className="rounded-lg text-gray-800 dark:text-white text-xl font-semibold border p-6 h-[204px] bg-white dark:bg-gray-800 border-[#D9D9D9] dark:border-gray-700">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl mb-4">
              <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Posted Alerts</span>
                <h4 className="mt-2 font-bold text-gray-800 dark:text-white text-2xl">3,782</h4>
              </div>
              <Badge color="success">
                <ArrowUpIcon />
                11.01%
              </Badge>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default dashboardCards;