const tropicalCard = () => {
  return (
    <div className="lg:col-span-2 flex flex-col gap-4 w-full">
      <div className="w-full h-auto bg-white dark:bg-gray-800 shadow rounded-xl border border-gray-300 dark:border-gray-700 p-4">
        <div className="w-full px-2 sm:px-4 flex items-center h-14 sm:h-16">
            <h1 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">TROPICAL CYCLONE MONITORING TABLE</h1>
          </div>
          <hr className="w-full border-t border-gray-300 dark:border-gray-700" />
        <div className="overflow-x-auto border rounded-xl shadow-sm mt-4 sm:mt-6 border-gray-200 dark:border-gray-700">
          <table className="min-w-full text-xs sm:text-sm text-center border-collapse">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 whitespace-nowrap">
              <tr>
                <th className="px-4 py-3">Sea Surface Temperature (°C / °F)</th>
                <th className="px-4 py-3">Humidity (%)</th>
                <th className="px-4 py-3">Atmospheric Pressure (mbar)</th>
                <th className="px-4 py-3">Water Pressure (mbar)</th>
                <th className="px-4 py-3">Water Temperature (Surface)</th>
                <th className="px-4 py-3">Air Temperature (C/F)</th>
                <th className="px-4 py-3">Wave (Axis / Rotation)</th>
                <th className="px-4 py-3">Wind Speed (km/h or m/s)</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 dark:text-gray-200">
              <tr className="border-t border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2">test</td>
                <td className="px-4 py-2">test</td>
                <td className="px-4 py-2">test</td>
                <td className="px-4 py-2">test</td>
                <td className="px-4 py-2">test</td>
                <td className="px-4 py-2">test</td>
                <td className="px-4 py-2">test</td>
                <td className="px-4 py-2">test</td>
                <td className="px-4 py-2">
                  <span className="w-4 h-4 aspect-square rounded-full inline-block bg-blue-400"></span>
                </td>
              </tr>
              <tr className="border-t border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2">test</td>
                <td className="px-4 py-2">test</td>
                <td className="px-4 py-2">test</td>
                <td className="px-4 py-2">test</td>
                <td className="px-4 py-2">test</td>
                <td className="px-4 py-2">test</td>
                <td className="px-4 py-2">test</td>
                <td className="px-4 py-2">test</td>
                <td className="px-4 py-2">
                  <span className="w-4 h-4 aspect-square rounded-full inline-block bg-yellow-400"></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default tropicalCard;