import Icons from "../../components/dashboard_content/icons";
const searchLocation = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-8">
      <div className="relative w-full sm:w-60 lg:w-[790px]">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-[999]">
          <Icons name="search" className="w-5 h-5 text-gray-400" />
        </span>
        <input
          type="text"
          placeholder="Search Location..."
          className="border rounded-lg pl-10 pr-3 py-2 w-full border-[#D9D9D9] h-12 sm:h-[61px] text-sm sm:text-base focus:ring-[#D9D9D9] focus:border-[#D9D9D9]"
        />
      </div>
      <div className="flex gap-2 mr-1">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">°C</button>
        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium">°F</button>
      </div>
    </div>
  );
};
export default searchLocation;
