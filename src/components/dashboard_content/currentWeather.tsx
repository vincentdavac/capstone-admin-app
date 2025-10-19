import {fetchWeather} from "../../api_hooks/forecasting";
import {fetchHourlyWeather} from "../../api_hooks/hourlyWeather";
import {useEffect, useRef} from "react";
import * as echarts from "echarts";
const CurrentWeather = () => {
  const hourly = useRef<HTMLDivElement>(null);
  const { forecast, loading, error } = fetchWeather();
  const { chartData, chartLabels } =
    fetchHourlyWeather();
  const getWeatherIcon = (code: number) => {
    if (code === 0) return "/logo/sun.svg";
    if (code >= 1 && code <= 3) return "/logo/sunCloud.svg";
    if (code === 45 || code === 48) return "/logo/fog.svg";
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82))
      return "/logo/CloudRain.svg";
    if (code >= 95 && code <= 99) return "/logo/CloudRainThunder.svg";
    return "/logo/sun.svg";
  };

  useEffect(() => {
    let hourlyChart: echarts.ECharts | null = null;
    if (hourly.current && forecast && chartData && chartLabels) {
      hourlyChart = echarts.init(hourly.current);
      const chartOption = {
        title: {
          text: "{box|} Temperature",
          left: "45%",
          top: "5%",
          textStyle: {
            fontSize: 16,
            fontWeight: "normal",
            color: "#666",
            rich: {
              box: {
                backgroundColor: "#5470c6",
                width: 12,
                height: 12,
                borderRadius: 2,
                padding: [0, 8, 0, 0],
              },
            },
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: chartLabels,
          axisLabel: {
            interval: 0,
            rotate: 45,
            fontSize: 10,
          },
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: chartData,
            type: "line",
            areaStyle: {},
            color: "#5470c6",
          },
        ],
        grid: {
          left: "10%",
          right: "5%",
          top: "20%",
          bottom: "25%",
        },
      };
      hourlyChart.setOption(chartOption);
    }
    return () => {
      hourlyChart?.dispose();
    };
  }, [forecast, chartData, chartLabels]);
  return (
    <div className="relative space-y-4">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {forecast && (
        <>
          <div className="bg-[#FFFF] rounded-lg p-4 px-10 border border-gray-200 flex justify-between items-center h-[272px] w-[789px]">
            <div className="flex-1">
              <p className="text-[24px] text-gray-600 mb-1">Current</p>
              <p className="text-[45px] font-bold text-gray-900 leading-none mb-2">
                {forecast.daily.temperature_2m_max[0]}°C
              </p>
              <p className="text-[20px] text-gray-400">
                Wind: {forecast.daily.windspeed_10m_max[0]} m/s Coordinate:{" "}
                {forecast.latitude}, {forecast.longitude}
              </p>
            </div>
            <div className="flex items-center justify-center flex-shrink-0 h-[149px] w-[146px]">
              <img
                className="h-full w-full object-contain"
                src={getWeatherIcon(forecast.daily.weathercode[0])}
                alt="Weather Icon"
                width="146"
                height="149"
              />
            </div>
          </div>

          <div className="bg-[#FFFF] rounded-lg p-4 px-10 border border-gray-200 h-[272px] w-[789px]">
            <p className="text-[24px] text-gray-600 mb-2">Hourly</p>
            <div ref={hourly} className="w-full h-[200px]"></div>
          </div>
        </>
      )}
    </div>
  );
};
export default CurrentWeather;
