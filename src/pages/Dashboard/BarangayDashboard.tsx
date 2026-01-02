import React from "react";
import WaterDepthChart from "../../components/Barangay Dashboard/WaterDepthChart";
import { AppContext } from "../../context/AppContext";
import { useContext, useEffect } from "react";
import { useAlertMonitor } from "../../api_hooks/alertMonitoringHooks";
import AlertModal from "../Barangay/AlertManagement/alertModal";
import DashboardCards from "../../components/dashboard_content/BarangayCards/cards";
import DangerLevel from "../../components/dashboard_content/BarangayDangerLevel/danger_level";
import { AlertsContainerRef } from "../../components/Alert/AlertsContainer";

interface Props {
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

const BarangayDashboardContent = ({ alertsRef }: Props) => {
  const { user } = useContext(AppContext)!;

  useEffect(() => {
    document.title = "Dashboard | X-Stream";
  }, []);

  const buoyCode = user?.barangay?.buoys?.[0]?.buoyCode;
  const buoyId = user?.barangay?.buoys?.[0]?.id;
  const { showAlert, currentAlert, handleClose } = useAlertMonitor(
    buoyCode?.toString() ?? "",
    50000,
    buoyId?.toString() ?? ""
  );

  return (
    <div>
      <DashboardCards />

      <div className="w-full flex flex-col lg:flex-row items-start justify-start pl-1 mt-5 gap-3">
        {/* Left: Water Depth Chart */}
        <div className="w-full lg:w-2/3">
          <WaterDepthChart />
        </div>

        {/* Right: Danger Level */}
        <div className="w-full lg:w-1/3">
          <DangerLevel alertsRef={alertsRef} />
        </div>
      </div>

      <AlertModal
        isOpen={showAlert}
        alert={currentAlert}
        onClose={handleClose}
      />
    </div>
  );
};

export default BarangayDashboardContent;
