import { useEffect, useContext } from "react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import BatteryHealthComponentCard from "./BatteryHeath/BatteryHealthComponentCard";
import { insertingAlerts } from "../../../api_hooks/dashboardHooks";
import { useAlertMonitor } from "../../../api_hooks/alertMonitoringHooks";
import { AppContext } from "../../../context/AppContext";
import AlertModal from "../../Barangay/AlertManagement/alertModal";
import { AlertsContainerRef } from "../../../components/Alert/AlertsContainer";

interface BatteryHealthComponentCardProps {
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

const BatteryHealth = ({ alertsRef }: BatteryHealthComponentCardProps) => {
  useEffect(() => {
    document.title = "Battery Health | X-Stream";
  }, []);
  insertingAlerts();
  const { user } = useContext(AppContext)!;
  const buoyCode = user?.barangay?.buoys?.[0]?.buoyCode;
  const buoyId = user?.barangay?.buoys?.[0]?.id;
  const { showAlert, currentAlert, handleClose } = useAlertMonitor(
    buoyCode?.toString() ?? "",
    5000,
    buoyId?.toString() ?? "",
  );
  return (
    <>
      <PageBreadcrumb pageTitle="Battery Health" />
      <div className="space-y-6">
        <BatteryHealthComponentCard alertsRef={alertsRef} />
        <AlertModal
          isOpen={showAlert}
          alert={currentAlert}
          onClose={handleClose}
        />
      </div>
    </>
  );
};

export default BatteryHealth;
