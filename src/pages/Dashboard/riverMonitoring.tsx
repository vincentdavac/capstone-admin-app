/* eslint-disable react-hooks/rules-of-hooks */
// import HistoricalCard from "../../components/riverMonitoring/historicalCard";
import SearchBuoy from "../../components/riverMonitoring/search";
import MapsWithHazard from "../../components/riverMonitoring/maps_w_hazard";
import { useEffect } from "react";
import { insertingAlerts } from "../../api_hooks/dashboardHooks";

const riverMonitoring = () => {
  insertingAlerts();

  useEffect(() => {
    document.title = "River Monitoring | X-Stream";
  }, []);

  return (
    <div className="">
      <SearchBuoy />
      <MapsWithHazard />
      {/* <HistoricalCard /> */}
    </div>
  );
};
export default riverMonitoring;
