import Icons from "../dashboard_content/icons";
import { Archive, Upload } from "lucide-react";
const manageBuoy = () => {
  return (
    <div className="flex justify-start mt-5 w-full">
      <div className="lg:col-span-2 flex flex-col gap-4 w-full">
        <div className="w-full h-auto bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-300 dark:border-gray-700 p-4">
          <div className="w-full px-2 sm:px-4 flex items-center h-14 sm:h-16">
            <h1 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
              SENSORS MONITORING TABLE
            </h1>
          </div>
          <hr className="w-full border-t border-gray-300 dark:border-gray-700" />

          <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col gap-4 items-start sm:flex-row sm:items-center justify-between">
            <div className="flex-shrink-0 flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
              <button className="bg-[#453EFE] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center w-full sm:w-auto">
                + Add Prototype
              </button>
              <button className="bg-[#FFF] border border-[#D9D9D9] text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center w-full sm:w-auto dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600">
                Export CSV
              </button>
            </div>
            <div className="relative w-full sm:w-60 lg:w-96 flex-shrink-0">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-[999]">
                <Icons
                  name="search"
                  className="w-5 h-5 text-gray-400 dark:text-gray-500"
                />
              </span>
              <input
                type="text"
                placeholder="Search by location / buoy ID"
                className="border rounded-lg pl-10 pr-3 py-2 w-full border-[#D9D9D9] h-12 sm:h-[61px] text-sm sm:text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
          <div className="w-full mt-6 overflow-x-auto border rounded-xl shadow-sm bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <table className="min-w-full text-xs sm:text-sm text-center border-collapse">
              <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                <tr>
                  <th className="px-4 py-3">Buoy ID</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Last Transmission</th>
                  <th className="px-4 py-3">Battery</th>
                  <th className="px-4 py-3">Deployment Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 dark:text-gray-200">
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td className="text-center px-4 py-2">test</td>
                  <td className="text-center px-4 py-2">test</td>
                  <td className="text-center px-4 py-2">test</td>
                  <td className="text-center px-4 py-2">test</td>
                  <td className="text-center px-4 py-2">test</td>
                  <td className="text-center px-4 py-2">test</td>
                  <td className="text-center px-4 py-2">
                    <div className="flex items-center justify-center gap-4">
                      <div className="relative group">
                        <button className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg shadow-sm transition">
                          <Upload className="w-5 h-5" />
                        </button>
                        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition dark:bg-gray-600">
                          Update
                        </span>
                      </div>
                      <div className="relative group">
                        <button className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg shadow-sm transition">
                          <Archive className="w-5 h-5" />
                        </button>
                        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition dark:bg-gray-600">
                          Archive
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="border-t border-gray-200 dark:border-gray-700">
                  <td className="text-center px-4 py-2">test</td>
                  <td className="text-center px-4 py-2">test</td>
                  <td className="text-center px-4 py-2">test</td>
                  <td className="text-center px-4 py-2">test</td>
                  <td className="text-center px-4 py-2">test</td>
                  <td className="text-center px-4 py-2">test</td>
                  <td className="text-center px-4 py-2">
                    <div className="flex items-center justify-center gap-4">
                      <div className="relative group">
                        <button className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg shadow-sm transition">
                          <Upload className="w-5 h-5" />
                        </button>
                        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition dark:bg-gray-600">
                          Update
                        </span>
                      </div>
                      <div className="relative group">
                        <button className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg shadow-sm transition">
                          <Archive className="w-5 h-5" />
                        </button>
                        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition dark:bg-gray-600">
                          Archive
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default manageBuoy;
