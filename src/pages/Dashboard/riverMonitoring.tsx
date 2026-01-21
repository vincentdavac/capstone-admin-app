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
  const { data, loading, error,currentLng, currentLat,hectare } = buoyDataHooks();
  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data</div>;

  return (
    <div className="">
      <Maps
        buoy={data?.data.attributes}
        loading={loading}
        onDistanceChange={setDistanceKm}
        currentLat={currentLat}
        currentLng={currentLng}
        hectare={hectare}
      />
      <SearchBuoy />
      <MapsWithHazard />
      {/* <HistoricalCard /> */}
    </div>
  );
};
export default riverMonitoring;
