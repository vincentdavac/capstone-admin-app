const tropicalCard = () => {
  return (
    <div className="lg:col-span-2 flex flex-col gap-4">
      <div className="w-[1480px] h-[407px] bg-white shadow rounded-xl border border-gray-300 p-4">
        <div className="w-full px-4 flex items-center h-16">
            <h1 className="text-lg font-semibold">TROPICAL CYCLONE MONITORING TABLE</h1>
          </div>
          <hr className="w-full border-t border-gray-300" />
        <div className="w-[1409px] h-[262px] overflow-hidden border rounded-xl shadow-sm mt-10 ml-3">
          <table className="table-auto w-full h-full text-sm text-center border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2">Sea Surface Temperature (°C / °F)</th>
                <th className="px-4 py-2">Humidity (%)</th>
                <th className="px-4 py-2">Atmospheric Pressure (mbar)</th>
                <th className="px-4 py-2">Water Pressure (mbar)</th>
                <th className="px-4 py-2">Water Temperature (Surface)</th>
                <th className="px-4 py-2">Air Temperature (C/F)</th>
                <th className="px-4 py-2">Wave (Axis / Rotation)</th>
                <th className="px-4 py-2">Wind Speed (km/h or m/s)</th>
                <th className="px-4 py-2">Status</th>
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
