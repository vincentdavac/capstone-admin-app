import { fetchWeather } from "../../api_hooks/forecasting";
const CurrentWeather = () => {
  const { forecast, loading, error } = fetchWeather();
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
   
   <div className="relative size-32">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {forecast && (
  <div className="bg-[#FFFF] rounded-lg p-4 px-10 border border-gray-200  flex justify-between items-center h-[272px] w-[789px]">

    <div>
      <p className="text-[24px] text-gray-600 mb-1">Current</p>
      <p className="text-[45px] font-bold text-gray-900 leading-none mb-2">{forecast.daily.temperature_2m_max[0]}°C</p>
      <p className="text-[20px] text-gray-400">Wind: {forecast.daily.windspeed_10m_max[0]} m/s  Coordinate: {forecast.latitude}, {forecast.longitude}</p>
    </div>
    <div className="flex items-center justify-center flex-shrink-0 h-[149px] w-[146px]">
      <img className="h-full w-full object-contain" src={getWeatherIcon(forecast.daily.weathercode[0])}  alt="Weather Icon" width="146" height="149"/>
    </div>
    </div>
      )}
  </div>


  );
};
export default CurrentWeather;
