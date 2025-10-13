const CurrentWeather = () => {
  return (
   <div className="relative size-32">
  <div className="bg-[#FFFF] rounded-lg p-4 px-10 border border-gray-200  flex justify-between items-center h-[272px] w-[789px]">
    <div>
      <p className="text-[24px] text-gray-600 mb-1">Current</p>
      <p className="text-[45px] font-bold text-gray-900 leading-none mb-2">26°C</p>
      <p className="text-[20px] text-gray-400">Wind: 10.2 m/s  Coordinate: 14.63, 121.00</p>
    </div>
    <div className="flex items-center justify-center flex-shrink-0 h-[149px] w-[146px]">
      <img className="h-full w-full object-contain" src="/logo/CloudRain.svg" alt="Weather Icon" width="146" height="149"/>
    </div>
  </div>
</div>

  );
};
export default CurrentWeather;
