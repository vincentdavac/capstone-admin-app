export default function buoyCondition() {
  return (
    <div className="mt-5 dark:bg-gray-900 p-4 rounded-lg"> 
      <div className="flex gap-6 flex-wrap justify-center lg:justify-start">
        <div className="bg-[#E2F1FF] dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col justify-between h-[106px] w-full sm:w-80 md:w-[345px] overflow-hidden">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">GPS LOCATION</h3>
          <p className="text-[18px] text-gray-600 dark:text-gray-400">120.95° E, 14.67° N</p>
        </div>
        
        <div className="bg-[#E2F1FF] dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col justify-between h-[106px] w-full sm:w-80 md:w-[345px] overflow-hidden">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">BATTERY HEALTH</h3>
          <p className="text-[18px] text-[#53AE22]">85%</p>
        </div>
        
        <div className="bg-[#E2F1FF] dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col justify-between h-[106px] w-full sm:w-80 md:w-[345px] overflow-hidden">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">BUOY TEMPERATURE</h3>
          <p className="text-[18px] text-[#FF0000]">29.3°C / 84.7°F</p>
        </div>
        
        <div className="bg-[#E2F1FF] dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col justify-between h-[106px] w-full sm:w-80 md:w-[345px] overflow-hidden">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">HEIGHT IN SEA SURFACE</h3>
          <p className="text-[18px] text-[#FFC107]">29.3°C</p>
        </div>
      </div>
    </div>
  );
}