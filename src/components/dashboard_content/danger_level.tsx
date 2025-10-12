const dangerLevel = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-3">
        <div className="w-[512px] h-[192px] bg-white shadow rounded-2xl border border-[#D9D9D9] flex flex-col">
          <div className="w-full px-4 pt-4 text-center">
            <h3 className="text-lg font-medium mb-2">Disaster Alert Level</h3>
          </div>
          <hr className="w-full border-t border-gray-300" />
          <div className="grid grid-cols-3 gap-4 w-full p-4 self-center mt-3 justify-center">
            <label className="flex items-center justify-between w-[149px] h-[35px] rounded-full border border-gray-400 px-3 cursor-pointer">
              <input
                type="radio"
                name="level"
                value="Low"
                className="w-4 h-4 accent-gray-500"
              />
              <span className="flex-1 text-center font-normal">White</span>
            </label>

            <label className="flex items-center justify-between w-[149px] h-[35px] rounded-full border border-gray-400 px-3 cursor-pointer">
              <input
                type="radio"
                name="level"
                value="Medium"
                className="w-4 h-4 accent-gray-500"
              />
              <span className="flex-1 text-center font-normal">Blue</span>
            </label>

            <label className="flex items-center justify-between w-[149px] h-[35px] rounded-full border border-red-500 px-3 cursor-pointer text-red-500">
              <input
                type="radio"
                name="level"
                value="High"
                className="w-4 h-4 accent-red-500"
                defaultChecked
              />
              <span className="flex-1 text-center font-normal text-black">
                Red
              </span>
            </label>
          </div>

          <div className="text-center mt-2 px-4">
            <p className="text-gray-700 italic text-sm leading-snug">
              Imminent emergency situation Highest level monitoring,
              coordination, and reporting
            </p>
          </div>
        </div>
        <div className="w-[512px] h-[495px] bg-white shadow rounded-2xl border border-[#D9D9D9] flex items-center justify-center">
          <img className="h-auto w-auto object-cover" src="/logo/chart.png" alt="Logo" width="100" height="100" />
        </div>
      </div>
    </>
  );
};
export default dangerLevel;
