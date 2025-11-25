import MapsWithHazard from "../../components/deployedBuoy/maps_w_buoyControl";
import BuoyCondition from "../../components/deployedBuoy/buoyCondition";
import ManageBuoy from "../../components/deployedBuoy/manageBuoy";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

const tropicalPage = () => {
  return (
    <div className="">
      <PageBreadcrumb pageTitle="Buoy Monitoring" />

      <MapsWithHazard />
      <BuoyCondition />

      <ManageBuoy />
      {/* <TropicalCard />
      <HistoricalCard /> */}
    </div>
  );
};
export default tropicalPage;
