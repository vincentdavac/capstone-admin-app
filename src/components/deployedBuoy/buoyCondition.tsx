export default function buoyCondition() {
  return (
    <div className="mt-5 dark:bg-gray-900 p-4 rounded-lg">
      <div className="flex gap-6 flex-wrap justify-center lg:justify-start">
        <div className="bg-[#E2F1FF] dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col justify-between h-[106px] w-full sm:w-80 md:w-[345px] overflow-hidden">
          <h3 className="text-lg font-semibold text-[#453EFE] dark:text-gray-100">
            INITIAL DEPLOYMENT LOCATION
          </h3>
          <p className="text-[18px] text-[#FF0000] dark:text-gray-400">
            Lat: 14.654321, Long: 120.987654
          </p>
        </div>

        <div className="bg-[#E2F1FF] dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col justify-between h-[106px] w-full sm:w-80 md:w-[345px] overflow-hidden">
          <h3 className="text-lg font-semibold text-[#453EFE] dark:text-gray-100">
            CURRENT GPS LOCATION{" "}
          </h3>
          <p className="text-[18px] text-[#FF0000]">
            Lat: 14.654890, Long: 120.987900
          </p>
        </div>

        <div className="bg-[#E2F1FF] dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col justify-between h-[106px] w-full sm:w-80 md:w-[345px] overflow-hidden">
          <h3 className="text-lg font-semibold text-[#453EFE] dark:text-gray-100">
            BATTERY HEALTH
          </h3>
          <p className="text-[18px] text-[#5eff00bd]">85%</p>
        </div>
        
        <div className="bg-[#fcfcfcea] dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col justify-between h-[106px] w-full sm:w-80 md:w-[345px] overflow-hidden">
          <button className="flex items-center gap-3 px-6 py-3 border border-[#59FF00] rounded-[8px] bg-white hover:bg-gray-50 transition-colors dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-green-400">
              <span className="w-5 h-5 bg-[#59FF00] rounded-full"></span>
              <span className="font-medium text-black dark:text-white">Lights On/Off</span>
          </button>
        </div>
      </div>
    </div>
  );
}
