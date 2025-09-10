import TropicalCard from "../../components/tropicalcyclone/tropicalTable";
import HistoricalCard from "../../components/tropicalcyclone/historicalCards";
import SearchBuoy from "../../components/tropicalcyclone/search";
import MapsWithHazard from "../../components/tropicalcyclone/maps_w_hazard";

const tropicalPage = () => {
  return (
    <div className="">
      <SearchBuoy />
      <MapsWithHazard />
      <TropicalCard />
      <HistoricalCard />
    </div>
  );
};
export default tropicalPage;
