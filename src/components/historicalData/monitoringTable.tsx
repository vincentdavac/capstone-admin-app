const monitoringTable = () => {
  return (
    <div className="flex justify-center mt-5">
      <div className="lg:col-span-2 flex flex-col gap-4">
        <div className="w-[1413px] h-[407px] bg-white shadow rounded-lg border border-gray-300 p-4">
          <div className="w-full px-4 flex items-center h-16">
            <h1 className="text-lg font-semibold">SENSORS MONITORING TABLE</h1>
          </div>
          <hr className="w-full border-t border-gray-300" />
          <div className="w-[1350px] h-[262px] overflow-hidden border rounded-xl shadow-sm mt-10 ml-3">
            <table className="table-auto w-full h-full text-sm text-center border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2">Water Level (m)</th>
                  <th className="px-4 py-2">
                    Sea Surface Temperature (°C / °F)
                  </th>
                  <th className="px-4 py-2">Temperature (°C)</th>
                  <th className="px-4 py-2">Temperature (°F)</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Recorded At</th>
                  <th className="px-4 py-2">Updated At</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
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
                <tr className="border-t">
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
    </div>
  );
};
export default monitoringTable;
