import TropicalCard from "../../components/deployedBuoy/tropicalTable";
import HistoricalCard from "../../components/deployedBuoy/historicalCards";
import SearchBuoy from "../../components/deployedBuoy/search";
import MapsWithHazard from "../../components/deployedBuoy/maps_w_buoyControl";
import BuoyCondition from "../../components/deployedBuoy/buoyCondition";

const tropicalPage = () => {
  return (
    <div className="">
      <SearchBuoy />
      <MapsWithHazard />
      <BuoyCondition/>
      {/* <TropicalCard />
      <HistoricalCard /> */}
    </div>
  );
};
export default tropicalPage;
