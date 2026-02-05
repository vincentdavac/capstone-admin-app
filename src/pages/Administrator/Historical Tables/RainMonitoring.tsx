import { useEffect } from "react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import RainMonitoringComponentCard from "./RainMonitoring/RainMonitoringComponentCard";

const RainMonitoring = () => {
  useEffect(() => {
    document.title = "Wind Speed | X-Stream";
  }, []);

  return (
    <>
      <PageBreadcrumb pageTitle="Wind Speed" />
      <div className="space-y-6">
        <RainMonitoringComponentCard />
      </div>
    </>
  );
};

export default RainMonitoring;
