/* eslint-disable react-hooks/rules-of-hooks */
// import HistoricalCard from "../../components/riverMonitoring/historicalCard";
// import SearchBuoy from "../../components/riverMonitoring/search";
import MapsWithHazard from "../../components/riverMonitoring/maps_w_hazard";
import { useEffect, } from "react";
import { insertingAlerts } from "../../api_hooks/dashboardHooks";
import { buoyDataHooks } from "../../api_hooks/buoyHooks";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
const riverMonitoring = () => {
  insertingAlerts();
  useEffect(() => {
    document.title = "River Monitoring | X-Stream";
  }, []);
  // const { loading, } = buoyDataHooks();
  // if (loading) {
  //   return (
  //     <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 h-[80vh] flex items-center justify-center">
  //       <div className="flex justify-center items-center gap-2 text-gray-500">
  //         <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#453EFE]" />
  //         Please wait while loading...
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="">
      <PageBreadcrumb pageTitle="River Monitoring" />
      {/* <SearchBuoy /> */}
      <MapsWithHazard />
    </div>
  );
};
export default riverMonitoring;
