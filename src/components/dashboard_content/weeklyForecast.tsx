const WeatherForecast = () => {
  return (
    <>
      <div className="border border-[#D9D9D9] shadow rounded-2xl p-6 w-[572px] h-[570px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            7-Day Forecast
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex justify-between items-center w-[251px]">
            <div>
              <p className="text-xs text-gray-600 mb-1">Mon, June 19</p>
              <p className="text-2xl font-bold text-gray-900 mb-1">28.1°C</p>
              <p className="text-xs text-gray-600">Rain: 20%</p>
            </div>
            <div className="relative w-12 h-12 flex-shrink-0">
              <img className="h-auto w-auto object-cover" src="/logo/sunCloud.svg"  alt="Logo" width="100" height="100"/>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex justify-between items-center w-[251px]">
            <div>
              <p className="text-xs text-gray-600 mb-1">Tue, June 20</p>
              <p className="text-2xl font-bold text-gray-900 mb-1">26°C</p>
              <p className="text-xs text-gray-600">Rain: 60%</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
              <img className="h-auto w-auto object-cover" src="/logo/CloudRain.svg" alt="Logo" width="100" height="100" />
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex justify-between items-center w-[251px]">
            <div>
              <p className="text-xs text-gray-600 mb-1">Wed, June 21</p>
              <p className="text-2xl font-bold text-gray-900 mb-1">25°C</p>
              <p className="text-xs text-gray-600">Rain: 80%</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
              <img className="h-auto w-auto object-cover" src="/logo/CloudRainThunder.svg"alt="Logo"width="100" height="100"/>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex justify-between items-center w-[251px]">
            <div>
              <p className="text-xs text-gray-600 mb-1">Thu, June 22</p>
              <p className="text-2xl font-bold text-gray-900 mb-1">26°C</p>
              <p className="text-xs text-gray-600">Rain: 90%</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
              <img className="h-auto w-auto object-cover" src="/logo/CloudRain.svg" alt="Logo" width="100" height="100" />
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex justify-between items-center w-[251px]">
            <div>
              <p className="text-xs text-gray-600 mb-1">Fri, June 23</p>
              <p className="text-2xl font-bold text-gray-900 mb-1">27°C</p>
              <p className="text-xs text-gray-600">Rain: 50%</p>
            </div>
            <div className="relative w-12 h-12 flex-shrink-0">
              <img className="h-auto w-auto object-cover" src="/logo/SunRain.svg" alt="Logo" width="100" height="100"/>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex justify-between items-center w-[251px]">
            <div>
              <p className="text-xs text-gray-600 mb-1">Sat, June 24</p>
              <p className="text-2xl font-bold text-gray-900 mb-1">29°C</p>
              <p className="text-xs text-gray-600">Rain: 30%</p>
            </div>
            <div className="relative w-12 h-12 flex-shrink-0">
              <img className="h-auto w-auto object-cover" src="/logo/sunCloud.svg" alt="Logo" width="100" height="100"/>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex justify-between items-center w-[251px]">
            <div>
              <p className="text-xs text-gray-600 mb-1">Sun, June 24</p>
              <p className="text-2xl font-bold text-gray-900 mb-1">30°C</p>
              <p className="text-xs text-gray-600">Rain: 10%</p>
            </div>
            <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
              <img className="h-auto w-auto" src="/logo/sun.svg" alt="Logo" width="100" height="100" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default WeatherForecast;
