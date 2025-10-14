import HistoricalCard from "../../components/stormsurge/historicalCard";
import SearchBuoy from "../../components/stormsurge/search";
import MapsWithHazard from "../../components/stormsurge/maps_w_hazard";


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
