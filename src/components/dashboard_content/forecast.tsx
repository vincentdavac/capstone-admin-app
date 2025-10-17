import SearchLocation from "../../components/dashboard_content/searchLocation";
import WeeklyForecast from "../../components/dashboard_content/weeklyForecast";
import CurrentWeather from "../../components/dashboard_content/currentWeather";
const ForecastCard = () => {
  return (
    <div className="lg:col-span-2 flex flex-col gap-4">
      <div className="w-[1515px] h-[800px] bg-white shadow rounded-xl border border-gray-300 p-4">
        <div className="w-full px-4 flex items-center h-16">
          <h1 className="text-lg font-semibold">Weather Forecast</h1>
        </div>
        <hr className="w-full border-t border-gray-300" />
        <div className="mt-5">
          <SearchLocation />
        </div>
        <div className="flex justify-between p-4 px-8">
          <CurrentWeather />
          <WeeklyForecast />
        </div>
      </div>
    </div>
  );
};
export default ForecastCard;
