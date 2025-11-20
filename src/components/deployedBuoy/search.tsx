import Icons from "../dashboard_content/icons";
export default function searchBuoyStom() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center mb-4 gap-3 sm:gap-45 dark:text-gray-300">
      <div className="relative w-full sm:w-60 lg:w-[946px]">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icons
            name="search"
            className="w-5 h-5 text-gray-400 dark:text-gray-300"
          />
        </span>

        <input
          type="text"
          placeholder="Search Buoy ID..."
          className="border rounded-lg pl-10 pr-3 py-2 w-full border-[#D9D9D9] h-12 sm:h-[61px] text-sm sm:text-base focus:ring-[#D9D9D9] focus:border-[#D9D9D9]dark:bg-[#1E293B] dark:border-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <span className="text-gray-600 text-xs sm:text-sm lg:text-base font-medium dark:text-gray-300">
        BUOY LIGHTS CONTROLLER
      </span>
    </div>
  );
}
