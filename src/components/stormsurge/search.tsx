import Icons from "../../components/dashboard_content/icons";
export default function searchBuoyStom() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center mb-4 gap-3 sm:gap-[45px]">
      <div className="relative w-full sm:w-60 lg:w-[946px]">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-[999]">
          <Icons name="search" className="w-5 h-5 text-gray-400" />
        </span>
        <input
          type="text"
          placeholder="Search"
          className="border rounded-lg pl-10 pr-3 py-2 w-full border-[#D9D9D9] h-12 sm:h-[61px] text-sm sm:text-base focus:ring-[#D9D9D9] focus:border-[#D9D9D9]"
        />
      </div>

      <div className="flex items-center sm:justify-center sm:flex-1">
        <span className="text-gray-600 text-[20px] font-medium whitespace-nowrap overflow-hidden text-ellipsis">
          REAL-TIME HAZARD STATUS OVERVIEW
        </span>
      </div>
    </div>
  );
}
