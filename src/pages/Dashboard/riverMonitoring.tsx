/* eslint-disable react-hooks/rules-of-hooks */
// import HistoricalCard from "../../components/riverMonitoring/historicalCard";
import SearchBuoy from "../../components/riverMonitoring/search";
import MapsWithHazard from "../../components/riverMonitoring/maps_w_hazard";
import Maps from "../../components/riverMonitoring/maps";
import { useEffect, useState } from "react";
import { insertingAlerts } from "../../api_hooks/dashboardHooks";
import { buoyDataHooks } from "../../api_hooks/buoyHooks";
const riverMonitoring = () => {
  const [distanceKm, setDistanceKm] = useState("0.00");
  insertingAlerts();
  useEffect(() => {
    document.title = "River Monitoring | X-Stream";
  }, []);
  // const { data, loading, currentLng, currentLat, hectare,WaterLevel } = buoyDataHooks();
  // if (loading) {
  //   return (
  //     <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 h-[80vh] flex items-center justify-center">
  //       <div className="flex justify-center items-center gap-2 text-gray-500">
  //         <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#453EFE]" />
  //         Please wait
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="">
      {/* <Maps
        buoy={data?.data.attributes}
        loading={loading}
        onDistanceChange={setDistanceKm}
        currentLat={currentLat}
        currentLng={currentLng}
        hectare={hectare}
        WaterLevel={WaterLevel}
      /> */}
      <SearchBuoy />
      <MapsWithHazard/>
    </div>
  );
};
export default riverMonitoring;
