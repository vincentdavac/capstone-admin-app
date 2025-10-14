import TropicalCard from "../../components/deployedBuoy/tropicalTable";
import HistoricalCard from "../../components/deployedBuoy/historicalCards";
import SearchBuoy from "../../components/deployedBuoy/search";
import MapsWithHazard from "../../components/deployedBuoy/maps_w_buoyControl";

const tropicalPage = () => {
  return (
    <div className="">
      <SearchBuoy />
      <MapsWithHazard />
      {/* <TropicalCard />
      <HistoricalCard /> */}
    </div>
  );
};
export default tropicalPage;
