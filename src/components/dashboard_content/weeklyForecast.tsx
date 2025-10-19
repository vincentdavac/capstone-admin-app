import { fetchWeather } from "../../api_hooks/forecasting";
const WeatherForecast = () => {
  const { forecast, loading, error } = fetchWeather();

  if (!forecast) return <p>Loading forecast...</p>;
  const day1 = new Date(forecast.daily.time[0]).toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
  });
  const day2 = new Date(forecast.daily.time[1]).toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
  });
  const day3 = new Date(forecast.daily.time[2]).toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
  });
  const day4 = new Date(forecast.daily.time[3]).toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
  });
  const day5 = new Date(forecast.daily.time[4]).toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
  });
  const day6 = new Date(forecast.daily.time[5]).toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
  });
  const day7 = new Date(forecast.daily.time[6]).toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
  });
  const getWeatherIcon = (code: number) => {
    if (code === 0) return "/logo/sun.svg";
    if (code >= 1 && code <= 3) return "/logo/sunCloud.svg";
    if (code === 45 || code === 48) return "/logo/fog.svg";
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82))
      return "/logo/CloudRain.svg";
    if (code >= 95 && code <= 99) return "/logo/CloudRainThunder.svg";
    return "/logo/sun.svg";
  };

  return (
    <>
      <div className="border border-[#D9D9D9] shadow rounded-2xl p-6 w-[572px] h-[570px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            7-Day Forecast
          </h2>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {forecast && (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex justify-between items-center w-[251px]">
              <div>
                <p className="text-xs text-gray-600 mb-1">{day1}</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {forecast.daily.temperature_2m_max[0]}°C
                </p>
                <p className="text-xs text-gray-600">
                  Rain: {forecast.daily.precipitation_probability_max[0] + "%"}
                </p>
              </div>
              <div className="relative w-12 h-12 flex-shrink-0">
                <img
                  className="h-auto w-auto object-cover"
                  src={getWeatherIcon(forecast.daily.weathercode[0])}
                  alt="Logo"
                  width="100"
                  height="100"
                />
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex justify-between items-center w-[251px]">
              <div>
                <p className="text-xs text-gray-600 mb-1">{day2}</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {" "}
                  {forecast.daily.temperature_2m_max[1]}°C
                </p>
                <p className="text-xs text-gray-600">
                  Rain: {forecast.daily.precipitation_probability_max[1] + "%"}
                </p>
              </div>
              <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                <img
                  className="h-auto w-auto object-cover"
                  src={getWeatherIcon(forecast.daily.weathercode[1])}
                  alt="Logo"
                  width="100"
                  height="100"
                />
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex justify-between items-center w-[251px]">
              <div>
                <p className="text-xs text-gray-600 mb-1">{day3}</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {" "}
                  {forecast.daily.temperature_2m_max[2]}°C
                </p>
                <p className="text-xs text-gray-600">
                  Rain: {forecast.daily.precipitation_probability_max[2] + "%"}
                </p>
              </div>
              <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                <img
                  className="h-auto w-auto object-cover"
                  src={getWeatherIcon(forecast.daily.weathercode[2])}
                  alt="Logo"
                  width="100"
                  height="100"
                />
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex justify-between items-center w-[251px]">
              <div>
                <p className="text-xs text-gray-600 mb-1">{day4}</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {" "}
                  {forecast.daily.temperature_2m_max[3]}°C
                </p>
                <p className="text-xs text-gray-600">
                  Rain: {forecast.daily.precipitation_probability_max[3] + "%"}
                </p>
              </div>
              <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                <img
                  className="h-auto w-auto object-cover"
                  src={getWeatherIcon(forecast.daily.weathercode[3])}
                  alt="Logo"
                  width="100"
                  height="100"
                />
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex justify-between items-center w-[251px]">
              <div>
                <p className="text-xs text-gray-600 mb-1">{day5}</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {forecast.daily.temperature_2m_max[4]}°C
                </p>
                <p className="text-xs text-gray-600">
                  Rain: {forecast.daily.precipitation_probability_max[4] + "%"}
                </p>
              </div>
              <div className="relative w-12 h-12 flex-shrink-0">
                <img
                  className="h-auto w-auto object-cover"
                  src={getWeatherIcon(forecast.daily.weathercode[4])}
                  alt="Logo"
                  width="100"
                  height="100"
                />
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex justify-between items-center w-[251px]">
              <div>
                <p className="text-xs text-gray-600 mb-1">{day6}</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {" "}
                  {forecast.daily.temperature_2m_max[5]}°C
                </p>
                <p className="text-xs text-gray-600">
                  Rain: {forecast.daily.precipitation_probability_max[5] + "%"}
                </p>
              </div>
              <div className="relative w-12 h-12 flex-shrink-0">
                <img
                  className="h-auto w-auto object-cover"
                  src={getWeatherIcon(forecast.daily.weathercode[5])}
                  alt="Logo"
                  width="100"
                  height="100"
                />
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 flex justify-between items-center w-[251px]">
              <div>
                <p className="text-xs text-gray-600 mb-1">{day7}</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {forecast.daily.temperature_2m_max[6]}°C
                </p>
                <p className="text-xs text-gray-600">
                  Rain: {forecast.daily.precipitation_probability_max[6] + "%"}
                </p>
              </div>
              <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                <img
                  className="h-auto w-auto"
                  src={getWeatherIcon(forecast.daily.weathercode[6])}
                  alt="Logo"
                  width="100"
                  height="100"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default WeatherForecast;
