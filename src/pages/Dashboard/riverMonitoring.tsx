import HistoricalCard from "../../components/riverMonitoring/historicalCard";
import SearchBuoy from "../../components/riverMonitoring/search";
import MapsWithHazard from "../../components/riverMonitoring/maps_w_hazard";


const riverMonitoring = () => {
  return (
    <div className="">
      <SearchBuoy />
      <MapsWithHazard />
      <HistoricalCard />
    </div>
  );
};
export default riverMonitoring;
