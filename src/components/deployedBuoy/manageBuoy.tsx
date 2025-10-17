import Icons from "../dashboard_content/icons";
import { Archive, Upload } from "lucide-react";
const manageBuoy = () => {
  return (
    <div className="flex justify-start mt-5">
      <div className="lg:col-span-2 flex flex-col gap-4">
        <div className="w-[1450px] h-auto bg-white shadow rounded-lg border border-gray-300 p-4">
          <div className="w-full px-4 flex items-center h-16">
            <h1 className="text-lg font-semibold">SENSORS MONITORING TABLE</h1>
          </div>
          <hr className="w-full border-t border-gray-300" />

          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-shrink-0 flex items-center gap-3">
              <button className="bg-[#453EFE] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                + Add Prototype
              </button>
              <button className="bg-[#FFF] border border-[#D9D9D9] text-black px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center">
                Export CSV
              </button>
            </div>
            <div className="relative w-full sm:w-60 lg:w-[353.9px]">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-[999]">
                <Icons name="search" className="w-5 h-5 text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Search by location / buoy ID"
                className="border rounded-lg pl-10 pr-3 py-2 w-full border-[#D9D9D9] h-12 sm:h-[61px] text-sm sm:text-base focus:ring-[#D9D9D9] focus:border-[#D9D9D9]"
              />
            </div>
          </div>
          <div className="w-full h-[262px] overflow-hidden border rounded-xl shadow-sm mt-6 bg-white">
            <table className="table-auto w-full h-full text-sm text-center border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2">Buoy ID</th>
                  <th className="px-4 py-2">Location</th>
                  <th className="px-4 py-2">Last Transmission</th>
                  <th className="px-4 py-2">Battery</th>
                  <th className="px-4 py-2">Deployment Date</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="text-center">test</td>
                  <td className="text-center">test</td>
                  <td className="text-center">test</td>
                  <td className="text-center">test</td>
                  <td className="text-center">test</td>
                  <td className="text-center">test</td>
                  <td className="text-center">
                    <div className="flex items-center justify-center gap-4">
                      <div className="relative group">
                        <button className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg shadow-sm transition">
                          <Upload className="w-5 h-5" />
                        </button>
                        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition">
                          Update
                        </span>
                      </div>
                      <div className="relative group">
                        <button className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg shadow-sm transition">
                          <Archive className="w-5 h-5" />
                        </button>
                        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition">
                          Archive
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="text-center">test</td>
                  <td className="text-center">test</td>
                  <td className="text-center">test</td>
                  <td className="text-center">test</td>
                  <td className="text-center">test</td>
                  <td className="text-center">test</td>
                  <td className="text-center">
                    <div className="flex items-center justify-center gap-4">
                      <div className="relative group">
                        <button className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg shadow-sm transition">
                          <Upload className="w-5 h-5" />
                        </button>
                        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition">
                          Update
                        </span>
                      </div>
                      <div className="relative group">
                        <button className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg shadow-sm transition">
                          <Archive className="w-5 h-5" />
                        </button>
                        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition">
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
