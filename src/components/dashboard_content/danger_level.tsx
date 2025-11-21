import { fetchWaterPreessure } from "../../api_hooks/waterPressure";
import { useEffect, useState } from "react";

const dangerLevel = () => {
  const { waterPressure, loading, error } = fetchWaterPreessure();
  const [level, setLevel] = useState("Low");
  
  useEffect(() => {
    if (waterPressure >= 42) setLevel("High");        
    else if (waterPressure >= 33 && waterPressure <= 41) setLevel("Medium"); 
    else if (waterPressure >= 27 && waterPressure <= 32) setLevel("Low");   
    else setLevel(""); 
  }, [waterPressure]);

  return (
    <>
      <div className="grid grid-cols-1 gap-3">
        <div className="w-full lg:w-[512px] h-auto lg:h-[192px] bg-white dark:bg-gray-800 shadow rounded-2xl border border-[#D9D9D9] dark:border-gray-700 flex flex-col">
          <div className="w-full px-4 pt-4 text-center">
            <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Disaster Alert Level</h3>
          </div>
          <hr className="w-full border-t border-gray-300 dark:border-gray-600" />

          <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full p-4 self-center mt-3 justify-center">
            <label className="flex items-center justify-between w-full h-[35px] rounded-full border border-gray-400 dark:border-gray-500 px-3 cursor-pointer">
              <input
                type="radio"
                name="level"
                value="Low"
                className="w-4 h-4 accent-white" 
                checked={level === "Low"}
                readOnly
              />
              <span className="flex-1 text-center font-normal text-gray-900 dark:text-white">White</span>
            </label>

            <label className="flex items-center justify-between w-full h-[35px] rounded-full border border-blue-400 px-3 cursor-pointer">
              <input
                type="radio"
                name="level"
                value="Medium"
                className="w-4 h-4 accent-blue-500"
                checked={level === "Medium"}
                readOnly
              />
              <span className="flex-1 text-center font-normal text-blue-600 dark:text-blue-400">
                Blue
              </span>
            </label>

            <label className="flex items-center justify-between w-full h-[35px] rounded-full border border-red-500 px-3 cursor-pointer">
              <input
                type="radio"
                name="level"
                value="High"
                className="w-4 h-4 accent-red-500"
                checked={level === "High"}
                readOnly
              />
              <span className="flex-1 text-center font-normal text-red-600 dark:text-red-400">
                Red
              </span>
            </label>
          </div>

          <div className="text-center mt-2 px-4 pb-4">
            <p className="text-gray-700 dark:text-gray-400 italic text-sm leading-snug">
              Imminent emergency situation Highest level monitoring,
              coordination, and reporting
            </p>
          </div>
        </div>

        <div className="w-full lg:w-[512px] min-h-[300px] lg:h-[495px] bg-white dark:bg-gray-800 shadow rounded-2xl border border-[#D9D9D9] dark:border-gray-700 flex items-center justify-center">
          <img
            className="h-auto w-auto max-w-full max-h-full object-contain p-4"
            src="/logo/chart.png"
            alt="Chart"
            width="200" 
            height="200"
          />
        </div>
      </div>
    </>
  );
};

export default dangerLevel;