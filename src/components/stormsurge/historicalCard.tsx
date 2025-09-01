
const historicalCards = () => {
  return (
    <div className="lg:col-span-2 flex flex-col">
      <div className="border-2 border-[#D9D9D9] w-[1480px] h-[616px] mt-8 rounded md:rounded-xl">
        <div className="w-full px-4 pt-4 text-left mt-7">
          <h1 className="text-lg font-semibold mb-3">HISTORICAL DATA</h1>
        </div>
        <hr className="w-full border-t border-gray-300" />
        <div className="flex justify-center pt-5">
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 bg-blue-500 text-white  hover:bg-blue-700 rounded-full">
              Water Level
            </button>
            <button className="px-4 py-2 bg-white text-black  rounded-full border border-blue-700">
              Sea Surface Temp
            </button>
            <button className="px-4 py-2 bg-white text-black rounded-full border border-blue-700">
              Water Pressure
            </button>
            <button className="px-4 py-2 bg-white text-black rounded-full border border-blue-700">
              Atmospheric Pressure
            </button>
            <button className="px-4 py-2 bg-white text-black rounded-full border border-blue-700">
              Wave Height
            </button>
            <button className="px-4 py-2 bg-white text-black rounded-full border border-blue-700">
              Water Depth
            </button>
            <button className="px-4 py-2 bg-white text-black rounded-full border border-blue-700">
              Water Temp
            </button>
            <button className="px-4 py-2 bg-white text-black rounded-full border border-blue-700">
              Wind Speed
            </button>
            <button className="px-4 py-2 bg-white text-black rounded-full border border-blue-700">
              Rainfall
            </button>
          </div>
        </div>
        <div className="w-[1410px] h-[400px] bg-white shadow rounded-xl border border-gray-300 p-4 mx-auto mt-6">
          <div className="flex items-center space-x-2 justify-between">
            <h1 className="text-lg mb-3">Water Level</h1>
            <select
              id="my-select"
              className="block text-nowrap overflow-hidden truncate border border-gray-300 text-[15px] rounded-md p-2 w-[158px] h-[40px]">
              <option value="">
                Last 6 months
              </option>
            </select>
          </div>
           <div
            // ref={waveRef}
            className="border-2 border-[#D9D9D9] rounded-sm h-20 sm:h-28 lg:h-[173px] w-full"
          />
        </div>

      </div>
    </div>
  );
};
export default historicalCards;
