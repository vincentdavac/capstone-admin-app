const monitoringTable = () => {
  return (
    <div className="flex justify-center mt-5">
      <div className="lg:col-span-2 flex flex-col gap-4">
        <div className="w-[1413px] h-[407px] bg-white shadow rounded-lg border border-gray-300 p-4">
          <div className="w-full px-4 flex items-center h-16">
            <h1 className="text-xl font-normal text-gray-500 dark:text-white">Surrounding Temperature Monitoring Table</h1>
          </div>
          <hr className="w-full border-t border-gray-300" />
          <div className="w-[1350px] h-[262px] overflow-hidden border rounded-xl shadow-sm mt-10 ml-3">
            <table className="table-auto w-full h-full text-sm text-center border-collapse">
              <thead className="text-sm font-light bg-gray-100 text-gray-500">
                <tr>
                  <th className="px-4 py-2 text-sm font-normal">Temperature (°C)</th>
                  <th className="px-4 py-2 text-sm font-normal">Temperature (°F)</th>
                  <th className="px-4 py-2 text-sm font-normal">Status</th>
                  <th className="px-4 py-2 text-sm font-normal">Recorded At</th>
                  <th className="px-4 py-2 text-sm font-normal">Updated At</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-2 text-sm font-normal">test</td>
                  <td className="px-4 py-2 text-sm font-normal">test</td>
                  <td className="px-4 py-2 text-sm font-normal">test</td>
                  <td className="px-4 py-2 text-sm font-normal">2025-09-07 08:00</td>
                  <td className="px-4 py-2 text-sm font-normal">2025-09-07 08:05</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2 text-sm font-normal">test</td>
                  <td className="px-4 py-2 text-sm font-normal">test</td>
                  <td className="px-4 py-2 text-sm font-normal">test</td>
                  <td className="px-4 py-2 text-sm font-normal">2025-09-07 08:05</td>
                  <td className="px-4 py-2 text-sm font-normal">2025-09-07 08:05</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default monitoringTable;
