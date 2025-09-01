const dangerLevel = () => {
  return (
    <div className="grid grid-rows-3 gap-4 shrink-0">
      <div className="w-[515px] h-[192px] bg-white shadow rounded-2xl border border-[#D9D9D9] flex flex-col">
        <div className="w-full px-4 pt-4 text-center">
          <h3 className="text-lg font-semibold mb-2">Storm Surge</h3>
        </div>
        <hr className="w-full border-t border-gray-300" />
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm p-4 self-center mt-3">
          <label className="flex items-center justify-between w-[147px] h-[35px] rounded-full border border-blue-600 px-3 cursor-pointer text-blue-600">
            <input
              type="radio"
              name="level"
              value="Low"
              className="w-4 h-4 accent-blue-600"
              checked
            />
            <span className="flex-1 text-center">Normal</span>
          </label>
          <label className="flex items-center justify-between w-[147px] h-[35px] rounded-full border border-red-500 px-3 cursor-pointer text-red-500">
            <input
              type="radio"
              name="level"
              value="Minimal"
              className="w-4 h-4 accent-red-500"
              checked
            />
            <span className="flex-1 text-center">Surge</span>
          </label>
          <label className="flex items-center justify-between w-[147px] h-[35px] rounded-full border border-orange-500 px-3 cursor-pointer text-orange-500">
            <input
              type="radio"
              name="level"
              value="Moderate"
              className="w-4 h-4 accent-orange-500"
              checked
            />
            <span className="flex-1 text-center">Delay</span>
          </label>
          <label className="flex items-center justify-between w-[147px] h-[35px] rounded-full border border-gray-600 px-3 cursor-pointer text-gray-600">
            <input
              type="radio"
              name="level"
              value="Significant"
              className="w-4 h-4 accent-gray-600"
              checked
            />
            <span className="flex-1 text-center">Dwon</span>
          </label>
        </div>
      </div>

      <div className="w-[515px] h-auto bg-white shadow rounded-2xl border border-[#D9D9D9] flex flex-col">
        <div className="w-full px-4 pt-4 text-center">
          <h3 className="text-lg font-semibold mb-2">Tsunami</h3>
        </div>
        <hr className="w-full border-t border-gray-300" />
        <div className="grid grid-cols-3 gap-3 w-full max-w-lg p-4 self-center mt-3">
          <label className="flex items-center justify-between w-[168px] h-[35px] rounded-full border border-blue-600 px-3 cursor-pointer text-blue-600">
            <input
              type="radio"
              name="level1"
              value="Extreme Danger"
              className="w-4 h-4 accent-blue-500"
            />
            <span className="flex-1 text-center">Signal #1</span>
          </label>
          <label className="flex items-center justify-between w-[150px] h-[35px] rounded-full border border-yellow-500 px-3 cursor-pointer text-yellow-500 ml-2">
            <input
              type="radio"
              name="level2"
              value="High Alert"
              className="w-4 h-4 accent-yellow-500"
            />
            <span className="flex-1 text-center">Signal #2</span>
          </label>

          <label className="flex items-center justify-between w-[160px] h-[35px] rounded-full border border-orange-500 px-3 cursor-pointer text-orange-500">
            <input
              type="radio"
              name="level3"
              value="Watch"
              className="w-4 h-4 accent-orange-500"
            />
            <span className="flex-1 text-center">Signal #3</span>
          </label>

          <div className="col-span-3 flex justify-center gap-3 mt-2">
            <label className="flex items-center justify-between w-[160px] h-[35px] rounded-full border border-red-600 px-3 cursor-pointer text-red-600">
              <input
                type="radio"
                name="level4"
                value="High Pressure"
                className="w-4 h-4 accent-red-600"
              />
              <span className="flex-1 text-center">Signal #4</span>
            </label>

            <label className="flex items-center justify-between w-[160px] h-[35px] rounded-full border border-purple-600 px-3 cursor-pointer text-purple-600">
              <input
                type="radio"
                name="level5"
                value="Normal"
                className="w-4 h-4 accent-purple-600"
              />
              <span className="flex-1 text-center">Signal #5</span>
            </label>
          </div>
        </div>
      </div>

      <div className="w-[515px] h-[192px] bg-white shadow rounded-2xl border border-[#D9D9D9] flex flex-col">
        <div className="w-full px-4 pt-4 text-center">
          <h3 className="text-lg font-semibold mb-2">Storm Surge</h3>
        </div>
        <hr className="w-full border-t border-gray-300" />
        <div className="grid grid-cols-2 gap-3 w-full max-w-sm p-4 self-center mt-3">
          <label className="flex items-center justify-between w-[147px] h-[35px] rounded-full border border-blue-600 px-3 cursor-pointer text-blue-600">
            <input
              type="radio"
              name="level"
              value="Low"
              className="w-4 h-4 accent-blue-600"
              checked
            />
            <span className="flex-1 text-center">Low</span>
          </label>
          <label className="flex items-center justify-between w-[147px] h-[35px] rounded-full border border-yellow-500 px-3 cursor-pointer text-yellow-500">
            <input
              type="radio"
              name="level"
              value="Minimal"
              className="w-4 h-4 accent-yellow-500"
              checked
            />
            <span className="flex-1 text-center">Minimal</span>
          </label>
          <label className="flex items-center justify-between w-[147px] h-[35px] rounded-full border border-orange-500 px-3 cursor-pointer text-orange-500">
            <input
              type="radio"
              name="level"
              value="Moderate"
              className="w-4 h-4 accent-orange-500"
              checked
            />
            <span className="flex-1 text-center">Moderate</span>
          </label>
          <label className="flex items-center justify-between w-[147px] h-[35px] rounded-full border border-red-600 px-3 cursor-pointer text-red-600">
            <input
              type="radio"
              name="level"
              value="Significant"
              className="w-4 h-4 accent-red-600"
              checked
            />
            <span className="flex-1 text-center">Significant</span>
          </label>
        </div>
      </div>
    </div>
  );
};
export default dangerLevel;
