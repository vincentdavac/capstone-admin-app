import MapsWithHazard from "../../components/deployedBuoy/maps_w_buoyControl";
import BuoyCondition from "../../components/deployedBuoy/buoyCondition";
import ManageBuoy from "../../components/deployedBuoy/manageBuoy";
import { useEffect } from 'react';
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import {insertingAlerts } from "../../api_hooks/dashboardHooks";
const tropicalPage = () => {
  insertingAlerts();

  useEffect(() => {
    document.title = "Deployed Buoy | X-Stream";
  }, []);

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
