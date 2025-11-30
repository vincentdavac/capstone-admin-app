// import HistoricalCard from "../../components/riverMonitoring/historicalCard";
import SearchBuoy from "../../components/riverMonitoring/search";
import MapsWithHazard from "../../components/riverMonitoring/maps_w_hazard";
import {insertingAlerts } from "../../api_hooks/dashboardHooks";

const riverMonitoring = () => {
  insertingAlerts();
  return (
    <div className="">
      <SearchBuoy />
      <MapsWithHazard />
      {/* <HistoricalCard /> */}
    </div>
  );
};
export default riverMonitoring;
